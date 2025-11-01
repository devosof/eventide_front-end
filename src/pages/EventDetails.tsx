

// src/pages/EventDetails.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Tabs,
  Tab,
} from '@heroui/react';
import { useAuth } from '../contexts/AuthContext';

import HeroGallery from '../components/events/HeroGallery';
import EventHeader from '../components/events/EventHeader';
import EventInfoCard from '../components/events/EventInfoCard';
import TicketsTab from '../components/events/TicketsTab';
import BookingModal from '../components/events/BookingModal';
import ReviewsTab from '../components/events/ReviewsTab';
import OrganizerCard from '../components/events/OrganizerCard';
import SidebarBookingCard from '../components/events/SidebarBookingCard';
import {Event} from '@/api/types'
import { LoaderCircle } from 'lucide-react';
// import { TicketType } from '@/types/event.types';


const BASE_API_URL = "http://localhost:3000";

// you already have mockEvent; later replace with fetch logic
// const mockEvent = {
//   id: '1',
//   title: 'Summer Music Festival 2025',
//   description: 'Join us for an unforgettable night of live music featuring top artists from around the world. Experience the magic of live performances under the stars with food, drinks, and amazing vibes.',
//   longDescription: `
//     Get ready for the event of the summer! Our annual music festival brings together the best artists from various genres including rock, pop, electronic, and indie music.

//     What to Expect:
//     • 12+ hours of non-stop entertainment
//     • Multiple stages with different music genres
//     • Food trucks and beverage stands
//     • Exclusive merchandise
//     • Meet & greet opportunities with artists
//     • Professional photography zones
//     • Accessible facilities for all attendees

