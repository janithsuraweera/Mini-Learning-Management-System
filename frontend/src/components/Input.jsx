export default function Input({ label, className = '', ...props }) {
  return (
    <label className={`grid gap-1 ${className}`}>
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <input
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
        {...props}
      />
    </label>
  );
}


