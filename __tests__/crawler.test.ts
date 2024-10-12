import axios from "axios";
import { WebCrawler } from '../src/crawler';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
    mockedAxios.get.mockReset();
});

test('Web Crawler class should be defined', async () => {
    const crawler = new WebCrawler('https://example.com');
    expect(crawler).toBeDefined();
});

test('Web Crawler can fetch page content', async () => {
    mockedAxios.get.mockImplementation(async () => {
        return Promise.resolve({data: '<html></html>'});
    });

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

test('WebCrawler can crawl multiple pages within the same domain', async () => {

    const page1 = `
    <html>
      <body>
        <a href="https://example.com/page2">Page 2</a>
        <a href="https://external.com/page3">External Page</a>
      </body>
    </html>
  `;

    const page2 = `
    <html>
      <body>
        <a href="https://example.com/page3">Page 3</a>
      </body>
    </html>
  `;

    const page3 = `
    <html>
      <body>No links here</body>
    </html>
  `;

    mockedAxios.get.mockImplementation(async (url: string) => {
        switch (url) {
            case 'https://example.com/page1':
                return Promise.resolve({data: page1});
            case 'https://example.com/page2':
                return Promise.resolve({data: page2});
            case 'https://example.com/page3':
                return Promise.resolve({data: page3});
            default:
                return Promise.resolve({data: ''});
        }
    });

    const crawler = new WebCrawler('https://example.com/page1');
    const links = await crawler.crawl();

    console.log(links);

    expect(links).toEqual(new Set([
        'https://example.com/page1',
        'https://example.com/page2',
        'https://example.com/page3'
    ]));
});