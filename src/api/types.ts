// ==================== Types ====================
interface User {
  id: number;
  name: string;
  email: string;
  role: 'ATTENDEE' | 'ORGANIZER';
  organizerProfile?: {
    id: number;
    organizationName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
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

interface Review {
  id: number;
  rating: number;
  comment: string;
  reviewer: { id: number; name: string };
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
}