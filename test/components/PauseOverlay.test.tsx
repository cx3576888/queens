import { customRender } from '../test-utils';
import PauseOverlay from '../../src/components/PauseOverlay';
import { fireEvent, screen } from '@testing-library/react';
import { setupStore } from '../../src/state/store';
import { setStatus } from '../../src/state/slices/timerSlice';

import styles from '../../src/styles/PauseOverlay.module.css';

describe('PauseOverlay', () => {
  test('status === loading', () => {
    const store = setupStore();
    store.dispatch(setStatus('loading'));
    customRender(<PauseOverlay />, store);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  test('status === loadError', () => {
    const store = setupStore();
    store.dispatch(setStatus('loadError'));
    const { container } = customRender(<PauseOverlay />, store);
    expect(screen.getByText('Load Error!')).toBeInTheDocument();
    expect(container.querySelectorAll(`.${styles.pauseOverlay}`).length).toBe(1);
  });

  test('status === loadSuccess', () => {
    const store = setupStore();
    store.dispatch(setStatus('loadSuccess'));
    customRender(<PauseOverlay />, store);
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  test('status === paused', () => {
    const store = setupStore();
    store.dispatch(setStatus('paused'));
    customRender(<PauseOverlay />, store);
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  test('status === running', () => {
    const store = setupStore();
    store.dispatch(setStatus('running'));
    const { container } = customRender(<PauseOverlay />, store);
    expect(container.querySelectorAll(`.${styles.pauseOverlay}`).length).toBe(0);
  });

  test('status === win', () => {
    const store = setupStore();
    store.dispatch(setStatus('win'));
    const { container } = customRender(<PauseOverlay />, store);
    expect(container.querySelectorAll(`.${styles.pauseOverlay}`).length).toBe(0);
  });

  test('click Continue', () => {
    const store = setupStore();
    store.dispatch(setStatus('paused'));
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    customRender(<PauseOverlay />, store);
    fireEvent.click(screen.getByText('Continue'));
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
