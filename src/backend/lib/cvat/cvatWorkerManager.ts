import { Worker } from "node:worker_threads";
import type { WorkerManagerConfig, WorkerEvent, WorkerEventData } from "@t/backend";
import { getConfig } from "@/backend/config";

export class CvatWorkerManager {
    private static _instance: CvatWorkerManager;
    private _worker: Worker | null = null;

    static get instance(): CvatWorkerManager {
        if (!CvatWorkerManager._instance) CvatWorkerManager._instance = new CvatWorkerManager();
        return CvatWorkerManager._instance;
    }

    private constructor() {
        this._worker = null;
    }

    public init(config: WorkerManagerConfig): boolean {
        this._worker = new Worker("./out/main/trackWorker.cjs", {
            workerData: {
                config: getConfig(),
            },
        });
        this._worker.on("message", (msg) => this.onMessage(msg));
        this._worker.on("error", (err) => this.onError(err));
        this._worker.on("exit", (code) => this.onExit(code));
        if (config.onTrackData) {
            this.onTrackData = config.onTrackData;
        }

        return this._worker != null;
    }

    public uninit(): boolean {
        if (this._worker != null) this._worker.postMessage("exit"); // this._worker.terminate();
        return this._worker == null;
    }

    public startTrack(): void {
        if (this._worker != null) this._worker.postMessage("track");
        else console.error("Worker is null");
    }

    public stopTrack(): void {
        if (this._worker != null) this._worker.postMessage("stopTrack");
    }

    private onTrackData: ((data: WorkerEventData) => void) | undefined;

    private onMessage(msg: WorkerEvent): void {
        if (msg.event === "track" && this.onTrackData) {
            this.onTrackData(msg.data);
        } else {
            console.debug(msg);
        }
    }

    private onError(err: unknown): void {
        console.error(err);
    }

    private onExit(code: number): void {
        if (code !== 0) console.error(`Worker stopped: ${code}`);
        this._worker = null;
    }
}
