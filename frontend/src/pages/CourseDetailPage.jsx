import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import api from '../utils/api.js';
import RatingStars from '../components/RatingStars.jsx';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [avg, setAvg] = useState({ average: 0, count: 0 });
  const [myRating, setMyRating] = useState(0);
  const [showPay, setShowPay] = useState(false);
  const [payerName, setPayerName] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [card, setCard] = useState('4242424242424242');

  useEffect(() => {
    axios
      .get(`/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load course'));
    axios.get(`/api/reviews/${id}/summary`).then((r) => setAvg(r.data)).catch(() => {});
  }, [id]);

  async function buyAndEnroll() {
    setError('');
    setMessage('');
    try {
      await api.post('/payments/checkout', { courseId: id, payerName, payerEmail, cardLast4: card.slice(-4) });
      setMessage('Payment successful. Enrolled!');
    } catch (err) {
      setError(err.response?.data?.error || 'Payment/enroll failed');
    }
  }

  async function submitRating(v) {
    try {
      setMyRating(v);
      await api.post(`/reviews/${id}`, { rating: v });
      const r = await axios.get(`/api/reviews/${id}/summary`);
      setAvg(r.data);
    } catch (e) {}
  }

  if (!course) return <div className="text-sm text-gray-600">Loading...</div>;

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">{course.title}</h1>
        <p className="mt-2 text-gray-700">{course.description}</p>
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
          <RatingStars value={Math.round(avg.average)} />
          <span>({avg.count})</span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Button variant="gradient" onClick={() => setShowPay(true)}>Buy course • ${course.price || 19}</Button>
          <Button onClick={() => window.history.back()} variant="outline">Back</Button>
        </div>
        {message && <div className="mt-3 text-sm text-green-700">{message}</div>}
        {error && <div className="mt-3 text-sm text-red-700">{error}</div>}
        <div className="mt-6">
          <div className="text-sm text-gray-700">Rate this course</div>
          <RatingStars value={myRating} onChange={submitRating} />
        </div>
      </div>
      {showPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
            <h3 className="text-lg font-medium">Mock Stripe Checkout</h3>
            <div className="mt-4 grid gap-3">
              <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Name on card" value={payerName} onChange={(e) => setPayerName(e.target.value)} />
              <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Email" value={payerEmail} onChange={(e) => setPayerEmail(e.target.value)} />
              <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Card number" value={card} onChange={(e) => setCard(e.target.value)} />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button variant="gradient" onClick={buyAndEnroll}>Pay ${course.price || 19}</Button>
              <Button variant="outline" onClick={() => setShowPay(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-medium">Lessons</h2>
        <ol className="list-decimal space-y-2 pl-5">
          {(course.lessons || []).map((l, idx) => (
            <li key={idx} className="text-gray-800">{l.title}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}


