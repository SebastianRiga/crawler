export interface LoggerEntry {
    level: string;
    module: string;
    time: Date;
    location: string;
    message: string;
}
