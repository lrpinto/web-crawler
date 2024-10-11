import { WebCrawler } from '../src/crawler';

test('Sample test for Jest setup', () => {
    expect(1 + 1).toBe(2);
});

test('Web Crawler class should be defined', async () => {
    const crawler = new WebCrawler('https://example.com');
    expect(crawler).toBeDefined();
});

