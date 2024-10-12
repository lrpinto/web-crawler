import axios from "axios";
import { describe } from "node:test";
import { WebCrawler } from '../src/crawler';
import { Logger } from "../src/logger";
import { mockPages } from '../__fixtures__/mockPages';

jest.mock('axios');
jest.mock('../src/logger');

describe(WebCrawler.name, () => {
    let mockedAxios: jest.Mocked<typeof axios>;

    beforeEach(() => {
        mockedAxios = axios as jest.Mocked<typeof axios>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Web Crawler class should be defined', async () => {
        const crawler = new WebCrawler('https://example.com');
        expect(crawler).toBeDefined();
    });

    test('Web Crawler can fetch page content', async () => {
        mockedAxios.get.mockImplementation(async () => {
            return Promise.resolve({data: '<html></html>', status: 200});
        });

        const crawler = new WebCrawler('https://example.com');
        const content = await crawler.fetchPageContent();
        expect(content).toContain('<html>');
    });

    test('Web Crawler can extract links from page content', async () => {
        const crawler = new WebCrawler('https://example.com');

        const links = crawler.extractLinks(mockPages.page1);
        expect(links).toEqual(new Set([
            'http://example.com/page1',
            'https://example.com/page2',
            'https://external.com/page2'
        ]));
    });

    test('WebCrawler can crawl multiple pages within the same domain', async () => {

        mockedAxios.get.mockImplementation(async (url: string) => {
            const { page1, page2, page3 } = mockPages;
            switch (url) {
                case 'https://example.com/page1':
                    return Promise.resolve({data: page1, status: 200});
                case 'https://example.com/page2':
                    return Promise.resolve({data: page2, status: 200});
                case 'https://example.com/page3':
                    return Promise.resolve({data: page3, status: 200});
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
            'https://example.com/page3',
        ]));
    });


    test('Web Crawler should log and handle a Network Error', async () => {
        const error = new Error('Network Error');
        mockedAxios.get.mockRejectedValue(error);

        const crawler = new WebCrawler('https://example.com');
        await crawler.fetchPageContent();

        expect(Logger.error).toHaveBeenCalledWith('Error fetching page', error);
    });

    test('Web Crawler should log and handle non-200 HTTP status codes', async () => {
        mockedAxios.get.mockResolvedValue({status: 404});

        const crawler = new WebCrawler('https://example.com');
        await crawler.fetchPageContent();

        expect(Logger.error).toHaveBeenCalledWith('Error fetching page: 404');
    });
});