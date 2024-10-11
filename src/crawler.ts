import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';

export class WebCrawler {

    startUrl: string;
    visitedUrls: Set<string>;

    constructor(startUrl: string) {
        this.startUrl = startUrl;
        this.visitedUrls = new Set();
    }

    async fetchPageContent(): Promise<string> {
        try {
            const response = await axios.get(this.startUrl);
            return response.data;
        } catch (error) {
            // FIXME: This is a temporary solution to handle errors
            if (error instanceof Error) {
                console.error(`Error fetching page: ${error.message}`);
            } else {
                console.error(`Unknown error occurred`);
            }
            return '';
        }
    }

    extractLinks(htmlContent: string) {
        const $ = cheerio.load(htmlContent);
        const links = new Set<string>();
        const baseUrl = new URL(this.startUrl);

        $('a[href]').each((_, element) => {
            const href = $(element).attr('href');
            if (href) {
                const url = new URL(href, baseUrl.origin).href;
                links.add(url.toString());
            }
        });

        return links;
    }

    async crawl(url: string = this.startUrl): Promise<Set<string>> {
        if (this.visitedUrls.has(url)) {
            return this.visitedUrls;
        }

        this.visitedUrls.add(url);
        console.log(`Crawling: ${url}`);

        const pageContent = await this.fetchPageContent();
        if (pageContent) {
            const links = this.extractLinks(pageContent);
            for (const link of links) {
                if (this.isSameDomain(link)) {
                    await this.crawl(link);
                }
            }
        };

        return this.visitedUrls;
    }

    isSameDomain(link: string): boolean {
        const linkUrl = new URL(link);
        const baseUrl = new URL(this.startUrl);
        return linkUrl.origin === baseUrl.origin;
    }
}