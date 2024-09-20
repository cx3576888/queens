import { customRenderHook } from '../test-utils';
import { useReduxSecondCounter } from '../../src/hooks/useReduxSecondCounter';
import { act } from '@testing-library/react';
import { setupStore } from '../../src/state/store';
import { setStatus } from '../../src/state/slices/timerSlice';

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

  test('status === loading: second does not change', () => {
    const store = setupStore();
    store.dispatch(setStatus('loading'));
    const { result } = customRenderHook(() => useReduxSecondCounter(), store);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe(0);
  });

  test('status === loadSuccess: second does not change', () => {
    const store = setupStore();
    store.dispatch(setStatus('loadSuccess'));
    const { result } = customRenderHook(() => useReduxSecondCounter(), store);
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe(0);
  });

  test('status === loadError: second does not change', () => {
    const store = setupStore();
    store.dispatch(setStatus('loadError'));
    const { result } = customRenderHook(() => useReduxSecondCounter(), store);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe(0);
  });

  test('status === paused: second does not change', () => {
    const store = setupStore();
    store.dispatch(setStatus('paused'));
    const { result } = customRenderHook(() => useReduxSecondCounter(), store);
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(result.current).toBe(0);
  });

  test('status === win: second does not change', () => {
    const store = setupStore();
    store.dispatch(setStatus('win'));
    const { result } = customRenderHook(() => useReduxSecondCounter(), store);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe(0);
  });

  test('status === running: second increments by 0.1 every 100ms', () => {
    const store = setupStore();
    store.dispatch(setStatus('running'));
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

  test('status from running --> loading: second is reset to 0 and does not change', () => {
    const store = setupStore();
    store.dispatch(setStatus('running'));
    const { result } = customRenderHook(() => useReduxSecondCounter(), store);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(1);

    act(() => {
      store.dispatch(setStatus('loading'));
    });
    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(0);
  });
});
