export interface Command {
    readonly action: string;
    readonly version: number;
    readonly data: number[];
}
