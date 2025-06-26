import { Input as AntInput } from "antd";
export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  className = "",
  ...rest
}) {
  return (
    <div className="relative mb-4 ">
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium text-sm">
          {label}
        </label>
      )}
      <AntInput
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border p-2 rounded ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...rest}
      />
      {error && (
        <p className="absolute bottom-[-30px]   text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
