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
