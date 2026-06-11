export default function Label({ 
  children, 
  htmlFor = "",
  className = "",
  ...props 
}) {
  const baseStyles = "text-sm font-medium text-gray-700"
  
  return (
    <label 
      htmlFor={htmlFor}
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}
