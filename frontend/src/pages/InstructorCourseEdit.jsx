import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api.js';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

export default function InstructorCourseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(19);
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/courses/mine`).then(() => {}).catch(() => {});
    api
      .get(`/courses/${id}`)
      .then((res) => {
        const c = res.data;
        setTitle(c.title || '');
        setDescription(c.description || '');
        setPrice(c.price || 19);
        setPublish(!!c.isPublished);
      })
      .catch((err) => setError(err.response?.data?.error || 'Failed to load course'));
  }, [id]);

  async function handleSave(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.put(`/courses/${id}`, { title, description, price: Number(price), isPublished: publish });
      navigate('/instructor');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this course?')) return;
    try {
      await api.delete(`/courses/${id}`);
      navigate('/instructor');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete');
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Edit course</h1>
      </div>
      <form onSubmit={handleSave} className="grid gap-4">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label className="grid gap-1">
          <span className="text-sm text-gray-700">Description</span>
          <textarea className="min-h-28 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Price ($)" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
          <label className="mt-6 inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} /> Publish
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={loading}>{loading ? 'Saving…' : 'Save changes'}</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/instructor')}>Cancel</Button>
          <Button type="button" className="ml-auto" variant="secondary" onClick={handleDelete}>Delete</Button>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </div>
  );
}


