import { cn } from "../../utils/cn";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variantStyles = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/80",
  outline:
    "border border-foreground/25 bg-transparent text-foreground hover:bg-surface",
  ghost: "bg-transparent text-foreground hover:bg-surface",
};

const sizeStyles = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-6 py-3 text-base",
};

function Button({
  as: Component = "button",
  children,
  className = "",
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}) {
  const typeProps = Component === "button" ? { type } : {};

  return (
    <Component
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...typeProps}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
