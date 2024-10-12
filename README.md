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
```

## Running the tests
To run the tests run the following command:
```bash
npm test
```

## Design Decisions
**Concurrency**: `Promise.all` is used to handle concurrent crawling of multiple URLs to speed up the process.
**Error Handling**: Any network errors or non-200 HTTP responses are logged using a custom logger that internally uses `console.log`.
**Modularisation**: Mock data, URLs, and Axios mocking functions are separated into fixtures and utility files to keep the code organised.
**Testing**: Comprehensive test cases are written using Jest to cover multiple aspects such as link extraction, error handling, and cyclic links.