/**
 * `mockPages` is an object that represents three HTML pages with links between them.
 * Each key in the object represents a page and the value is a string containing the HTML content of the page.
 *
 * The `page1` key represents the first page. Its HTML content contains a link to the second page and an external page.
 * The `page2` key represents the second page. Its HTML content contains a link to the third page.
 * The `page3` key represents the third page. Its HTML content does not contain any links.
 *
 * This object can be used for testing purposes, particularly for testing web crawlers or similar tools that need to handle multiple pages with different links.
 */
export const mockPages = {
    page1: `
        <html>
          <body>
            <a href="/page2">Page 2</a>
            <a href="https://external.com/page3">External Page</a>
          </body>
        </html>
    `,
    page2: `
        <html>
          <body>
            <a href="https://example.com/page3">Page 3</a>
          </body>
        </html>
    `,
    page3: `
        <html>
          <body>No links here</body>
        </html>
    `,
};