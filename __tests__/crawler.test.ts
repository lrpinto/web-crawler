import { WebCrawler } from '../src/crawler';

test('Web Crawler class should be defined', async () => {
    const crawler = new WebCrawler('https://example.com');
    expect(crawler).toBeDefined();
});

test('Web Crawler can fetch page content', async () => {
    const crawler = new WebCrawler('https://example.com');
    const content = await crawler.fetchPageContent();
    expect(content).toContain('<html>');
});
