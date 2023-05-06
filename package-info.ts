import path from "node:path";
import type { MonkeyUserScript } from "vite-plugin-monkey";
import info from "./package.json" assert { type: "json" };

const __dirname = path.resolve();

const appVersion = info.version;
const addonsVersion = "1.0";
const autoTrackVersion = "1.0";
const githubRepo = info.repository.url;
const addonsFileName = "addons.user.js";
const autoTrackFileName = "auto-track.user.js";

export function getAppVersion(): string {
    return appVersion;
}

export function getAddonsVersion(): string {
    return addonsVersion;
}

export function getAutoTrackVersion(): string {
    return autoTrackVersion;
}

export function getAddonsUserscriptConfig(): MonkeyUserScript {
    return {
        name: {
            "": "Genshin Maps Addons",
            ko: "원신 맵스 부가기능",
        },
        description: {
            en: "Adds several add-ons to Genshin Maps.",
            ko: "원신 맵스에 여러 부가기능을 추가합니다.",
        },
        icon: "https://genshin.gamedot.org/asset/xapp-icon128.png.pagespeed.ic.zyAE0ntk9a.webp",
        namespace: "genshin-maps-app/addons",
        match: ["https://genshin.gamedot.org/?mid=genshinmaps"],
        downloadURL: `${githubRepo}/raw/gh-pages/userscript/${addonsFileName}`,
        updateURL: `${githubRepo}/raw/gh-pages/userscript/${addonsFileName}`,
    };
}

export function getAutoTrackUserscriptConfig(): MonkeyUserScript {
    return {
        name: {
            "": "Genshin Maps Auto-track",
            ko: "원신 맵스 실시간 추적",
        },
        description: {
            en: "Show realtime in game location in the Teyvat Interactive Map, in browser and mobile phones!Support genshin.gamedot.org.",
            ko: "원신 게임닷 지도에서 실제 게임에서의 캐릭터 위치를 실시간으로 보여줍니다, 브라우저와 모바일 동시에 사용 가능!",
        },
        icon: "https://genshin.gamedot.org/asset/xapp-icon128.png.pagespeed.ic.zyAE0ntk9a.webp",
        namespace: "genshin-maps-app/auto-track",
        match: ["https://genshin.gamedot.org/?mid=genshinmaps"],
        downloadURL: `${githubRepo}/raw/gh-pages/userscript/${autoTrackFileName}`,
        updateURL: `${githubRepo}/raw/gh-pages/userscript/${autoTrackFileName}`,
    };
}

export interface BuildInfo {
    getEntryPoint: () => string;
    getVersion: () => string;
    getFileName: () => string;
    getUserscriptConfig: () => MonkeyUserScript;
}

export function getAddonsBuildInfo(): BuildInfo {
    return {
        getEntryPoint: () => path.join(__dirname, "src/renderer/addons/index.ts"),
        getVersion: getAddonsVersion,
        getFileName: () => "addons.user.js",
        getUserscriptConfig: getAddonsUserscriptConfig,
    };
}

export function getAutoTrackBuildInfo(): BuildInfo {
    return {
        getEntryPoint: () => path.join(__dirname, "src/renderer/auto-track/index.ts"),
        getVersion: getAutoTrackVersion,
        getFileName: () => "auto-track.user.js",
        getUserscriptConfig: getAutoTrackUserscriptConfig,
    };
}
