import { render, screen } from "@testing-library/react";
import App from "../../src/components/App";

test('renders App component', () => {
  render(<App />);
  const element = screen.getByTestId('app-testid');
  expect(element).toBeInTheDocument();
});
