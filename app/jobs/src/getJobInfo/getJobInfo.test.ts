import { TextEncoder, TextDecoder } from 'util';
import { jest } from '@jest/globals';
import { HTML, scrappedPageJson as expectedJobInfo } from 'global-shared-joblens';
Object.assign(global, { TextDecoder, TextEncoder });
// 👆 to avoid error from JSDom library: TextEncoder is not defined

jest.unstable_mockModule('../getApiKey', () => ({ getApiKey: jest.fn().mockReturnValue('fakeApiKey') }));
jest.unstable_mockModule('#getGlassDoorUrl/getGlassDoorUrl.ts', () => ({ getGlassDoorUrl: jest.fn() }));

const { getJobInfo } = await import('./getJobInfo.ts');
const { getGlassDoorUrl } = await import('#getGlassDoorUrl/getGlassDoorUrl.ts');

global.fetch = jest.fn() as unknown as typeof fetch;
const fakeFetch = fetch as jest.MockedFunction<typeof fetch>;
// eslint-disable-next-line no-console
jest.spyOn(console, 'error').mockImplementation(() => console.log('Mock console error'));
//to avoid long error messages on the console caused on purpose

const jobLocation = 'Canada';
const jobPosition = 'software engineer';

it('should return an array of job descriptions from a HTML', async () => {
  (getGlassDoorUrl as jest.Mock).mockReturnValueOnce('https://example.com');
  fakeFetch.mockResolvedValueOnce({
    text: () => Promise.resolve(HTML),
    ok: true,
  } as Response);
  const jobInfo = await getJobInfo({ jobLocation, jobPosition });

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(jobInfo).toEqual(expectedJobInfo);
});

it('shouldnt return if theres no link to scrape', async () => {
  (getGlassDoorUrl as jest.Mock).mockReturnValueOnce(undefined);

  const jobInfo = await getJobInfo({ jobLocation, jobPosition });

  expect(jobInfo).toBeUndefined();
  expect(fetch).not.toHaveBeenCalled();
});

it('shouldnt return if theres no html', async () => {
  (getGlassDoorUrl as jest.Mock).mockReturnValueOnce('https://example.com');

  fakeFetch.mockResolvedValueOnce({
    json: () => Promise.resolve(undefined),
    ok: true,
  } as Response);

  const jobInfo = await getJobInfo({ jobLocation, jobPosition });

  expect(jobInfo).toBeUndefined();
});
