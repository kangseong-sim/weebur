import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 상품 이미지 스켈레톤 */}
        <div className="w-full lg:w-1/2 space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />

          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                className="w-20 h-20 rounded-md flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* 상품 정보 스켈레톤 */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-40" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-px w-full" />

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Skeleton className="h-px w-full" />

          <div className="space-y-4">
            <div className="flex items-center">
              <Skeleton className="w-24 h-4 mr-4" />
              <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-md" />
                <Skeleton className="w-12 h-6" />
                <Skeleton className="w-8 h-8 rounded-md" />
              </div>
            </div>

            <div className="flex gap-3">
              <Skeleton className="flex-1 h-10 rounded-md" />
              <Skeleton className="w-10 h-10 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Skeleton className="h-10 w-full mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>
    </div>
  );
}
