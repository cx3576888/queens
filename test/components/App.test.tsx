import { customRender } from '../test-utils';
import { screen } from '@testing-library/react';
import App from '../../src/components/App';

test('renders App component', () => {
  customRender(<App />);
  const element = screen.getByTestId('app-testid');
  expect(element).toBeInTheDocument();
});
