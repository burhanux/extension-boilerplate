/** The App environment */
export type AppEnvironment = 'development' | 'test' | 'staging' | 'production';

/** The Mode environment */
export type ModeEnvironment = 'development' | 'production';

/** Log levels */
export type LogLevel = 'log' | 'info' | 'warn' | 'error';

/** Signature of a logging function */
export interface LogFn {
  (message?: unknown, ...optionalParams: unknown[]): void;
}

/** Basic logger interface */
export interface ILogger {
  log: LogFn;
  info: LogFn;
  warn: LogFn;
  error: LogFn;
}

/** No-op function for suppressed logs */
const NO_OP: LogFn = () => { };

/** Validate and resolve AppEnvironment */
const rawAppEnv = import.meta.env.VITE_ENV_APP;
export const APP_ENV: AppEnvironment = ['development', 'test', 'staging', 'production'].includes(rawAppEnv)
  ? (rawAppEnv as AppEnvironment)
  : 'development';

/** Resolve Mode environment */
export const MODE_ENV: ModeEnvironment = import.meta.env.MODE === 'production' ? 'production' : 'development';

/** Determine default log level */
export const LOG_LEVEL: LogLevel = MODE_ENV === 'production' ? 'warn' : 'log';

/** Logger which outputs to the browser console */
export class ConsoleLogger implements ILogger {
  readonly log: LogFn = NO_OP;
  readonly info: LogFn = NO_OP;
  readonly warn: LogFn = NO_OP;
  readonly error: LogFn = NO_OP;

  constructor({ env, level = 'log' }: { env?: ModeEnvironment, level?: LogLevel } = {}) {
    if (env === 'development') console.log(`You are in development mode`)
    this.error = console.error.bind(console);
    if (this.shouldInclude('warn', level)) this.warn = console.warn.bind(console);
    if (this.shouldInclude('info', level)) this.info = console.info.bind(console);
    if (this.shouldInclude('log', level)) this.log = console.log.bind(console);
  }

  private shouldInclude(type: LogLevel, current: LogLevel): boolean {
    const order: LogLevel[] = ['log', 'info', 'warn', 'error'];
    return order.indexOf(type) >= order.indexOf(current);
  }
}

/** Factory function for flexibility/testing */
export function createLogger(env: ModeEnvironment = MODE_ENV, level: LogLevel = LOG_LEVEL): ILogger {
  return new ConsoleLogger({ env, level });
}

/** Export a singleton logger instance */
export const logger = createLogger();
