export default function RatingStars({ value = 0, onChange, size = 20 }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {stars.map((s) => (
        <button key={s} type="button" onClick={onChange ? () => onChange(s) : undefined} className={onChange ? 'cursor-pointer' : 'cursor-default'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={s <= value ? 'currentColor' : 'none'} stroke="currentColor" style={{ width: size, height: size }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0l-2.802 2.035c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}


