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