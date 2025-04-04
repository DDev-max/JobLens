import { getJobInfo } from './getJobInfo';
import { HTML } from '../../__mocks__/pageHtml';
import { fetchData } from '../fetchData/fetchData';
import { getGlassDoorUrl } from '../getGlassDoorUrl/getGlassDoorUrl';
import expectedJobInfo from '@/__mocks__/scrappedPage.json';

jest.mock('../getGlassDoorUrl/getGlassDoorUrl');
jest.mock('@/data/getApiKey', () => ({ getApiKey: () => 'fake-api-key' }));
jest.mock('../fetchData/fetchData');

const jobLocation = 'Canada';
const jobPosition = 'software engineer';

it('should return an array of job descriptions from a HTML', async () => {
  (getGlassDoorUrl as jest.Mock).mockReturnValueOnce('https://example.com');
  (fetchData as jest.Mock).mockReturnValueOnce(HTML);

  const jobInfo = await getJobInfo({ jobLocation, jobPosition });

  expect(fetchData).toHaveBeenCalledTimes(1);
  expect(jobInfo).toStrictEqual(expectedJobInfo);
});

it('shouldnt return if theres no link to scrape', async () => {
  (getGlassDoorUrl as jest.Mock).mockReturnValueOnce(undefined);

  const jobInfo = await getJobInfo({ jobLocation, jobPosition });

  expect(jobInfo).toBeUndefined();
  expect(fetchData).not.toHaveBeenCalled();
});

it('shouldnt return if theres no html', async () => {
  (getGlassDoorUrl as jest.Mock).mockReturnValueOnce('https://example.com');
  (fetchData as jest.Mock).mockReturnValueOnce(undefined);
  const jobInfo = await getJobInfo({ jobLocation, jobPosition });

  expect(jobInfo).toBeUndefined();
});
