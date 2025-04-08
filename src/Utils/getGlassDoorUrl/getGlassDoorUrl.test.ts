import { fetchData } from '../fetchData/fetchData';
import { getGlassDoorUrl } from './getGlassDoorUrl';
import locationsMock from '#__mocks__/locationApi.json';

const jobLocation = 'Los angeles';
const jobPosition = 'Accountant';
const scraperApiUrl = 'https://scraper.com';

jest.mock('../fetchData/fetchData');

it('should return the correct link to the results page from the parameters', async () => {
  (fetchData as jest.Mock).mockReturnValueOnce(locationsMock);
  const url = await getGlassDoorUrl({ jobLocation, jobPosition, scraperApiUrl });

  const encodedURL = encodeURIComponent(
    'https://www.glassdoor.com/Job/los-angeles-ca-us-accountant-jobs-SRCH_IL.0,17_IC1146821_KO18,28.htm?sortBy=date_desc'
  );

  expect(url).toBe(encodedURL);
});

it('shouldnt return if theres no api data', async () => {
  (fetchData as jest.Mock).mockReturnValueOnce(undefined);

  const url = await getGlassDoorUrl({ jobLocation, jobPosition, scraperApiUrl });

  expect(url).toBeUndefined();
});
