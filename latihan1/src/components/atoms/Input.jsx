export default function Input({ 
  type = "text", 
  placeholder = "", 
  value, 
  onChange,
  className = "",
  ...props 
}) {
  const baseStyles = "w-full mt-1 mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${baseStyles} ${className}`}
      {...props}
    />
  )
}
