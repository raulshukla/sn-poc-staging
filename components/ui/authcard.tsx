export default function AuthCard({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex justify-center items-center mt-24 mb-16 bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          {children}
        </div>
      </div>
    );
  }