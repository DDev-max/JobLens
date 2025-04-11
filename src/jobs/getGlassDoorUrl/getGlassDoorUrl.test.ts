import { getGlassDoorUrl } from './getGlassDoorUrl';
import locationsMock from '#shared/__mocks__/locationApi.json';

const jobLocation = 'Los angeles';
const jobPosition = 'Accountant';
const scraperApiUrl = 'https://scraper.com';

global.fetch = jest.fn();
const fakeFetch = fetch as jest.MockedFunction<typeof fetch>;

it('should return the correct link to the results page from the parameters', async () => {
  fakeFetch.mockResolvedValueOnce({
    json: () => Promise.resolve(locationsMock),
    ok: true,
  } as Response);

  const url = await getGlassDoorUrl({ jobLocation, jobPosition, scraperApiUrl });

  const encodedURL = encodeURIComponent(
    'https://www.glassdoor.com/Job/los-angeles-ca-us-accountant-jobs-SRCH_IL.0,17_IC1146821_KO18,28.htm?sortBy=date_desc'
  );

  expect(url).toBe(encodedURL);
});

it('shouldnt return if theres no api data', async () => {
  fakeFetch.mockResolvedValueOnce({
    json: () => Promise.resolve(undefined),
    ok: true,
  } as Response);

  const url = await getGlassDoorUrl({ jobLocation, jobPosition, scraperApiUrl });

  expect(url).toBeUndefined();
});
