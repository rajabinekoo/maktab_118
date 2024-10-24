interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  error?: string;
}

export const Input: React.FC<IInputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="space-y-0.5">
      <p className="text-slate-500 capitalize">{label}</p>
      <input
        className={className || "border border-slate-300 rounded-xl w-full px-1.5 py-0.5 text-sm"}
        {...props}
      />
      {error && <p>{error}</p>}
    </div>
  );
};
