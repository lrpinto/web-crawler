import axios from 'axios';

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
}