// src/components/Event/ReviewsList.tsx
import React from "react";
import { Card, CardHeader, CardBody, Avatar } from "@heroui/react";
import { StarIcon } from "../Icons";

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  if (!reviews?.length) {
    return (
      <div className="text-center text-default-500 py-6">
        No reviews yet. Be the first to share your experience!
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {reviews.map((rev) => (
        <Card key={rev.id} shadow="sm" className="rounded-2xl">
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar src={rev.userAvatar} name={rev.userName} size="sm" />
              <div>
                <p className="font-semibold text-default-900">{rev.userName}</p>
                <div className="flex gap-1 text-warning">
                  {[...Array(rev.rating)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-xs text-default-500">
              {new Date(rev.date).toLocaleDateString()}
            </span>
          </CardHeader>

          <CardBody className="pt-0 text-default-600 text-sm">
            {rev.comment}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ReviewsList;
