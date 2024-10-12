import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";
import { Logger } from "./logger";

export class WebCrawler {
  startUrl: string;
  visitedUrls: Set<string>;

  constructor(startUrl: string) {
    this.startUrl = startUrl;
    this.visitedUrls = new Set();
  }

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

  isSameDomain(link: string): boolean {
    const linkUrl = new URL(link);
    const baseUrl = new URL(this.startUrl);
    return linkUrl.origin === baseUrl.origin;
  }
}
