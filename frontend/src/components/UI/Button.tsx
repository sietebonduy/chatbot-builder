import { motion } from "framer-motion";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "primary", className }) => {
  const baseStyles = "px-6 py-3 font-semibold text-lg rounded-2xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-4";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={clsx(baseStyles, variantStyles[variant], className)}
    >
      {children}
    </motion.button>
  );
};

export default Button;
