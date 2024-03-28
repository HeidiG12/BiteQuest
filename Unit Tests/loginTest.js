// Login.test.js
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';
jest.mock('firebase/auth', () => ({
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn(() => Promise.resolve({ user: { displayName: 'Test User', uid: '123' } })),
}));
jest.mock('js-cookie', () => ({
  set: jest.fn(),
  remove: jest.fn(),
}));

test('login button triggers login process', async () => {
  render(<Login />);
  fireEvent.click(screen.getByText('Sign in with Google'));
  expect(screen.getByText('Welcome, Test User')).toBeInTheDocument();
});
