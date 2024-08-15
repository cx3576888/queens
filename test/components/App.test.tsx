import { render, screen } from "@testing-library/react";
import App from "../../src/components/App";
import { Provider } from "react-redux";
import { store } from "../../src/state/store";

test('renders App component', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const element = screen.getByTestId('app-testid');
  expect(element).toBeInTheDocument();
});
