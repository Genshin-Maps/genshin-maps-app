import { workerData, parentPort } from "worker_threads";
import { type AppConfig } from "@t/backend";
import { LibCvat } from "@/backend/lib/cvat";

const config = workerData.config as AppConfig;
const Cvat = LibCvat.instance;
let trackInterval: NodeJS.Timer | null = null;

Cvat.load();

parentPort?.on("message", (message: any) => {
    if (message === "exit") {
        exit();
    } else if (message === "track") {
        startTrack();
    } else if (message === "stopTrack") {
        stopTrack();
    } else {
        parentPort?.postMessage({ echo: message });
    }
});

function exit() {
    parentPort?.postMessage("called exit");
    stopTrack();
    Cvat.uninit();
    Cvat.unload();
    parentPort?.close();
}

function track(): void {
    let trackData = Cvat.track();
    parentPort?.postMessage({
        event: "track",
        data: trackData,
    });
}

function startTrack() {
    trackInterval = setInterval(track, config.captureInterval);
}

function stopTrack() {
    if (trackInterval !== null) clearInterval(trackInterval);
    trackInterval = null;
}
