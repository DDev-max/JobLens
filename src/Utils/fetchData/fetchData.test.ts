import { fetchData } from './fetchData';

const URL = 'https://example.com';
const retries = 3;
const responseType = 'json';

global.fetch = jest.fn();
const fakeFetch = fetch as jest.MockedFunction<typeof fetch>;

// eslint-disable-next-line no-console
jest.spyOn(console, 'error').mockImplementation(() => console.log('Mock console error'));
//to avoid long error messages on the console caused on purpose

it('should return data', async () => {
  fakeFetch.mockResolvedValueOnce({
    json: () => Promise.resolve({ title: 'Hello' }),
    ok: true,
  } as Response);

  const fetchReturn = await fetchData({ responseType, retries, URL });
  expect(fetchReturn?.data).toStrictEqual({ title: 'Hello' });
  expect(fetchReturn?.error).toBeUndefined();
});

it('should return an error if fetch fails', async () => {
  fakeFetch.mockResolvedValue({
    ok: false,
    status: 500,
    statusText: 'Internal Server Error',
  } as Response);

  const fetchReturn = await fetchData({ responseType, retries, URL });

  expect(fetchReturn?.error).toMatch(/error/i);
  expect(fetchReturn?.data).toBeUndefined();
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

  const fetchReturn = await fetchData({ URL, responseType, retries });

  expect(fetchReturn?.data).toEqual({ success: true });
  expect(global.fetch).toHaveBeenCalledTimes(2);
});

it('should return ResponseTypeError when response type is not valid', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const responseType = 'blob' as any;

  const fetchReturn = await fetchData({ responseType, retries, URL });

  expect(fetchReturn?.error).toMatch(/ResponseTypeError/i);
  expect(fetchReturn?.data).toBeUndefined();
  expect(fetch).not.toHaveBeenCalled();
});
