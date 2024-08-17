import { customRender } from '../test-utils';
import PauseOverlay from '../../src/components/PauseOverlay';
import { fireEvent, screen } from '@testing-library/react';
import { setupStore } from '../../src/state/store';

describe('PauseOverlay', () => {
  test('it should render', () => {
    customRender(<PauseOverlay />);
    expect(screen.getByText('Continue')).toBeInTheDocument();
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });

  test('click Continue', () => {
    const store = setupStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    customRender(<PauseOverlay />, store);
    fireEvent.click(screen.getByText('Continue'));
    expect(dispatchSpy).toHaveBeenCalled();
  });

  test('click New Game', () => {
    const store = setupStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    customRender(<PauseOverlay />, store);
    fireEvent.click(screen.getByText('New Game'));
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
