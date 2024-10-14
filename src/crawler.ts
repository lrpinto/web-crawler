import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";
import { Logger } from "./logger";

/**
 * `WebCrawler` is a class that represents a simple web crawler.
 * It has methods to fetch the content of a page, extract links from it, and crawl all the pages in the same domain.
 */
export class WebCrawler {
  startUrl: string;
  visitedUrls: Set<string>;

  /**
   * The constructor for the `WebCrawler` class.
   * @param {string} startUrl - The URL where the web crawler should start crawling.
   */
  constructor(startUrl: string) {
    this.startUrl = startUrl;
    this.visitedUrls = new Set();
  }

  /**
   * Fetches the content of a page.
   * @param {string} url - The URL of the page to fetch. Defaults to the `startUrl`.
   * @returns {Promise<string>} A promise that resolves to the content of the page.
   */
  async fetchPageContent(url: string = this.startUrl): Promise<string> {
    try {
      const response = await axios.get(url);

      if (response.status !== 200) {
        Logger.error(`Error fetching page: ${response.status}`);
        return "";
      }

      return response.data;
    } catch (error) {
      Logger.error(`Error fetching page`, error);
      return "";
    }
  }

  /**
   * Extracts all the links from the HTML content of a page.
   * @param {string} htmlContent - The HTML content of the page.
   * @returns {Set<string>} A set of all the links found in the page.
   */
  extractLinks(htmlContent: string) {
    const $ = cheerio.load(htmlContent);
    const links = new Set<string>();
    const baseUrl = new URL(this.startUrl);

    $("a[href]").each((_, element) => {
      const href = $(element).attr("href");
      if (href) {
        const url = new URL(href, baseUrl.origin).href;
        links.add(url.toString());
      }
    });

    return links;
  }

  /**
   * Crawls all the pages in the same domain starting from a specific URL.
   * @param {string} url - The URL where the web crawler should start crawling. Defaults to the `startUrl`.
   * @returns {Promise<Set<string>>} A promise that resolves to a set of all the URLs visited by the web crawler.
   */
  async crawl(url: string = this.startUrl): Promise<Set<string>> {
    if (this.visitedUrls.has(url)) {
      Logger.info(`Already visited: ${url}`);
      return this.visitedUrls;
    }

    this.visitedUrls.add(url);
    Logger.info(`Crawling: ${url}`);

    const pageContent = await this.fetchPageContent(url);
    if (!pageContent) return this.visitedUrls;

    const links = this.extractLinks(pageContent);
    Logger.info(`Links found on ${url}: ${[...links].join(", ")}`);

    const crawlPromises: Promise<Set<string>>[] = [];

    for (const link of links) {
      if (this.isSameDomain(link) && !this.visitedUrls.has(link)) {
        crawlPromises.push(this.crawl(link));
      }
    }

    await Promise.all(crawlPromises);
    return this.visitedUrls;
  }

  /**
   * Checks if a link is in the same domain as the `startUrl`.
   * @param {string} link - The link to check.
   * @returns {boolean} `true` if the link is in the same domain as the `startUrl`, `false` otherwise.
   */
  isSameDomain(link: string): boolean {
    const linkUrl = new URL(link);
    const baseUrl = new URL(this.startUrl);
    return linkUrl.origin === baseUrl.origin;
  }
}