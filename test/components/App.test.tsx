import { render, screen } from "@testing-library/react";
import App from "../../src/components/App";

test('simple math test', () => {
  expect(2 + 2).toBe(4);
});

test('renders App component with heading', () => {
  render(<App />);
  const element = screen.getByText('Vite + React');
  expect(element).toBeInTheDocument();
});
