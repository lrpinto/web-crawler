import { describe } from "node:test";
import { mockAxiosGet, mockedAxios } from "../__fixtures__/mockAxios";
import { mockCyclicPages } from "../__fixtures__/mockCyclicPages";
import { mockUrls } from "../__fixtures__/mockUrls";
import { WebCrawler } from '../src/crawler';
import { Logger } from "../src/logger";
import { mockPages } from '../__fixtures__/mockPages';

jest.mock('../src/logger');

describe(WebCrawler.name, () => {
    const { startUrl, page1Url, page2Url, page3Url, page3UrlExternal } = mockUrls;

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Web Crawler class should be defined', async () => {
        const crawler = new WebCrawler(startUrl);
        expect(crawler).toBeDefined();
    });

    test('Web Crawler can fetch page content', async () => {
        mockAxiosGet({
            [startUrl]: {data: '<html></html>', status: 200}
        })

        const crawler = new WebCrawler(startUrl);
        const content = await crawler.fetchPageContent();
        expect(content).toContain('<html>');
    });

    test('Web Crawler can extract links from page content', async () => {
        const crawler = new WebCrawler(startUrl);

        const links = crawler.extractLinks(mockPages.page1);
        expect(links).toEqual(new Set([
            page2Url,
            page3UrlExternal
        ]));
    });

    test('WebCrawler can crawl multiple pages within the same domain', async () => {
        const { page1, page2, page3 } = mockPages;
        mockAxiosGet({
            [page1Url]: {data: page1, status: 200},
            [page2Url]: {data: page2, status: 200},
            [page3Url]: {data: page3, status: 200},
        });

        const crawler = new WebCrawler(page1Url);
        const links = await crawler.crawl();

        expect(links).toEqual(new Set([
            page1Url,
            page2Url,
            page3Url,
        ]));
    });


    test('Web Crawler should log and handle a Network Error', async () => {
        const error = new Error('Network Error');
        mockedAxios.get.mockRejectedValue(error);

        const crawler = new WebCrawler(startUrl);
        await crawler.fetchPageContent();

        expect(Logger.error).toHaveBeenCalledWith('Error fetching page', expect.any(Error));
    });

    test('Web Crawler should log and handle non-200 HTTP status codes', async () => {
        //mockedAxios.get.mockResolvedValue({ data: '', status: 404 });
        mockAxiosGet({});

        const crawler = new WebCrawler(startUrl);
        await crawler.fetchPageContent();

        expect(Logger.error).toHaveBeenCalledWith('Error fetching page: 404');
    });

    test('WebCrawler handles cyclic links', async () => {
        const { page1Url, page2Url } = mockUrls;
        const { page1, page2 } = mockCyclicPages;

        mockAxiosGet({
            [page1Url]: { data: page1, status: 200 },
            [page2Url]: { data: page2, status: 200 },
        });

        const crawler = new WebCrawler(page1Url);
        const links = await crawler.crawl();

        expect(links).toEqual(new Set([
            page1Url,
            page2Url,
        ]));
    });

    test('WebCrawler should not visit the same page twice', async () => {
        const { page1Url } = mockUrls;
        const { page1 } = mockCyclicPages;

        mockAxiosGet({
            [page1Url]: { data: page1, status: 200 },
        });

        jest.spyOn(Set.prototype, 'has').mockImplementationOnce((page1Url) => true);

        const crawler = new WebCrawler(page1Url);
        const links = await crawler.crawl();

        expect(Logger.info).toHaveBeenCalledWith('Already visited: ' + page1Url);
    });
});