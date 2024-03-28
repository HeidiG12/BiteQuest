// UserInputReview.test.js
import { render, screen } from '@testing-library/react';
import UserInputReview from './UserInputReview';
import { AuthContext } from './AuthContext';
import { getDatabase, ref, set} from "firebase/database";

test('displays user information when logged in', () => {
  const currentUser = {
    displayName: 'Test User',
    uid: '123',
    email: 'test@example.com',
  };
  render(
    <AuthContext.Provider value={{ currentUser }}>
      <UserInputReview />
    </AuthContext.Provider>
  );
  expect(screen.getByText('Test User 123 test@example.com')).toBeInTheDocument();
});
