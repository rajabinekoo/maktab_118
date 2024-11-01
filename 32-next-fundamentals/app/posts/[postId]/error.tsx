"use client";

const ErrorBoundary: React.FC<{ error: Error & { digest?: string } }> = (
  props
) => {
  return <p>{props.error.message}</p>;
};

export default ErrorBoundary;
