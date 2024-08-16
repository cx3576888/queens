// https://testing-library.com/docs/react-testing-library/setup#custom-render
// https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function

import type { ReactElement } from 'react';
import { render, renderHook, type RenderHookOptions, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore, type AppStore } from '../src/state/store';

const customRender = (
  ui: ReactElement,
  store?: AppStore,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const reduxWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store ?? setupStore()}>
        {children}
      </Provider>
    );
  };

  return render(ui, { wrapper: reduxWrapper, ...options });
};

const customRenderHook = <Props, Result>(
  hook: (initialProps: Props) => Result,
  store?: AppStore,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>,
) => {
  const reduxWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store ?? setupStore()}>
        {children}
      </Provider>
    );
  };
  return renderHook(hook, { wrapper: reduxWrapper, ...options });
};

export { customRender, customRenderHook };
