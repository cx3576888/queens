import { customRender } from '../test-utils';
import App from '../../src/components/App';
import { screen } from '@testing-library/react';

test('renders App component', () => {
  customRender(<App />);
  const element = screen.getByTestId('app-testid');
  expect(element).toBeInTheDocument();
});
