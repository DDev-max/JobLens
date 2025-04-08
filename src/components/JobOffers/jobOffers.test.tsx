import userEvent from '@testing-library/user-event';
import data from '#__mocks__/scrappedPage.json';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { JobOffers } from './JobOffers';
import { renderWithProviders } from '#Utils/test-utils';
import type { RootState } from '#Context/store';

const preloadedState: RootState = {
  languageReducer: {
    language: 'EN',
  },
  jobDataReducer: {
    data,
    skills: ['React', 'CSS'],
    location: ['Ottawa'],
    currentFilters: {
      location: [],
      skills: [],
      salaryDesc: [false],
    },
    salaryInfo: {
      currency: '$',
      average: '0',
    },
  },
};

it('should render job offers', () => {
  renderWithProviders(<JobOffers maximumItems={1} />, { preloadedState });
  const title = screen.getByRole('heading', { level: 2, name: data[0].jobTitle });
  const img = screen.getByAltText(new RegExp(`${data[0].orgName}`, 'i'));
  const location = screen.getByText(
    (_, element) =>
      element?.tagName === 'P' &&
      new RegExp(`Location\\s*:\\s*${data[0].location}`, 'i').test(element?.textContent || '')
  );
  const age = screen.getByText(new RegExp(`${data[0].jobAge}`, 'i'));

  expect(title).toBeInTheDocument();
  expect(img).toBeInTheDocument();
  expect(age).toBeInTheDocument();
  expect(location).toBeInTheDocument();
});

it('should render more job offers when the button is clicked', async () => {
  const user = userEvent.setup();

  renderWithProviders(<JobOffers maximumItems={1} />, { preloadedState });

  expect(screen.queryByRole('heading', { level: 2, name: data[1].jobTitle })).not.toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);

  const showMoreButton = screen.getByRole('button', { name: 'Show more' });

  await user.click(showMoreButton);

  expect(screen.getByRole('heading', { level: 2, name: data[1].jobTitle })).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2);
});

it('should filter job offers', async () => {
  const user = userEvent.setup();
  renderWithProviders(<JobOffers maximumItems={3} />, { preloadedState });

  const locationButton = screen.getByRole('button', { name: 'Ottawa' });

  await user.click(locationButton);

  const filteredJobOffer = screen.getByRole('heading', { level: 2, name: /Junior Software Developer/i });
  const allJobOffers = screen.getAllByRole('heading', { level: 2 });

  expect(filteredJobOffer).toBeInTheDocument();
  expect(allJobOffers).toHaveLength(1);
});
