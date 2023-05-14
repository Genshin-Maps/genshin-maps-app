import fs from "fs";
import axios from "axios";
import sevenBin from "7zip-bin";
import Seven from "node-7z";
import { getLibDirPath } from "@/backend/utils";
import path from "path";
import logger from "electron-log";
import { LibCvat } from "@/backend/lib/cvat";

const REPO_URL = "https://api.github.com/repos/{owner}/{repo}/releases/latest";

type Data = {
    name: string;
    tag_name: string;
    assets: Asset[];
};

type Asset = {
    name: string;
    browser_download_url: string;
};

const LIB_PATH = getLibDirPath();

function extract7zFile(filepath: string, targetPath: string) {
    const pathTo7zip = sevenBin.path7za;
    const options = {
        recursive: true,
        targetDir: targetPath,
        $bin: pathTo7zip,
        $progress: true,
    };

    return Seven.extractFull(filepath, targetPath, options);
}

function getCurrentVersion() {
    const versionFilePath = path.join(LIB_PATH, "version.tag");
    if (!fs.existsSync(versionFilePath)) {
        return null;
    }

    return fs.readFileSync(versionFilePath, "utf-8").replace(/(\r\n|\n|\r| )/gm, "");
}

export async function checkForUpdates() {
    const owner = "GengGode";
    const repo = "cvAutoTrack";
    try {
        // 최신 릴리즈 정보
        const latestestReleaseUrl = REPO_URL.replace("{owner}", owner).replace("{repo}", repo);
        logger.info(`libPath: ${LIB_PATH}`);

        logger.info(`latestestReleaseUrl: ${latestestReleaseUrl}`);
        const data = (await axios.get(latestestReleaseUrl))?.data as Data;

        // 최신 버전과 현재 버전을 비교합니다.
        logger.info(`currentVersion: ${getCurrentVersion()}, latestVersion: ${data.tag_name}`);
        const currentVersion = getCurrentVersion();
        if (currentVersion == data.tag_name) {
            logger.info("cvAutoTrack이 최신 버전입니다.");
            return;
        }

        const index = data.assets.findIndex((asset: Asset) => asset.name.endsWith(".7z"));
        if (index === -1) {
            throw new Error("cvAutoTrack 릴리즈 파일을 찾을 수 없습니다.");
        }
        const szipPath = path.join(LIB_PATH, data.assets[index].name);
        const downloadUrl = data.assets[index].browser_download_url;

        const cvat = LibCvat.instance;
        cvat.unload();
        fs.mkdirSync(LIB_PATH, { recursive: true });
        const writer = fs.createWriteStream(szipPath);

        // 파일을 다운로드하여 스트림에 기록합니다.
        const response = await axios({
            url: downloadUrl,
            method: "GET",
            responseType: "stream",
        });
        response.data.pipe(writer);

        // 다운로드가 완료될 때까지 기다립니다.
        await new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });

        // 압축을 푸는 작업을 수행합니다.
        const reader = extract7zFile(szipPath, LIB_PATH);
        await new Promise((resolve, reject) => {
            reader.on("end", resolve);
            reader.on("error", reject);
        });

        // 필요없는 파일 및 디렉토리를 정리합니다.
        fs.unlinkSync(szipPath);

        logger.log("cvAutoTrack 파일 다운로드 및 압축 해제가 완료되었습니다.");
        await cvat.load();
    } catch (error) {
        logger.error("cvAutoTrack 파일을 다운로드하거나 압축을 해제하는 중에 오류가 발생했습니다.", error);
    }
}
