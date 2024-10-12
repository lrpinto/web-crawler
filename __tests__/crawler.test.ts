import axios from "axios";
import { describe } from "node:test";
import { mockAxiosGet, mockedAxios } from "../__fixtures__/mockAxios";
import { WebCrawler } from '../src/crawler';
import { Logger } from "../src/logger";
import { mockPages } from '../__fixtures__/mockPages';

jest.mock('../src/logger');

describe(WebCrawler.name, () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Web Crawler class should be defined', async () => {
        const crawler = new WebCrawler('https://example.com');
        expect(crawler).toBeDefined();
    });

    test('Web Crawler can fetch page content', async () => {
        mockAxiosGet({
            'https://example.com': {data: '<html></html>', status: 200}
        })

        const crawler = new WebCrawler('https://example.com');
        const content = await crawler.fetchPageContent();
        expect(content).toContain('<html>');
    });

    test('Web Crawler can extract links from page content', async () => {
        const crawler = new WebCrawler('https://example.com');

        const links = crawler.extractLinks(mockPages.page1);
        expect(links).toEqual(new Set([
            'https://example.com/page2',
            'https://external.com/page3'
        ]));
    });

    test('WebCrawler can crawl multiple pages within the same domain', async () => {
        const { page1, page2, page3 } = mockPages;
        mockAxiosGet({
            'https://example.com/page1': {data: page1, status: 200},
            'https://example.com/page2': {data: page2, status: 200},
            'https://example.com/page3': {data: page3, status: 200},
        });

        const crawler = new WebCrawler('https://example.com/page1');
        const links = await crawler.crawl();

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