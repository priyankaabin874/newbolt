import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { AuthLayout } from '../components/AuthLayout';
import { validateEmail } from '../utils/validation';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    // Simulate password reset email
    setSuccess(true);
  };

  return (
    <AuthLayout title="Reset your password">
      {success ? (
        <div className="text-center">
          <p className="text-green-600 mb-4">
            If an account exists for {email}, you will receive a password reset link shortly.
          </p>
          <Button onClick={() => navigate('/login')} variant="secondary">
            Return to login
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-gray-600 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={error}
          />

          <Button type="submit" className="w-full">
            Send reset link
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-orange-600 hover:text-orange-500"
            >
              Back to login
            </button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};