import { Logger } from '../src/logger';

describe('Logger', () => {
    it('should log info message', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        Logger.info('This is an info message');
        expect(consoleSpy).toHaveBeenCalledWith('[INFO] This is an info message');
    });

    it('should log error message', () => {
        const consoleSpy = jest.spyOn(console, 'error');
        Logger.error('This is an error message');
        expect(consoleSpy).toHaveBeenCalledWith('[ERROR] This is an error message');
    });

    it('should log warn message', () => {
        const consoleSpy = jest.spyOn(console, 'warn');
        Logger.warn('This is a warning message');
        expect(consoleSpy).toHaveBeenCalledWith('[WARN] This is a warning message');
    });
});