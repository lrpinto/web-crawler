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

test('Web Crawler can extrcat links from page content', async () => {
    const crawler = new WebCrawler('https://example.com');

    const htmlContent = `
    <html>
      <body>
        <a href="http://example.com/page1">Page 1</a>
        <a href="/page2">Page 2</a>
      </body>
    </html>
  `;

    const links = crawler.extractLinks(htmlContent);
    expect(links).toEqual(new Set(['http://example.com/page1', 'https://example.com/page2']));
});