//     This year's lineup includes headliners you won't want to miss! Each stage is carefully curated to provide unique experiences throughout the day and night.
//   `,
//   imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200',
//   images: [
//     'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
//     'https://images.unsplash.com/photo-1470229538611-16a1c4ba09ae?w=800',
//     'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
//   ],
//   date: '2025-07-15T18:00:00',
//   endDate: '2025-07-16T02:00:00',
//   location: 'Central Park, New York',
//   address: '123 Park Avenue, New York, NY 10001',
//   price: 85,
//   category: 'Music',
//   organizerName: 'Music Festivals Global',
//   organizerAvatar: 'https://i.pravatar.cc/150?img=1',
//   organizerBio: 'Professional event organizers with 10+ years of experience in music festivals.',
//   isVerified: true,
//   availableTickets: 250,
//   totalTickets: 500,
//   attendees: 423,
//   rating: 4.8,
//   reviewsCount: 156,
//   tags: ['Music', 'Festival', 'Outdoor', 'Summer', 'Live Performance'],
//   ticketTypes: [
//     { id: '1', name: 'General Admission', price: 85, available: 150 },
//     { id: '2', name: 'VIP Pass', price: 199, available: 50 },
//     { id: '3', name: 'Early Bird Special', price: 65, available: 0 },
//   ],
//   reviews: [
//     {
//       id: '1',
//       userName: 'John Doe',
//       userAvatar: 'https://i.pravatar.cc/150?img=10',
//       rating: 5,
//       comment: 'Amazing experience! The lineup was incredible and the organization was flawless.',
//       date: '2024-08-10',
//     },
//     {
//       id: '2',
//       userName: 'Sarah Smith',
//       userAvatar: 'https://i.pravatar.cc/150?img=20',
//       rating: 4,
//       comment: 'Great event overall. Would love to see more food options next year.',
//       date: '2024-08-12',
//     },
//   ],
// };

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // state
  const [event, setEvent] = useState<Event | null>(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const eventId: number = parseInt(id || '0', 10);

  useEffect(()=> {
    // fetch event by id logic here
    setLoading(true);
    try {
      async function fetchEvent(){
        
        const eventResponse = await fetch(`${BASE_API_URL}/events/${eventId}`);
        console.log(eventResponse)
        const eventData = await eventResponse.json();
        setEvent(eventData);
      }
      fetchEvent().finally(() => setLoading(false));
    } catch (error) {
      console.error("Error fetching event:", error);
      throw error;
    }

    try {
      async function fetchReviews(){
        const reviewsResponse = await fetch(`${BASE_API_URL}/reviews/event/${eventId}`);
        console.log(reviewsResponse)
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
        
      }
      fetchReviews().finally(() => setLoading(false));
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }


    

  }, [])

  const handleBookClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    setBookingOpen(true);
  };

  const handlePurchase = (ticketId: string, quantity: number) => {
    console.log('purchase:', ticketId, quantity);
    setBookingOpen(false);
    // navigate to checkout or call API
  };

  const handleSubmitReview = (rating: number, comment: string) => {
    console.log('submit review:', rating, comment);
    // call API or optimistic update
  };

  const handleRequireLogin = () => {
    navigate('/login');
  };

    return (
    <div className="min-h-screen bg-background">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-10 z-50">
          <LoaderCircle className="animate-spin text-primary" size={48} />
        </div>
      )}
      <HeroGallery
        images={event?.images.map(img => img.imageUrl) || []}
        selectedIndex={selectedImage}
        onSelect={setSelectedImage}
        onBack={() => navigate(-1)}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <EventHeader
              title={event ? event.name: 'N/A'}
              category={event?.categories.map(cat => cat.name).join(', ') || ''}
              // tags={event.tags}
              // rating={event.reviews}
              // reviewsCount={event.reviewsCount}
              // attendees={event.attendees}
              isVerified={true}
            />

            <Divider />

            <EventInfoCard
              date={event? event.startDate: 'Start Date'}
              endDate={event? event.endDate: 'End Date'}
              location={event? event.location.city: 'Location'}
              address={event ? event.location.address: 'Address'}
              availableTickets={100} // to be changed
              totalTickets={300} // to be changed
            />

            <Tabs aria-label="Event information" size="lg" color="primary">
              <Tab key="about" title="About">
                <div className="pt-4">
                  <div className="prose dark:prose-invert max-w-none whitespace-pre-line text-default-600 leading-relaxed">
                    {event && event.description}
                  </div>
                </div>
              </Tab>

              <Tab key="tickets" title="Tickets">
                <div className="pt-4">
                  <TicketsTab
                    ticketTypes={event ? event.tickets: []}
                    selectedTicketId={selectedTicketId}
                    onSelectTicket={setSelectedTicketId}
                  />
                </div>
              </Tab>

              <Tab key="reviews" title={`Reviews (${reviews.length})`}>
                <div className="pt-4">
                  <ReviewsTab
                    reviews={reviews}
                    onSubmitReview={handleSubmitReview}
                    isUserAuthenticated={isAuthenticated}
                    onRequireLogin={handleRequireLogin}
                  />
                </div>
              </Tab>
            </Tabs>

            <OrganizerCard
              avatar={event ? event.organizer.name : 'Organizer'}
              name={event?.organizer.name || 'organizer Name'}
              bio={event?.organizer.email || 'organizer Bio'}
              isVerified={true}
              onFollow={() => {
                console.log('follow organizer');
              }}
            />
          </div>

          <div className="lg:col-span-1">
            <SidebarBookingCard
              price={event?.tickets ? Math.min(...event.tickets.map(t => t.price)) : 0}
              availableTickets={100}
              category={event?.categories ? event.categories.map(cat => cat.name).join(', ') : 'N/A'}
              rating={reviews.length > 0 ? reviews.reduce((sum, r) => sum + r, 0) / reviews.length : 0}
              onBook={handleBookClick}
              onWishlist={() => {
                console.log('wishlist clicked');
              }}
            />
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        ticketTypes={event?.tickets || []}
        onPurchase={handlePurchase}
      />
    </div>
  ); 

  }
  


export default EventDetails;
