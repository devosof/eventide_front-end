// src/components/events/EventCard.tsx
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, Chip, Button, image } from '@heroui/react';
import { CalendarIcon, LocationIcon, TicketIcon, HeartIcon } from '../Icons';
import { EventStatus } from '@/types/event.types';
import React from 'react';

export interface EventCardProps {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: number;
  organizer: {
    id: number;
    name: string;
    email: string;
    organizerProfile?: {
      organizationName: string;
      city: string;
      state: string;
      country: string;
    };
  };
  location: {
    id: number;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    googleMapsLink?: string;
  };
  images: { id: number; imageUrl: string }[];
  tickets?: { id: number; name: string; price: number; salesStartDate: string; salesEndDate: string }[];
  categories: { id: number; name: string }[];
  createdAt: string;
}

const EventCard = ({
  id,
  name,
  description,
  startDate,
  endDate,
  location,
  categories,
  tickets,
  images,
}: EventCardProps) => {
  const soldPercentage =  100;
  const isLowStock = false;
  const isSoldOut = false;

  const [liked, setLiked] = React.useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
      day: date.getDate(),
      time: date.toLocaleString('default', { hour: 'numeric', minute: '2-digit', hour12: true }),
    };
  };

  const eventDate = formatDate(startDate);

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        true ? 'ring-2 ring-primary' : ''
      }`}
      isPressable
      as={Link}
      to={`/events/${id}`}
    >
      {/* Image Section with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={images[0]?.imageUrl || '/placeholder-event.jpg'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /> */}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {true && (
            <Chip size="sm" color="secondary" variant="solid" className="font-semibold">
              ⭐ Featured
            </Chip>
          )}
          {/* {isSoldOut && (
            <Chip size="sm" color="default" variant="solid">
              Sold Out
            </Chip>
          )}
          {isLowStock && !isSoldOut && (
            <Chip size="sm" color="warning" variant="solid" className="animate-pulse">
              Only {availableTickets} left!
            </Chip>
          )} */}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // TODO: Add to favorites
            setLiked(!liked);
            
          }}
          className='absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/90 rounded-full hover:bg-white dark:hover:bg-black transition-colors'
        >
          <HeartIcon/>
        </button>

        {/* Date Badge */}
        <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-900 rounded-lg p-2 text-center min-w-[60px] shadow-lg">
          <div className="text-primary font-bold text-xs">{eventDate.month}</div>
          <div className="text-2xl font-bold">{eventDate.day}</div>
        </div>

        {/* Category */}
        <Chip
          size="sm"
          variant="flat"
          className="absolute bottom-3 right-3 bg-white/90 dark:bg-black/90"
        >
          {categories[0]?.name || 'General'}
        </Chip>
      </div>

      <CardBody className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-default-500 line-clamp-2 mb-3">
          {description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-default-600">
            <CalendarIcon />
            <span>{eventDate.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-default-600">
            <LocationIcon />
            <span className="line-clamp-1">{location.city}</span>
          </div>
          {/* {attendees && (
            <div className="flex items-center gap-2 text-sm text-default-600">
              <span>👥</span>
              <span>{attendees} attending</span>
            </div>
          )} */}
        </div>

      </CardBody>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {/* Price */}
        <div>
          {tickets && tickets.some((ticket) => ticket.price == 0)? (
            <p className="text-xl font-bold text-success">Free</p>
          ) : (
            <div>
              <p className="text-xs text-default-500">Starting from</p>
              <p className="text-xl font-bold text-primary">
                ${tickets ? tickets[0]?.price.toFixed(2): 'Price not found'}
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          color={isSoldOut ? 'default' : 'primary'}
          variant={isSoldOut ? 'flat' : 'solid'}
          size="sm"
          isDisabled={isSoldOut}
          startContent={!isSoldOut && <TicketIcon />}
          onPress={(e) => {
            // TODO: Quick book action
          }}
        >
          {isSoldOut ? 'Sold Out' : 'Get Tickets'}
        </Button>
      </CardFooter>

      {/* Ticket Availability Progress */}
      {!isSoldOut && soldPercentage > 50 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-default-200">
          <div
            className={`h-full transition-all ${
              soldPercentage > 90 ? 'bg-danger' : soldPercentage > 75 ? 'bg-warning' : 'bg-success'
            }`}
            style={{ width: `${soldPercentage}%` }}
          />
        </div>
      )}
    </Card>
  );
};

export default EventCard;