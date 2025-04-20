"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Review } from "@/lib/type";

interface ProductReviewsProps {
  reviews: Review[];
  productId: number;
}

export default function ProductReviews({
  reviews,
  productId,
}: ProductReviewsProps) {
  const [activeReview, setActiveReview] = useState<number | null>(null);

  const toggleReply = (reviewId: number) => {
    setActiveReview(activeReview === reviewId ? null : reviewId);
  };

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-12 h-12 mx-auto text-gray-300" />
        <h3 className="mt-4 text-lg font-medium">아직 리뷰가 없습니다</h3>
        <p className="mt-2 text-gray-500">첫 번째 리뷰를 작성해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">상품 리뷰</h3>
        <Button className="cursor-pointer">리뷰 작성하기</Button>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="space-y-4">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {review.reviewerName || "익명"}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(review.date || Date.now()).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-700">{review.comment}</p>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 cursor-pointer"
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                도움이 됐어요 (0)
              </Button>
            </div>

            {index < reviews.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </div>
    </div>
  );
}
