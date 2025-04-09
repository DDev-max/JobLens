import type { PropsWithChildren } from 'react'
import React from 'react'
import { render, screen } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '#Context/store'
import type { AppStore, RootState } from '#Context/store'
import { HeroUIProvider } from '@heroui/system'
import { languagei18n } from '#data/consts.ts'
import type { UserEvent } from '@testing-library/user-event'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {}
) {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <HeroUIProvider>
        <Provider store={store}>{children}</Provider>
      </HeroUIProvider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

interface SimulateSubmitFormParams {
  user: UserEvent
  values?: {
    position: string
    skills: string
    location: string
  }
}

export async function simulateSubmitForm({ user, values }: SimulateSubmitFormParams) {
  const english = languagei18n['EN'].search

  const inputPosition = screen.getByLabelText(english.positionLabel)
  const inputSkills = screen.getByLabelText(english.skillsLabel)
  const inputLocation = screen.getByLabelText(english.locationLabel)

  await user.type(inputPosition, values?.position || 'Back end')
  await user.type(inputSkills, values?.skills || 'Python, Sql, JavaScript')
  await user.type(inputLocation, values?.location || 'Canada')

  await user.keyboard('[Enter]')

  return { inputPosition, inputSkills, inputLocation }
}
