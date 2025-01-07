import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { AuthLayout } from '../components/AuthLayout';
import { validateEmail } from '../utils/validation';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoginError('');

    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
      return;
    }

    // Simulate login - replace with actual authentication
    if (formData.email === 'test@example.com' && formData.password === 'Password123!') {
      const user = { id: '1', username: 'Test User', email: formData.email };
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  return (
    <AuthLayout title="Sign in to your account">
      <form onSubmit={handleSubmit} className="space-y-6">
        {loginError && (
          <div className="bg-orange-50 border border-orange-500 text-orange-700 p-3 rounded">
            {loginError}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/reset-password')}
            className="text-sm text-orange-600 hover:text-orange-500"
          >
            Forgot your password?
          </button>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-sm text-orange-600 hover:text-orange-500"
          >
            Create account
          </button>
        </div>

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </AuthLayout>
  );
};