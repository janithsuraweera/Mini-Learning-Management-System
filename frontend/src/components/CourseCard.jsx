import { Link } from 'react-router-dom';

function Rating({ value = 0 }) {
  const v = Math.max(0, Math.min(5, value));
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={i < v ? 'currentColor' : 'none'} stroke="currentColor" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0l-2.802 2.035c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course._id}`} className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="h-40 bg-gradient-to-br from-primary-50 to-white" />
      <div className="space-y-1 p-4">
        <div className="flex items-center gap-2">
          {course.isPublished ? (
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Published</span>
          ) : (
            <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">Draft</span>
          )}
        </div>
        <h3 className="line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-primary-700">{course.title}</h3>
        <p className="line-clamp-2 text-sm text-gray-600">{course.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-700">{course.instructor?.name || 'Unknown'}</span>
          <Rating value={Math.round(((course.lessons?.length || 0) % 5) + 1)} />
        </div>
      </div>
    </Link>
  );
}


