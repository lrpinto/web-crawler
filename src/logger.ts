export class Logger {
  static info(message: string) {
    console.log(`[INFO] ${message}`);
  }

  static error(message: string, error?: Error | unknown) {
    if (error instanceof Error) {
      console.error(`[ERROR] ${message}: ${error.message}`);
    } else if (error) {
      console.error(`[ERROR] ${message}: ${error}`);
    } else {
      console.error(`[ERROR] ${message}`);
    }
  }

  static warn(message: string) {
    console.warn(`[WARN] ${message}`);
  }
}
