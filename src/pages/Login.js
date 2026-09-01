import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { USER_ROLES } from '../utils/constants';

/**
 * Login Page
 * User authentication and role-based access
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(USER_ROLES.VIEWER);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setApiError(null);
      await login(email, password);
      // Store selected role
      localStorage.setItem('userRole', selectedRole);
      navigate('/dashboard');
    } catch (error) {
      setApiError('Invalid email or password');
    }
  };

  // Demo credentials for testing
  const demoAccounts = [
    { role: USER_ROLES.ADMIN, email: 'admin@example.com', password: 'admin123' },
    { role: USER_ROLES.MANAGER, email: 'manager@example.com', password: 'manager123' },
    { role: USER_ROLES.VIEWER, email: 'viewer@example.com', password: 'viewer123' },
  ];

  const handleDemoLogin = (role, demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-primary-600">LA</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Land Predictor</h1>
          <p className="text-primary-100">AI-Powered Land Acquisition Delay Prediction</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {apiError && (
            <Alert
              type="error"
              message={apiError}
              onClose={() => setApiError(null)}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: '' });
              }}
              placeholder="you@example.com"
              error={errors.email}
              required
              disabled={loading}
            />

            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: '' });
              }}
              placeholder="Enter your password"
              error={errors.password}
              required
              disabled={loading}
            />

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Login Role
              </label>
              <div className="space-y-2">
                {Object.values(USER_ROLES).map((role) => (
                  <label key={role} className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={selectedRole === role}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      disabled={loading}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              <LogIn size={20} />
              <span>Sign In</span>
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.role}
                type="button"
                onClick={() =>
                  handleDemoLogin(
                    account.role,
                    account.email,
                    account.password
                  )
                }
                className="w-full px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg border border-primary-200 transition-colors"
              >
                Demo {account.role}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-primary-100 text-xs mt-6">
          © 2024 Land Acquisition Delay Predictor. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
