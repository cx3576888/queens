import { customRender } from '../test-utils';
import Timer from '../../src/components/Timer';
import { act, screen } from '@testing-library/react';
import { setupStore } from '../../src/state/store';
import { setStatus } from '../../src/state/slices/timerSlice';

describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders Timer component with initial state', () => {
    customRender(<Timer />);
    expect(screen.getByText('000:00:00.0')).toBeInTheDocument();
  });

  test('run 3723.4 seconds', () => {
    const store = setupStore();
    store.dispatch(setStatus('running'));
    customRender(<Timer />, store);

    act(() => {
      vi.advanceTimersByTime(3723.4 * 1000);
    });
    expect(screen.getByText('001:02:03.4')).toBeInTheDocument();
  });

  test('run 1.2 seconds, then win', () => {
    const store = setupStore();
    store.dispatch(setStatus('running'));
    customRender(<Timer />, store);

    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.getByText('000:00:01.2')).toBeInTheDocument();

    act(() => {
      store.dispatch(setStatus('win'));
    });
    act(() => {
      vi.advanceTimersByTime(2400);
    });
    expect(screen.getByText('000:00:01.2')).toBeInTheDocument();
  });

  test('run 1.2 seconds, then paused', () => {
    const store = setupStore();
    store.dispatch(setStatus('running'));
    customRender(<Timer />, store);

    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.getByText('000:00:01.2')).toBeInTheDocument();

    act(() => {
      store.dispatch(setStatus('paused'));
    });
    act(() => {
      vi.advanceTimersByTime(2400);
    });
    expect(screen.getByText('000:00:01.2')).toBeInTheDocument();
  });

  test('run 1.2 seconds, then paused, then continued', () => {
    const store = setupStore();
    store.dispatch(setStatus('running'));
    customRender(<Timer />, store);

    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.getByText('000:00:01.2')).toBeInTheDocument();

    act(() => {
      store.dispatch(setStatus('paused'));
    });
    act(() => {
      vi.advanceTimersByTime(2400);
    });
    expect(screen.getByText('000:00:01.2')).toBeInTheDocument();

    act(() => {
      store.dispatch(setStatus('running'));
    });
    act(() => {
      vi.advanceTimersByTime(2400);
    });
    expect(screen.getByText('000:00:03.6')).toBeInTheDocument();
  });

  test('run 1.2 seconds, then reset', () => {
    const store = setupStore();
    store.dispatch(setStatus('running'));
    customRender(<Timer />, store);

    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.getByText('000:00:01.2')).toBeInTheDocument();

    act(() => {
      store.dispatch(setStatus('loading'));
    });
    expect(screen.getByText('000:00:00.0')).toBeInTheDocument();
  });
});
