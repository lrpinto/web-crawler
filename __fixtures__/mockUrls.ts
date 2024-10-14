/**
 * `mockUrls` is an object that represents various URLs used in the application.
 * Each key in the object represents a specific URL and the value is a string containing the actual URL.
 *
 * The `startUrl` key represents the starting URL of the application.
 * The `page1Url` key represents the URL of the first page.
 * The `page2Url` key represents the URL of the second page.
 * The `page3Url` key represents the URL of the third page.
 * The `page3UrlExternal` key represents the URL of an external page.
 *
 * This object can be used for testing purposes, particularly for testing web crawlers or similar tools that need to handle multiple URLs.
 */
export const mockUrls = {
    startUrl: 'https://example.com',
    page1Url: 'https://example.com/page1',
    page2Url: 'https://example.com/page2',
    page3Url: 'https://example.com/page3',
    page3UrlExternal: 'https://external.com/page3'
}