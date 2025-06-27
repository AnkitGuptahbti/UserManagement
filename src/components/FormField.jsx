import Input from "./Input";

export default function FormField({ field, value, onChange, error }) {
  const commonClasses = "w-full border p-2 rounded";

  const containerClass = "relative mb-3";

  switch (field.type) {
    case "radio":
      return (
        <div className="space-y-1 mb-4">
          <label className="block text-sm font-medium">{field.label}</label>
          <div className="flex gap-4">
            {field.options.map((opt) => (
              <label key={opt.value} className="flex items-center gap-1">
                <input
                  type="radio"
                  name={field.key}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={onChange}
                />
                {opt.label}
              </label>
            ))}
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
        </div>
      );

    case "select":
      return (
        <div className={containerClass}>
          <select value={value} onChange={onChange} className={commonClasses}>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {error && (
            <p className="absolute text-red-600 text-xs bottom-[-25px] left-0">
              {error}
            </p>
          )}
        </div>
      );
    case "checkbox":
      return (
        <label className={`flex items-center gap-2 relative mb-4`}>
          <input type="checkbox" checked={value} onChange={onChange} />
          {field.label}
          {error && (
            <p className="absolute text-red-600 text-xs bottom-[-25px] left-0">
              {error}
            </p>
          )}
        </label>
      );

    case "textarea":
      return (
        <div className={containerClass}>
          <textarea
            value={value}
            onChange={onChange}
            rows={3}
            placeholder={field.placeholder}
            className={commonClasses}
          />
          {error && (
            <p className="absolute text-red-600 text-xs bottom-[-25px] left-0">
              {error}
            </p>
          )}
        </div>
      );

    case "image":
      return (
        <div className={`space-y-1 relative mb-4`}>
          <label className="block text-sm font-medium">{field.label}</label>
          {value && (
            <img
              src={value}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-full mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            className={commonClasses}
          />
          {error && (
            <p className="absolute text-red-600 text-xs bottom-[-25px] left-0">
              {error}
            </p>
          )}
        </div>
      );

    default:
      return (
        <div className={containerClass}>
          <Input
            type={field.type || "text"}
            name={field.key}
            value={value}
            onChange={onChange}
            placeholder={field.placeholder}
            className={commonClasses}
          />
          {error && (
            <p className="absolute text-red-600 text-xs bottom-[-25px] left-0">
              {error}
            </p>
          )}
        </div>
      );
  }
}
