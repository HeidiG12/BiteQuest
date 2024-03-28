// AuthProvider.test.js
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

// Mock child component to display currentUser details
const MockChildComponent = () => {
  const { currentUser } = useAuth();
  return <div>{currentUser ? currentUser.email : 'No user'}</div>;
};

test('renders with no user initially', () => {
  render(
    <AuthProvider>
      <MockChildComponent />
    </AuthProvider>
  );
  expect(screen.getByText('No user')).toBeInTheDocument();
});
