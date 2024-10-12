# Web Crawler

## Description
This project is a simple web crawler built using TypeScript. It crawls pages within a given domain, visits each URL found on the same domain, and logs both the visited URLs and the links found on each page.

## Features
- Crawls pages within the same domain.
- Skips external links.
- Handles cyclic links to avoid infinite loops.
- Logs URLs visited and links found.
- Includes error handling for network issues and non-200 HTTP responses.
- Built with concurrency using `Promise.all` for efficient crawling.

## Prerequisites
- Node.js (v20 or higher)
- NPM (v10 or higher)

## Installation
1. Clone this repository:
    ```bash
    git clone https://github.com/lrpinto/web-crawler.git
    ```
2. Navigate to the project directory:
    ```bash
    cd web-crawler
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Running the Crawler

### Development mode

To run the crawler in development mode using ts-node, use the following command:
```bash
npm run dev -- <starting-url>
```

This run the Typescript files directly without the need to compile them first.

### Production mode

1. To run the crawler in production mode, first compile the Typescript files using the following command:
   ```bash  
   npm run build
   ```
   
   This compiles the TypeScript files and outputs the JavaScript files into the dist directory.


2. Then run the compiled JavaScript files using the following command:
   ```bash
   npm run prod -- <starting-url>
   ```

## Formatting the code

To format the code using Prettier, run the following command:
```bash
npm run format
```

This will format all TypeScript files inside the `src` directory.

## Linting the code

To lint the code using ESLint, run the following command:
```bash
npm run lint
```

This checks for code quality issues and attempts to fix them where possible.

## Running the tests
To run the tests run the following command:
```bash
npm test
```

This runs the Jest test suite to ensure all functionality works as expected.

## Design Decisions
**Concurrency**: `Promise.all` is used to handle concurrent crawling of multiple URLs to speed up the process.

**Error Handling**: Any network errors or non-200 HTTP responses are logged using a custom logger that internally uses `console.log`.

**Modularisation**: Mock data, URLs, and Axios mocking functions are separated into fixtures and utility files to keep the code organised.

**Testing**: Comprehensive test cases are written using Jest to cover multiple aspects such as link extraction, error handling, and cyclic links.

# Future Improvements

The current implementation meets the project requirements, however, there are several areas where the web crawler could be improved to handle more complex use cases and improve performance. Here are some possible improvements:

## 1. Rate Limiting
To avoid overwhelming websites with too many requests in a short period of time, rate limiting could be implemented. This would ensure the crawler only makes a set number of requests per second or minute.

- **Why it matters**: This prevents the crawler from being throttled or blocked due to excessive requests.
- **How to implement**: I could use a package like `bottleneck` to limit the rate of requests made to the server.

## 2. Respecting `robots.txt`
Currently, the crawler does not check for `robots.txt`. Implementing this would ensure the crawler respects a website's rules on which pages can be crawled and at what frequency.

- **Why it matters**: Respecting `robots.txt` ensures the crawler adheres to best practices and avoids crawling restricted or sensitive areas of a site.
- **How to implement**: This could be done using a library like `robots-parser` to interpret the `robots.txt` file.

## 3. Configurable Crawl Depth
At the moment, the crawler explores all links within the same domain. By adding a configurable crawl depth, I could limit how deep the crawler goes, for example, only following links 2 or 3 levels deep from the starting page.

- **Why it matters**: This gives more control over how much of a site is crawled, which can be particularly useful when dealing with large sites.
- **How to implement**: I could add a `depth` parameter to the crawl method that decreases with each recursive call, stopping when the depth reaches zero.

## 4. Database for Storing Crawled Timestamps
To improve the efficiency of future crawls, I could add a database to store URLs along with the timestamps of when they were last crawled. This would allow for periodic re-crawls of updated content without revisiting pages unnecessarily.

- **Why it matters**: It prevents redundant crawling and allows for more efficient use of resources, especially when performing regular crawls.
- **How to implement**: This could be achieved by integrating a database like SQLite, MongoDB, or Postgres to store the URL and timestamp of the last crawl.

## 5. Distributed Crawling
For larger websites, distributed crawling could be introduced by breaking the crawl process across multiple instances of the crawler. Each instance could be responsible for a subset of URLs.

- **Why it matters**: Distributed crawling would improve efficiency and scalability, especially for large websites.
- **How to implement**: A message queue system such as RabbitMQ or Kafka could be used to distribute URLs across multiple worker crawlers.

## 6. Advanced Logging with Datadog
Rather than using `console.log` for logging, I could integrate with an external logging service like Datadog. This would allow for better centralised logging, monitoring, and alerting.

- **Why it matters**: Centralised logging enables real-time monitoring, alerting, and diagnostics, particularly for large-scale crawling operations.
- **How to implement**: Using Datadog's Node.js client to send logs and metrics to the Datadog platform for monitoring.

## 7. Configurable User-Agent and Headers
Adding support for configurable HTTP headers, including the `User-Agent`, would allow the crawler to simulate different clients (like browsers or mobile devices) or avoid detection as a bot.

- **Why it matters**: This can prevent the crawler from being blocked or misidentified by websites as a bot.
- **How to implement**: I could add an option to set custom headers for each request in the crawler.

## 8. Handling Dynamic Content (JavaScript-rendered Pages)
Currently, the crawler only processes static HTML. Some websites rely on JavaScript to load content dynamically, which won't be captured by the current implementation. Adding support for dynamic content would improve the accuracy of the crawl on modern websites.

- **Why it matters**: Many modern websites rely on JavaScript for rendering content. Handling this would ensure the crawler can capture all the important data.
- **How to implement**: A headless browser like Puppeteer or Playwright could be used to render JavaScript-heavy pages.

## 9. Sitemap Parsing
To improve efficiency, the crawler could parse and prioritize URLs listed in the website's sitemap (`sitemap.xml`). This would give a clear structure to the crawling process and potentially reduce the number of unnecessary requests.

- **Why it matters**: A sitemap often contains a complete list of URLs that are important to the website, making crawling more focused and efficient.
- **How to implement**: The crawler could fetch and parse the sitemap at the start, then use it as a guide for crawling.


With these improvement, the crawler would be more powerful, efficient, and capable of handling a wider range of use cases. These improvements would also make it more robust and scalable, ready for use in more demanding web scraping scenarios.
