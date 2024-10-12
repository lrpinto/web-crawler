import axios, { AxiosResponse } from 'axios';

jest.mock('axios');
export const mockedAxios = axios as jest.Mocked<typeof axios>;

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