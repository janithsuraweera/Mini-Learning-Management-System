import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

export default function InstructorCourseNew() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/courses', { title, description });
      navigate('/instructor');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create a new course</h1>
        <p className="text-sm text-gray-600">Add a title and description; you can add lessons later.</p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Input label="Title" placeholder="e.g., Intro to Web Dev" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label className="grid gap-1">
          <span className="text-sm text-gray-700">Description</span>
          <textarea className="min-h-28 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600" placeholder="Course overview" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <Button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create course'}</Button>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </div>
  );
}


