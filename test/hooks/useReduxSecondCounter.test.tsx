import { customRenderHook } from '../test-utils';
import { useReduxSecondCounter } from '../../src/hooks/useReduxSecondCounter';
import { act } from '@testing-library/react';
import { setupStore } from '../../src/state/store';
import { setIsPaused, setNeedReset } from '../../src/state/slices/timerSlice';

describe('useReduxSecondCounter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test('initial state: second is 0', () => {
    const { result } = customRenderHook(() => useReduxSecondCounter());
    expect(result.current).toBe(0);
  });

  test('when isPaused is true, second does not change', () => {
    const store = setupStore();
    store.dispatch(setIsPaused(true));
    const { result } = customRenderHook(() => useReduxSecondCounter(), store);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe(0);
  });

  test('when isPaused is false, second increments by 0.1 every 100ms', () => {
    const store = setupStore();
    store.dispatch(setIsPaused(false));
    const { result } = customRenderHook(() => useReduxSecondCounter(), store);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe(0.1);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe(0.2);
  });

  test('when needReset is true, second is reset to 0 and needReset is set back to false', () => {
    const store = setupStore();
    store.dispatch(setIsPaused(false));
    const { result } = customRenderHook(() => useReduxSecondCounter(), store);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(1);

    act(() => {
      store.dispatch(setNeedReset(true));
    });
    expect(result.current).toBe(0);
    expect(store.getState().timer.needReset).toBe(false);
  });
});
