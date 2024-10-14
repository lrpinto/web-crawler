/**
 * `mockCyclicPages` is an object that represents two HTML pages with cyclic links.
 * Each key in the object represents a page and the value is a string containing the HTML content of the page.
 *
 * The `page1` key represents the first page. Its HTML content contains a link to the second page.
 * The `page2` key represents the second page. Its HTML content contains a link back to the first page, creating a cycle.
 *
 * This object can be used for testing purposes, particularly for testing web crawlers or similar tools that need to handle cyclic links.
 */
export const mockCyclicPages = {
    page1: `
        <html>
          <body>
            <a href="https://example.com/page2">Page 2</a>
          </body>
        </html>
    `,
    page2: `
        <html>
          <body>
            <a href="https://example.com/page1">Page 1</a> <!-- Cyclic link back to page 1 -->
          </body>
        </html>
    `,
};