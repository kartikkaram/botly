// src/components/Callout.jsx
import clsx from "clsx";

const typeStyles = {
  info: "border-blue-500 bg-blue-100/10 text-blue-200",
  warning: "border-yellow-500 bg-yellow-100/10 text-yellow-200",
  tip: "border-green-500 bg-green-100/10 text-green-200",
};

export function Callout({ type = "info", title, children }) {
  const baseStyle = "rounded-xl border p-4 my-6";
  const typeClass = typeStyles[type] || typeStyles.info;

  return (
    <div className={clsx(baseStyle, typeClass)}>
      {title && <div className="font-semibold mb-2">{title}</div>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
