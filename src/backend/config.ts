const config: AppConfig = {
    autoAppUpdate: true,
    autoLibUpdate: true,
    captureInterval: 250,
    captureDelayOnError: 1000,
    useBitBltCapture: false,
}

export function getConfig() {
    return config;
}

export function setConfig<T extends AppConfig>(newConfig: T) {
    const keys = Object.keys(newConfig) as Array<keyof AppConfig>
    keys.forEach(<K extends keyof AppConfig>(key: K) => {
        config[key] = newConfig[key];
    });
}