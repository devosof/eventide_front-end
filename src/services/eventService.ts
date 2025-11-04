import {api} from '@/api/api';
import { Event, Booking, BookingResponse } from '@/api/types';

/**
 * Fetches the events created by the currently logged-in organizer.
 * This corresponds to the [GET] /events/my-events endpoint.
 */
export const fetchMyEvents = async (): Promise<Event[]> => {
  try {
    // The auth token is automatically added by the Axios interceptor
    const response = await api.get<Event[]>('/events/my-events');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch organizer events:', error);
    // Re-throw the error so the context can handle it
    throw error;
  }
};

/**
 * Fetches the bookings made by the currently logged-in user.
 * This corresponds to the [GET] /bookings/my-bookings endpoint.
 */
export const fetchMyBookings = async (): Promise<BookingResponse> => {
  try {
    // The auth token is automatically added by the Axios interceptor
    const response = await api.get<BookingResponse>('/bookings/my-bookings');
    console.log("Fetched Bookings, ", response.data)
    return response.data;
    
  } catch (error) {
    console.error('Failed to fetch user bookings:', error);
    // Re-throw the error so the context can handle it
    throw error;
  }
};

// Export as a service object for easier imports
export const eventService = {
  fetchMyEvents,
  fetchMyBookings
};