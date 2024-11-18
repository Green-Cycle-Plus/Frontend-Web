"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Flag, Share, Star, ThumbsUp } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-brandGreen text-brandGreen" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function RatingBar({
  rating,
  count,
  total,
}: {
  rating: number;
  count: number;
  total: number;
}) {
  const percentage = (count / total) * 100;

  return (
    <div className="flex items-center gap-2">
      <span className="w-4">{rating}</span>
      <Star className="h-4 w-4 fill-brandGreen text-brandGreen" />
      <div className="h-[6px] flex-1 rounded-full bg-gray-100">
        <div
          className="h-full rounded-[80px] bg-brandGreen"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-12 text-sm text-muted-foreground">{count}</span>
    </div>
  );
}

export default function CompanyReviewSection() {
  const ratings = [
    { stars: 5, count: 1405 },
    { stars: 4, count: 385 },
    { stars: 3, count: 45 },
    { stars: 2, count: 14 },
    { stars: 1, count: 4 },
  ];

  const totalReviews = ratings.reduce((sum, rating) => sum + rating.count, 0);
  const averageRating = (
    ratings.reduce((sum, rating) => sum + rating.stars * rating.count, 0) /
    totalReviews
  ).toFixed(1);

  return (
    <div className="w-full max-w-3xl space-y-6  font-dms_sans my-11">
      <h2 className="text-2xl font-semibold">Reviews</h2>

      <div className="flex items-start gap-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-brandGreen text-brandGreen" />
          <span className="text-xl font-semibold text-[#121417]">
            {averageRating} <span className="text-base font-normal">/5</span>
          </span>
        </div>
        <span className="text-base font-normal text-[#121417]">
          Very Satisfied
        </span>
      </div>

      <div className="space-y-2 max-w-[207px]">
        {ratings.map((rating) => (
          <RatingBar
            key={rating.stars}
            rating={rating.stars}
            count={rating.count}
            total={totalReviews}
          />
        ))}
      </div>

      <div className="flex w-full overflow-x-auto gap-2">
        <Button
          variant="default"
          className="bg-brandGreen hover:bg-[#4CAF50]/90 font-medium text-sm"
        >
          All
        </Button>
        {ratings.map((rating) => (
          <Button
            key={rating.stars}
            variant="secondary"
            className="bg-[#E4FFEE] hover:bg-[#4CAF50]/20 font-medium text-sm"
          >
            {rating.stars} Star ({rating.count})
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {[1, 2].map((review) => (
          <Card key={review} className="border-none shadow-none bg-transparent ">
            <CardContent className="py-6 border-none shadow-none !px-0">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="font-medium text-sm text-[#121417]">
                    Allrecipes Member
                  </div>
                  <div className="text-sm text-[#717274]">July 14, 2023</div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <StarRating rating={4} />
                <span className="text-sm">4.0</span>
              </div>

              <p className="mt-3 text-base text-[#121417]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Separator className="my-4 h-[1px] bg-[#E0E0E1]" />
              <div className="w-full mt-4 flex items-center justify-center lg:justify-end gap-0 ">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm px-1 font-medium text-[#50534D]"
                >
                  <ThumbsUp className=" h-4 w-4" />
                  Was this review helpful?
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm px-1 font-medium text-[#E06262]"
                >
                  <Flag className=" h-4 w-4 text-[#E06262]" />
                  Report
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm px-1 font-medium text-[#50534D]"
                >
                  <Share className=" h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-start gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#E4FFEE]"
        >
          {"<"}
        </Button>
        <Button
          variant="default"
          size="icon"
          className="bg-brandGreen rounded-full hover:bg-[#4CAF50]/90"
        >
          1
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#E4FFEE]"
        >
          2
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#E4FFEE]"
        >
          3
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#E4FFEE]"
        >
          4
        </Button>
        <span>...</span>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#E4FFEE]"
        >
          12
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-[#E4FFEE]"
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}
