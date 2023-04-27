import { Worker, isMainThread, workerData } from "worker_threads";
import { app } from 'electron';
import path from "path";
import { getConfig } from "../../config";

export class CvatWorkerManager {
    private static _instance: CvatWorkerManager;
    private _worker: Worker | null = null;

    public onTrackData: (data: any) => void = (data) => {};

    static get instance(): CvatWorkerManager {
        if(!CvatWorkerManager._instance) CvatWorkerManager._instance = new CvatWorkerManager();
        return CvatWorkerManager._instance;
    }

    private constructor() {
        this._worker = null;
    }

    public init(): boolean {
        this._worker = new Worker('./build/lib/cvat/worker/trackWorker.js', { 
            workerData: { 
                libPath: path.join(app.getAppPath(), "lib/cvAutoTrack/cvAutoTrack.dll"),
                config: getConfig()
            }
        });
        this._worker.on('message', (msg) => this.onMessage(msg));
        this._worker.on('error', (err) => this.onError(err));
        this._worker.on('exit', (code) => this.onExit(code));
        return this._worker != null;
    }

    public uninit(): boolean {
        if(this._worker != null)
            this._worker.postMessage('exit'); // this._worker.terminate();
        return this._worker == null;
    }

    public startTrack(): void {
        if(this._worker != null)
            this._worker.postMessage('track');
        else
            console.error('Worker is null');
    }

    public stopTrack(): void {
        if(this._worker != null)
            this._worker.postMessage('stopTrack');
    }

    private onMessage(msg: WorkerEvent): void {
        if(msg.event === 'track') {
            this.onTrackData(msg.data);
        } else {
            console.debug(msg);
        }
    }

    private onError(err: any): void {
        console.error(err)
    }

    private onExit(code: number): void {
        if (code !== 0)
            console.error(`Worker stopped: ${code}`);
        this._worker = null;
    }
}