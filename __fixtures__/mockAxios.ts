import axios, { AxiosResponse } from 'axios';

// Mocking the axios module using jest
jest.mock('axios');

// Creating a mocked version of axios
export const mockedAxios = axios as jest.Mocked<typeof axios>;

/**
 * This function is used to mock the GET requests made by axios.
 * It takes a urlMap as an argument which is a record of URLs mapped to their respective responses.
 * The response for each URL is an object containing 'data' and 'status'.
 * If a GET request is made to a URL present in the urlMap, it returns a Promise that resolves to the corresponding response.
 * If a GET request is made to a URL not present in the urlMap, it returns a Promise that resolves to a response with data as an empty string and status as 404.
 *
 * @param {Record<string, Pick<AxiosResponse, 'data' | 'status'>>} urlMap - A record of URLs mapped to their respective responses.
 */
export const mockAxiosGet = (urlMap: Record<string, Pick<AxiosResponse, 'data' | 'status'>>) => {
    mockedAxios.get.mockImplementation(async (url: string) => {
        if (urlMap[url]) {
            return Promise.resolve({
                data: urlMap[url].data,
                status: urlMap[url].status || 200,
            });
        }
        return Promise.resolve({ data: '', status: 404});
    });
}