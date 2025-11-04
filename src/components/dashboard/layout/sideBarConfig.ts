import { BarChart2, Calendar, Settings, Ticket, Users, PlusCircle } from "lucide-react";

export const organizerSidebarItems = [
  { name: "Dashboard", icon: BarChart2, path: "/dashboard" },
  { name: "Events", icon: Calendar, path: "/dashboard/events" },
  { name: "Create Event", icon: PlusCircle, path: "/dashboard/events/create" },
  { name: "Bookings", icon: Ticket, path: "/dashboard/bookings" },
  // { name: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export const userSidebarItems = [
  { name: "Dashboard", icon: BarChart2, path: "/dashboard" },
  { name: "My Tickets", icon: Ticket, path: "/dashboard/my-tickets" },
  { name: "Browse Events", icon: Calendar, path: "/events" },
  // { name: "Settings", icon: Settings, path: "/dashboard/settings" },
]