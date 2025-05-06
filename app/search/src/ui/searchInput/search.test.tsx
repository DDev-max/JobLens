import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, simulateSubmitForm } from '#ui/shared/test-utils.tsx';
import { Search } from './search';
import { jest } from '@jest/globals';

jest.mock('../../../../jobs/src/getApiKey', () => ({ getApiKey: () => 'fake-api-key' }));
jest.mock('./getBackEndUrl', () => ({ getBackEndUrl: () => 'backEndUrl' }));

(global.fetch as jest.Mock) = jest.fn(() => ({
  ok: true,
  json: () => {},
  text: () => {},
}));

// eslint-disable-next-line no-console
jest.spyOn(console, 'error').mockImplementation(() => console.log('Mock console error')); //to avoid message: "search tag is unrecognized in this browser"

it('should submit the form', async () => {
  const user = userEvent.setup();

  renderWithProviders(<Search />);

  const { inputLocation, inputPosition, inputSkills } = await simulateSubmitForm({ user });

  expect(inputPosition).not.toBeInvalid();
  expect(inputSkills).not.toBeInvalid();
  expect(inputLocation).not.toBeInvalid();

  expect(fetch).toHaveBeenCalledTimes(1);
});

it('shouldnt submit the form if its not valid', async () => {
  const user = userEvent.setup();

  renderWithProviders(<Search />);

  const { inputLocation, inputPosition, inputSkills } = await simulateSubmitForm({
    user,
    values: { location: ' ', skills: 'skill', position: 'x' },
  });

  expect(inputPosition).toBeInvalid();
  expect(inputSkills).toBeInvalid();
  expect(inputLocation).toBeInvalid();

  expect(fetch).not.toHaveBeenCalled();
});

it('should display a message when the search is loading', async () => {
  (global.fetch as jest.Mock) = jest.fn(
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => {},
            text: () => {},
          });
        }, 1000);
      })
  );

  const user = userEvent.setup();

  renderWithProviders(<Search />);

  await simulateSubmitForm({ user });

  const loader = screen.getByRole('progressbar');
  expect(loader).toBeInTheDocument();
});

it('should display an error message when the fetch fails', async () => {
  const user = userEvent.setup();

  (global.fetch as jest.Mock) = jest.fn(
    () =>
      new Promise(resolve =>
        resolve({
          ok: false,
        })
      )
  );

  renderWithProviders(<Search />);
  await simulateSubmitForm({ user });

  const errorMsg = screen.getByText(/unexpected error/i);
  expect(errorMsg).toBeInTheDocument();
});
