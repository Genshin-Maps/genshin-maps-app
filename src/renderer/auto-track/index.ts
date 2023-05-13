import { unsafeWindow } from "@monkey";
import App from "@/renderer/auto-track/App.svelte";

const autoTrack = new App({
    target: document.body,
    props: {},
});

if (import.meta.env?.VITE_USERSCRIPT) {
    import("@/renderer/bridge").then((bridge) => {
        unsafeWindow.bridge = bridge.default;
    });
}

export default autoTrack;
