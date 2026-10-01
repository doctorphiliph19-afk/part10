import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
import SignInForm from './SignInForm';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit with the form values when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <SignInForm onSubmit={onSubmit} />,
      );

      fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password');
      fireEvent.press(getByText('Sign in'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
