import { LoggerLevel } from 'src/logging/logger-level';

export interface LoggerModuleConfiguration {
    modules: { [module: string]: LoggerLevel };
}
