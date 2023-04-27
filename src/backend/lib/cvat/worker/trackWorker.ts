import { LibCvat } from "..";
const { workerData, parentPort } = require('worker_threads')

const config = workerData.config as AppConfig;
const Cvat = LibCvat.instance;
let trackInterval: NodeJS.Timer | null = null;

Cvat.load(workerData.libPath);


parentPort.on('message', (message: any) => {
    if (message === 'exit') {
        exit();
    } else if (message === 'track') {
        startTrack();
    } else if (message === 'stopTrack') {
        stopTrack();
    } else {
        parentPort.postMessage({ echo: message });
    }
});

function exit() {
    parentPort.postMessage('called exit');
    stopTrack();
    Cvat.uninit();
    Cvat.unload();
    parentPort.close();
}

function track(): void {
    let trackData = Cvat.track();
    parentPort.postMessage({
        event: 'track',
        data: trackData
    });
}

function startTrack() {
    trackInterval = setInterval(track, config.captureInterval);
}

function stopTrack() {
    if (trackInterval !== null)
        clearInterval(trackInterval);
    trackInterval = null;
}