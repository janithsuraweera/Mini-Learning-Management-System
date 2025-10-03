import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/auth/register', { name, email, password, role });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="text-sm text-gray-600">Join as a student or instructor</p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Input label="Name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label className="grid gap-1">
          <span className="text-sm text-gray-700">Role</span>
          <select className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </label>
        <Button type="submit" className="w-full">Create account</Button>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </div>
  );
}


