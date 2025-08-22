export function Input({
  label,
  type = "text",
  placeholder = "",
  error = false,
  required = false,
  className = "",
  register,
  name,
  ...props
}) {
  return (
    <div className={`w-full mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm sm:text-medium font-semibold mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`w-full border rounded-lg p-2 text-sm sm:text-base transition focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-sky-400"
          }`}
        {...register}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

export function Checkbox({
  label,
  name,
  register,
  error,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className={`flex items-center gap-2 mb-3 ${className}`}>
      <input
        id={name}
        type="checkbox"
        name={name}
        {...register}
        required={required}
        className={`h-4 w-4 rounded border transition 
          ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-sky-300"
          }`}
        {...props}
      />
      {label && (
        <label htmlFor={name} className="text-sm sm:text-base font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
