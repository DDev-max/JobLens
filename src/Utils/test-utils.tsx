import type { PropsWithChildren } from 'react'
import React from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '@/Context/store'
import type { AppStore, RootState } from '@/Context/store'
import { HeroUIProvider } from '@heroui/system'

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
