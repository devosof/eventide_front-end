// ==================== Types ====================
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ATTENDEE' | 'ORGANIZER';
  organizerProfile?: OrganizerProfile
}

export interface OrganizerProfile {
  id: number;
  organizationName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Ticket {
  id: number;
  name: string;
  price: number;
  salesStartDate: string;
  salesEndDate: string;
}


export interface Event {
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
    organizerProfile?: OrganizerProfile
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
  tickets?: Ticket[];
  categories: Category[];
  createdAt: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  reviewer: { id: number; name: string };
  event: {
    id: number;
    name: string;
    startDate: string;
    city: string;
    images: { id: number; imageUrl: string }[];
  };
  createdAt: string;
}

export interface Booking {
  id: number;
  status: string;
  user: { id: number; name: string; email: string };
  event: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    city: string;
    images: { id: number; imageUrl: string }[];
  };
  ticket: { id: number; name: string; price: number };
  bookingDate: string;
}

export interface BookingResponse{
  items:Booking[];
  total: number;
  page:number;
  limit: number;
  pages: number;
}



