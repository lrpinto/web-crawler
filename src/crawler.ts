import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';

export class WebCrawler {

    startUrl: string;

    constructor(startUrl: string) {
        this.startUrl = startUrl;
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
}