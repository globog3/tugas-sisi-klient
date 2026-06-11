export default function Form({ 
  children, 
  onSubmit,
  className = "",
  ...props 
}) {
  const baseStyles = "w-full"
  
  return (
    <form 
      onSubmit={onSubmit}
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </form>
  )
}
