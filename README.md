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
To run the crawler via CLI, use the following command:
```bash
npm run start -- <starting-url>
