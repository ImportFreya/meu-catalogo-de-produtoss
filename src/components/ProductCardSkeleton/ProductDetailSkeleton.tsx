
export const ProductDetailSkeleton = () => {
  return (
    <div className="p-6 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-pulse">
      
        <div className="bg-gray-300 h-96 w-full rounded-lg"></div>

    
        <div className="flex flex-col justify-center space-y-4">
      
          <div className="bg-gray-300 h-8 w-5/6 rounded-md"></div>
      
          <div className="bg-gray-300 h-4 w-1/4 rounded-md"></div>
         
          <div className="space-y-2 pt-4">
            <div className="bg-gray-300 h-4 w-full rounded-md"></div>
            <div className="bg-gray-300 h-4 w-full rounded-md"></div>
            <div className="bg-gray-300 h-4 w-3/4 rounded-md"></div>
          </div>
          
          <div className="flex items-center justify-between pt-6">
     
            <div className="bg-gray-300 h-10 w-1/3 rounded-md"></div>
        
            <div className="bg-gray-300 h-12 w-2/5 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};