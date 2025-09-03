import { render, screen, waitFor } from '@testing-library/react';
import type { ComponentType } from 'react';
import { createRoutesStub } from 'react-router';
import Home from '../../app/routes/_index';

test('generic browser mode test', async () => {
  const Stub = createRoutesStub([
    {
      path: '/',
      Component: Home as ComponentType,
      loader: () =>
        Promise.resolve({
          data: {
            id: 4,
            status: 'active'
          },
        }),
      action() {
        return {
          errors: {
            username: 'test',
            password: 'test',
          },
        };
      },
    },
  ]);

  render(<Stub initialEntries={['/']} />);

  // Wait for the component to render and show the main heading
  await waitFor(() => {
    expect(screen.getByRole('heading', { level: 1 })).toBeVisible();
  });

  // Check if the main heading text is correct
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to React Router + tRPC + Hono');

  // Wait for the application status to be visible
  await waitFor(() => {
    expect(screen.getByText('Application Status')).toBeVisible();
  });

  // Check if the ID and status are displayed
  await waitFor(() => {
    expect(screen.getByText('4')).toBeVisible();
  });

  await waitFor(() => {
    expect(screen.getByText('active')).toBeVisible();
  });

  // Check if navigation is present
  expect(screen.getByText('Home')).toBeVisible();
  expect(screen.getByText('About')).toBeVisible();
  expect(screen.getByText('Settings')).toBeVisible();
});
