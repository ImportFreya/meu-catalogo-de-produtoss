
export const ProductCardSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">

      <div className="space-y-4 animate-pulse">
        <div className="bg-gray-300 h-48 w-full rounded-md"></div>
        <div className="space-y-2">
          <div className="bg-gray-300 h-4 w-5/6 rounded-md"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded-md"></div>

          <div className="bg-gray-300 h-6 w-1/3 rounded-md pt-4"></div>
        </div>
        <div className="bg-gray-300 h-10 w-full rounded-lg"></div>
      </div>
    </div>
  );
};