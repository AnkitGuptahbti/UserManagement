export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700  hover:cursor-pointer transition disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  );
}
