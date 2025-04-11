import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });
// 👆 to avoid error from JSDom library: TextEncoder is not defined
import { getJobInfo } from './getJobInfo';
import { HTML } from '../../shared/__mocks__/pageHtml';
import { getGlassDoorUrl } from '../getGlassDoorUrl/getGlassDoorUrl';
import expectedJobInfo from '#shared/__mocks__/scrappedPage.json';

jest.mock('../getGlassDoorUrl/getGlassDoorUrl');
jest.mock('#jobs/getApiKey.ts', () => ({ getApiKey: () => 'fake-api-key' }));
global.fetch = jest.fn();
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
  expect(jobInfo).toStrictEqual(expectedJobInfo);
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
