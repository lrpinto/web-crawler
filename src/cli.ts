import { WebCrawler } from "./crawler";
import { Logger } from "./logger";

/**
 * `startUrl` is the URL where the web crawler should start crawling.
 * It is passed as a command line argument when running the script.
 */
const startUrl = process.argv[2];

/**
 * If no start URL is provided, log an error message and exit the process with a status code of 1.
 */
if (!startUrl) {
  Logger.error("Please provide a start URL");
  process.exit(1);
}

/**
 * `runCrawler` is an asynchronous function that creates a new instance of `WebCrawler` and starts the crawling process.
 * After the crawling process is finished, it logs the number of pages visited and the URLs of the visited pages.
 *
 * @param {string} startUrl - The URL where the web crawler should start crawling.
 */
const runCrawler = async (startUrl: string) => {
  const crawler = new WebCrawler(startUrl);
  const visitedUrls = await crawler.crawl();
  Logger.info(`Visited ${visitedUrls.size} pages:`);
  Logger.info("Crawled URLs:");
  Logger.info([...visitedUrls].join("\n"));
};

/**
 * Starts the crawling process by calling the `runCrawler` function with the `startUrl` as an argument.
 */
runCrawler(startUrl);