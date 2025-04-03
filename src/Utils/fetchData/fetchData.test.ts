import { fetchData } from './fetchData';
import { ResponseTypeError } from './ResponseTypeError';

const URL = 'https://example.com';
const retries = 3;
const responseType = 'json';

global.fetch = jest.fn();
const fakeFetch = fetch as jest.MockedFunction<typeof fetch>;

it('should return data', async () => {
  fakeFetch.mockResolvedValueOnce({
    json: () => Promise.resolve({ title: 'Hello' }),
    ok: true,
  } as Response);

  const data = await fetchData({ responseType, retries, URL });
  expect(data).toStrictEqual({ title: 'Hello' });
});

it('should throw an error if fetch fails', async () => {
  fakeFetch.mockResolvedValue({
    ok: false,
    status: 500,
    statusText: 'Internal Server Error',
  } as Response);

  await expect(fetchData({ URL, responseType, retries })).rejects.toThrow(/Fetch error/i);
});

it('should retry the fetch if it fails', async () => {
  fakeFetch
    .mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

  const result = await fetchData({ URL, responseType, retries });

  expect(result).toEqual({ success: true });
  expect(global.fetch).toHaveBeenCalledTimes(2);
});

it('should throw an error when response type is not valid', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const responseType = 'blob' as any;

  await expect(fetchData({ URL, responseType, retries })).rejects.toThrow(ResponseTypeError);
  expect(fetch).not.toHaveBeenCalled();
});
