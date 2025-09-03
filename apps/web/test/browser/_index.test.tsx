import { render, screen } from '@testing-library/react';
import { Navigation } from '../../app/components/navigation';

test('navigation component renders correctly', () => {
  render(<Navigation />);

  // Check if navigation elements are visible
  expect(screen.getByText('Home')).toBeVisible();
  expect(screen.getByText('About')).toBeVisible();
  expect(screen.getByText('Settings')).toBeVisible();
  expect(screen.getByText('Features')).toBeVisible();

  // Check if the main title is visible
  expect(screen.getByText('React Router + tRPC + Hono')).toBeVisible();

  // Check if GitHub button is visible
  expect(screen.getByText('GitHub')).toBeVisible();
  expect(screen.getByText('Get Started')).toBeVisible();
});
