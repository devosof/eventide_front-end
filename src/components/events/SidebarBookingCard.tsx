// src/components/Event/SidebarBookingCard.tsx
import React from 'react';
import { Card, CardBody, Button, Divider } from '@heroui/react';
import { TicketIcon, HeartIcon } from '../Icons';
import ShareButtons from '../ui/ShareButtons';

interface SidebarBookingCardProps {
  price: number;
  availableTickets: number;
  category: string;
  rating: number;
  onBook: () => void;
  onWishlist?: () => void;
}

const SidebarBookingCard: React.FC<SidebarBookingCardProps> = ({
  price,
  availableTickets,
  category,
  rating,
  onBook,
  onWishlist,
}) => {
  return (
    <Card className="sticky top-24 shadow-xl">
      <CardBody className="space-y-4">
        <div>
          <p className="text-sm text-default-500 mb-1">Starting from</p>
          <p className="text-4xl font-bold text-primary">${price}</p>
        </div>

        <Button
          color="primary"
          size="lg"
          className="w-full font-semibold"
          startContent={<TicketIcon />}
          onPress={onBook}
          isDisabled={availableTickets === 0}
        >
          {availableTickets === 0 ? 'Sold Out' : 'Book Tickets'}
        </Button>

        <Button
          variant="bordered"
          size="lg"
          className="w-full"
          startContent={<HeartIcon />}
          onPress={onWishlist}
        >
          Add to Wishlist
        </Button>

        <Divider />

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-default-500">Tickets Available</span>
            <span className="font-semibold">{availableTickets}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-default-500">Category</span>
            <span className="font-semibold">{category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-default-500">Event Rating</span>
            <span className="font-semibold">⭐ {rating}/5</span>
          </div>
        </div>

        <Divider />

        <div className="space-y-2">
          <p className="text-xs text-default-500">Share this event</p>
          <div className="flex gap-2">
            <ShareButtons />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SidebarBookingCard;
