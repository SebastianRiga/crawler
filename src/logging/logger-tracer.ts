import { EventEmitter } from 'events';

import { Logger } from 'src/logging/logger';
import { LoggerLevel } from 'src/logging/logger-level';
import { LoggerModuleConfiguration } from 'src/logging/logger-module-configuration';

/**
 *
 */
export class LoggerTracer extends EventEmitter {
    /**
     *
     */
    public defaultLoggerLevel: LoggerLevel = 'info'

    /**
     *
     */
    private config: LoggerModuleConfiguration = { modules: {} };

    /**
     * Sets the default logger level for the root module.
     * @param level The new default logger level.
     * @returns The calling LoggerTracer instance.
     */
    public setDefaultLoggerLevel(level: LoggerLevel): LoggerTracer {
        this.defaultLoggerLevel = level;
        return this;
    }

    /**
     *
     * @param config The module config that should be applied.
     * @returns The calling LoggerTracer instance.
     */
    public configureModules(config: { [module: string]: string }): LoggerTracer {
        this.config.modules = Object.assign({}, this.config.modules, config);
        return this;
    }

    /**
     * Returns a new logger instance for the given module.
     * @param module The module for which a logger instance should be created.
     * @returns The new Logger instance for the passed module.
     */
    public getLoggerForModule(module: string): Logger {
        let moduleLevel = this.defaultLoggerLevel;
        let bestMatch = '';

        Object.keys(this.config.modules).forEach((path) => {
            if (module.startsWith(path) && path.length >= bestMatch.length) {
                bestMatch = path;
                moduleLevel = this.config.modules[path];
            }
        });

        console.log(moduleLevel);
        return new Logger();
    }
}

/**
 *
 */
export const logger = new LoggerTracer();
