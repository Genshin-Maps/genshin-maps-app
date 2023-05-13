interface ImportMetaEnv {
    readonly DEV?: boolean;
    readonly PROD?: boolean;
    readonly MODE?: "development" | "production" | "userscript";
    readonly NODE_ENV?: string;
    readonly VITE_USERSCRIPT?: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
