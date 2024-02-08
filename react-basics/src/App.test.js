import { render, screen } from '@testing-library/react';
import App from './App';

test('renders react basics home', () => {
  render(<App />);
  const homeElement = screen.getByText(/react basics/i);
  expect(homeElement).toBeInTheDocument();
});
