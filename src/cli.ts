import { WebCrawler } from "./crawler";
import { Logger } from "./logger";

const startUrl = process.argv[2];

if (!startUrl) {
  Logger.error("Please provide a start URL");
  process.exit(1);
}

const runCrawler = async (startUrl: string) => {
    const crawler = new WebCrawler(startUrl);
    const visitedUrls = await crawler.crawl();
    Logger.info(`Visited ${visitedUrls.size} pages:`);
    Logger.info('Crawled URLs:');
    Logger.info([...visitedUrls].join('\n'));
};

runCrawler(startUrl);