import userEvent from '@testing-library/user-event';
import App from '#ui/App.tsx';
import { renderWithProviders, simulateSubmitForm } from '#ui/shared/test-utils.tsx';
import {scrappedPageJson as data, HTML } from 'global-shared-joblens';
import { screen } from '@testing-library/react';
import { getGlassDoorUrl } from '../../../jobs/src/getGlassDoorUrl/getGlassDoorUrl';

jest.mock('react-chartjs-2', () => ({ Bar: () => <div data-testid='chart-mock'></div> }));
// eslint-disable-next-line no-console
jest.spyOn(console, 'error').mockImplementation(() => console.log('Mock console error')); //to avoid message: "search tag is unrecognized..."
jest.mock('../../../jobs/src/getGlassDoorUrl/getGlassDoorUrl');
(getGlassDoorUrl as jest.Mock).mockReturnValueOnce('https://example.com');

jest.mock('../../../jobs/src/getApiKey', () => ({ getApiKey: () => 'fake-api-key' }));
(global.fetch as jest.Mock) = jest.fn(() => ({
  ok: true,
  json: () => Promise.resolve(data),
  text: () => Promise.resolve(HTML),
}));

it('should change the current language by pressing the button', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />);

  const languageBtn = screen.getByRole('button', { expanded: false });
  expect(languageBtn).toHaveAttribute('aria-expanded', 'false');

  const englishText = screen.getByText(/Enter a job title and keywords/i);
  expect(englishText).toBeInTheDocument();

  await user.click(languageBtn);
  expect(languageBtn).toHaveAttribute('aria-expanded', 'true');

  const spanishBtn = screen.getByText(/^Español$/i);
  await user.click(spanishBtn);

  const spanishText = screen.getByText(/Introduzca un puesto de trabajo y palabras clave/i);
  expect(spanishText).toBeInTheDocument();

  expect(screen.queryByText(/Enter a job title and keywords/i)).not.toBeInTheDocument();
});

it('should render charts, filters and cards after the form is submitted', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />);
  await simulateSubmitForm({ user });

  const charts = screen.getAllByTestId('chart-mock');

  const filterSalaryBtn = screen.getByRole('button', { name: /salary/i });
  const filterLocationBtn = screen.getByRole('button', { name: /canada/i });
  const filterSkillBtn = screen.getByRole('button', { name: /python/i });

  const jobCardTitle = screen.getByText(/Infrastructure Software Engineer/i);

  const salaryInfo = screen.getByText(/average monthly salary/i);

  expect(charts).toHaveLength(2);
  expect(filterSalaryBtn).toBeInTheDocument();
  expect(filterLocationBtn).toBeInTheDocument();
  expect(filterSkillBtn).toBeInTheDocument();
  expect(jobCardTitle).toBeInTheDocument();
  expect(salaryInfo).toBeInTheDocument();
});
