interface ErrorStateProps {
  message?: string;
  retry: () => void;
}

export default function ErrorState({ message = "Something went wrong.", retry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <p className="text-red-500 font-medium mb-4">{message}</p>
      <button 
        onClick={retry}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
