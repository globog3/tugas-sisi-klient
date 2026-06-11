export default function Button({ children, variant, size, ...props }) {
  const base = "rounded font-medium";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    warning: "bg-yellow-400 text-black",
    danger: "bg-red-500 text-white",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}
