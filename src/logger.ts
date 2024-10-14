/**
 * `Logger` is a class that provides static methods for logging information, warnings, and errors.
 * It is used throughout the application to log important events and issues.
 */
export class Logger {
  /**
   * Logs an informational message.
   * @param {string} message - The message to log.
   */
  static info(message: string) {
    console.log(`[INFO] ${message}`);
  }

  /**
   * Logs an error message. If an error object is provided, its message is included in the log.
   * @param {string} message - The message to log.
   * @param {Error | unknown} [error] - The error to log.
   */
  static error(message: string, error?: Error | unknown) {
    if (error instanceof Error) {
      console.error(`[ERROR] ${message}: ${error.message}`);
    } else if (error) {
      console.error(`[ERROR] ${message}: ${error}`);
    } else {
      console.error(`[ERROR] ${message}`);
    }
  }

  /**
   * Logs a warning message.
   * @param {string} message - The message to log.
   */
  static warn(message: string) {
    console.warn(`[WARN] ${message}`);
  }
}