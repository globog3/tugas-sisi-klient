export default function Footer({ 
  content = "© 2024 Admin Dashboard. All rights reserved.",
  className = "",
  ...props 
}) {
  const baseStyles = "bg-white shadow px-6 py-4 text-center text-gray-600 text-sm"
  
  return (
    <footer className={`${baseStyles} ${className}`} {...props}>
      {content}
    </footer>
  )
}
