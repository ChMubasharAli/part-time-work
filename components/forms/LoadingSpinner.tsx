interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

export const LoadingSpinner = ({ size = "md" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-8 w-8 border-b-2",
    md: "h-12 w-12 border-b-4",
    lg: "h-16 w-16 border-b-4",
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div
        className={`${sizeClasses[size]} border-blue-500 rounded-full animate-spin`}
      ></div>
    </div>
  );
};
