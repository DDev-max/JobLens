import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { languagei18n } from '#data/consts';
import { renderWithProviders } from '#Utils/test-utils';
import { Search } from './search';

const english = languagei18n['EN'].search;

jest.mock('#data/getApiKey', () => ({ getApiKey: () => 'fake-api-key' }));
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

  const inputPosition = screen.getByLabelText(english.positionLabel);
  const inputSkills = screen.getByLabelText(english.skillsLabel);
  const inputLocation = screen.getByLabelText(english.locationLabel);

  await user.type(inputPosition, 'Back end');
  await user.type(inputSkills, 'Python, Sql, JavaScript');
  await user.type(inputLocation, 'Canada');

  expect(inputPosition).not.toBeInvalid();
  expect(inputSkills).not.toBeInvalid();
  expect(inputLocation).not.toBeInvalid();

  await user.keyboard('[Enter]');

  expect(fetch).toHaveBeenCalled();
});

it('shouldnt submit the form if its not valid', async () => {
  const user = userEvent.setup();

  renderWithProviders(<Search />);

  const inputPosition = screen.getByLabelText(english.positionLabel);
  const inputSkills = screen.getByLabelText(english.skillsLabel);
  const inputLocation = screen.getByLabelText(english.locationLabel);

  await user.type(inputPosition, 'x');
  await user.type(inputSkills, 'skill');
  await user.type(inputLocation, ' ');

  expect(inputPosition).toBeInvalid();
  expect(inputSkills).toBeInvalid();
  expect(inputLocation).toBeInvalid();

  await user.keyboard('[Enter]');

  expect(fetch).not.toHaveBeenCalled();
});
