// src/pages/Dashboard.tsx - SIMPLIFIED!
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/user.types';
// import UserDashboard from '../components/dashboard/UserDashboard';
// import OrganizerDashboard from '../components/dashboard/OrganizerDashboard';

// Mock data
const mockUserStats = {
  ticketsPurchased: 12,
  upcomingEvents: 3,
  totalSpent: 875,
  reviewsGiven: 8,
};

const mockOrganizerStats = {
  totalEvents: 8,
  activeEvents: 3,
  totalRevenue: 45230,
  ticketsSold: 523,
  averageRating: 4.7,
};

const mockTickets = [
  {
    id: '1',
    eventTitle: 'Summer Music Festival 2025',
    eventImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
    date: '2025-07-15T18:00:00',
    location: 'Central Park, New York',
    ticketType: 'VIP Pass',
    quantity: 2,
    status: 'confirmed',
  },
  {
    id: '2',
    eventTitle: 'Tech Innovation Summit',
    eventImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    date: '2025-08-22T09:00:00',
    location: 'Convention Center, SF',
    ticketType: 'General Admission',
    quantity: 1,
    status: 'confirmed',
  },
];

const mockEvents = [
  {
    id: '1',
    title: 'Summer Music Festival 2025',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
    date: '2025-07-15T18:00:00',
    ticketsSold: 250,
    totalTickets: 500,
    revenue: 21250,
    status: 'active',
  },
  {
    id: '2',
    title: 'Food & Wine Expo',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    date: '2025-06-10T12:00:00',
    ticketsSold: 150,
    totalTickets: 300,
    revenue: 0,
    status: 'active',
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const isOrganizer = user?.role === UserRole.ORGANIZER;

  // TODO: Fetch real data from API
  // const { data: stats } = useQuery(['dashboard-stats', user?.id]);
  // const { data: tickets } = useQuery(['user-tickets', user?.id]);
  // const { data: events } = useQuery(['organizer-events', user?.id]);

  if (isOrganizer) {
    return (
      <OrganizerDashboard
        user={user}
        stats={mockOrganizerStats}
        events={mockEvents}
      />
    );
  }

  return (
    <UserDashboard
      user={user}
      stats={mockUserStats}
      tickets={mockTickets}
    />
  );
};

export default Dashboard;




// // src/pages/Dashboard.tsx
// import { Link } from 'react-router-dom';
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Button,
//   Chip,
//   Avatar,
//   Progress,
//   Tabs,
//   Tab,
// } from '@heroui/react';
// import { useAuth } from '../contexts/AuthContext';
// import { UserRole } from '../types/user.types';

// // Mock data
// const mockUserStats = {
//   ticketsPurchased: 12,
//   upcomingEvents: 3,
//   totalSpent: 875,
//   reviewsGiven: 8,
// };

// const mockOrganizerStats = {
//   totalEvents: 8,
//   activeEvents: 3,
//   totalRevenue: 45230,
//   ticketsSold: 523,
//   averageRating: 4.7,
// };

// const mockUpcomingTickets = [
//   {
//     id: '1',
//     eventTitle: 'Summer Music Festival 2025',
//     eventImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
//     date: '2025-07-15T18:00:00',
//     location: 'Central Park, New York',
//     ticketType: 'VIP Pass',
//     quantity: 2,
//     status: 'confirmed',
//   },
//   {
//     id: '2',
//     eventTitle: 'Tech Innovation Summit',
//     eventImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
//     date: '2025-08-22T09:00:00',
//     location: 'Convention Center, SF',
//     ticketType: 'General Admission',
//     quantity: 1,
//     status: 'confirmed',
//   },
// ];

// const mockOrganizerEvents = [
//   {
//     id: '1',
//     title: 'Summer Music Festival 2025',
//     image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
//     date: '2025-07-15T18:00:00',
//     ticketsSold: 250,
//     totalTickets: 500,
//     revenue: 21250,
//     status: 'active',
//   },
//   {
//     id: '2',
//     title: 'Food & Wine Expo',
//     image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
//     date: '2025-06-10T12:00:00',
//     ticketsSold: 150,
//     totalTickets: 300,
//     revenue: 0,
//     status: 'active',
//   },
//   {
//     id: '3',
//     title: 'Contemporary Art Exhibition',
//     image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=400',
//     date: '2025-07-01T10:00:00',
//     ticketsSold: 40,
//     totalTickets: 120,
//     revenue: 1000,
//     status: 'active',
//   },
// ];

// const Dashboard = () => {
//   const { user } = useAuth();
//   const isOrganizer = user?.role === UserRole.ORGANIZER;

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: 'numeric',
//       minute: '2-digit',
//     });
//   };

//   // User Dashboard
//   if (!isOrganizer) {
//     return (
//       <div className="min-h-screen bg-background py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-4xl font-display font-bold mb-2">
//               Welcome back, {user?.name}! 👋
//             </h1>
//             <p className="text-default-500">
//               Manage your tickets and explore new events
//             </p>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <Card>
//               <CardBody className="text-center p-6">
//                 <div className="text-4xl mb-2">🎟️</div>
//                 <div className="text-3xl font-bold text-primary">
//                   {mockUserStats.ticketsPurchased}
//                 </div>
//                 <div className="text-sm text-default-500">Tickets Purchased</div>
//               </CardBody>
//             </Card>

//             <Card>
//               <CardBody className="text-center p-6">
//                 <div className="text-4xl mb-2">📅</div>
//                 <div className="text-3xl font-bold text-secondary">
//                   {mockUserStats.upcomingEvents}
//                 </div>
//                 <div className="text-sm text-default-500">Upcoming Events</div>
//               </CardBody>
//             </Card>

//             <Card>
//               <CardBody className="text-center p-6">
//                 <div className="text-4xl mb-2">💰</div>
//                 <div className="text-3xl font-bold text-success">
//                   ${mockUserStats.totalSpent}
//                 </div>
//                 <div className="text-sm text-default-500">Total Spent</div>
//               </CardBody>
//             </Card>

//             <Card>
//               <CardBody className="text-center p-6">
//                 <div className="text-4xl mb-2">⭐</div>
//                 <div className="text-3xl font-bold text-warning">
//                   {mockUserStats.reviewsGiven}
//                 </div>
//                 <div className="text-sm text-default-500">Reviews Given</div>
//               </CardBody>
//             </Card>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Upcoming Tickets */}
//                 <Card>
//                 <CardHeader className="flex justify-between">
//                   <h2 className="text-2xl font-bold">Upcoming Events</h2>
//                   <Button
//                   as={Link}
//                   to="/my-tickets"
//                   size="sm"
//                   variant="light"
//                   color="primary"
//                   >
//                   View All
//                   </Button>
//                 </CardHeader>
//                 <CardBody className="space-y-4">
//                   {mockUpcomingTickets.length === 0 ? (
//                   <div className="text-center py-12">
//                     <div className="text-6xl mb-4">🎫</div>
//                     <p className="text-default-500 mb-4">
//                     No upcoming events yet
//                     </p>
//                     <Button as={Link} to="/" color="primary">
//                     Browse Events
//                     </Button>
//                   </div>
//                   ) : (
//                   mockUpcomingTickets.map((ticket) => (
//                     <div
//                     key={ticket.id}
//                     className="flex gap-4 p-4 border border-default-200 rounded-xl hover:border-primary transition-colors"
//                     >
//                     <img
//                       src={ticket.eventImage}
//                       alt={ticket.eventTitle}
//                       className="w-24 h-24 rounded-lg object-cover"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-bold text-lg mb-1">
//                       {ticket.eventTitle}
//                       </h3>
//                       <p className="text-sm text-default-500 mb-2">
//                       📅 {formatDate(ticket.date)}
//                       </p>
//                       <p className="text-sm text-default-500 mb-2">
//                       📍 {ticket.location}
//                       </p>
//                       <div className="flex gap-2">
//                       <Chip size="sm" variant="flat" color="primary">
//                         {ticket.ticketType}
//                       </Chip>
//                       <Chip size="sm" variant="flat">
//                         Qty: {ticket.quantity}
//                       </Chip>
//                       <Chip size="sm" color="success" variant="flat">
//                         {ticket.status}
//                       </Chip>
//                       </div>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <Button
//                       as={Link}
//                       to={`/events/${ticket.id}`}
//                       size="sm"
//                       variant="bordered"
//                       >
//                       View Details
//                       </Button>
//                       <Button size="sm" color="primary">
//                       View Ticket
//                       </Button>
//                     </div>
//                     </div>
//                   ))
//                   )}
//                 </CardBody>
//                 </Card>

//                 {/* Recent Reviews */}
//                 <Card>
//                 <CardHeader>
//                   <h2 className="text-2xl font-bold">Recent Reviews</h2>
//                 </CardHeader>
//                 <CardBody>
//                   <div className="text-center py-8 text-default-500">
//                   No recent reviews yet.
//                   </div>
//                 </CardBody>
//                 </Card>
//               </div>

//               {/* Sidebar */}
//               <div className="space-y-6">
//                 <Card>
//                 <CardHeader>
//                   <h2 className="text-xl font-bold">Profile</h2>
//                 </CardHeader>
//                 <CardBody className="flex flex-col items-center gap-3">
//                   <Avatar
//                   src={user?.name}
//                   name={user?.name}
//                   size="lg"
//                   className="mb-2"
//                   />
//                   <div className="font-bold text-lg">{user?.name}</div>
//                   <Chip color="primary" variant="flat" size="sm">
//                   {user?.email}
//                   </Chip>
//                   <Button as={Link} to="/profile" size="sm" color="primary">
//                   Edit Profile
//                   </Button>
//                 </CardBody>
//                 </Card>
//                 <Card>
//                 <CardHeader>
//                   <h2 className="text-xl font-bold">Quick Actions</h2>
//                 </CardHeader>
//                 <CardBody className="flex flex-col gap-3">
//                   <Button as={Link} to="/" color="primary" variant="light">
//                   Browse Events
//                   </Button>
//                   <Button as={Link} to="/my-tickets" color="secondary" variant="light">
//                   My Tickets
//                   </Button>
//                   <Button as={Link} to="/settings" color="default" variant="light">
//                   Settings
//                   </Button>
//                 </CardBody>
//                 </Card>
//               </div>
//               </div>
//             </div>
//             </div>
//           );
//           }

//           // Organizer Dashboard
//           return (
//           <div className="min-h-screen bg-background py-8 px-4">
//             <div className="max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="mb-8">
//               <h1 className="text-4xl font-display font-bold mb-2">
//               Welcome, {user?.name}! 🎤
//               </h1>
//               <p className="text-default-500">
//               Manage your events and track ticket sales
//               </p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//               <Card>
//               <CardBody className="text-center p-6">
//                 <div className="text-4xl mb-2">🎫</div>
//                 <div className="text-3xl font-bold text-primary">
//                 {mockOrganizerStats.ticketsSold}
//                 </div>
//                 <div className="text-sm text-default-500">Tickets Sold</div>
//               </CardBody>
//               </Card>
//               <Card>
//               <CardBody className="text-center p-6">
//                 <div className="text-4xl mb-2">📅</div>
//                 <div className="text-3xl font-bold text-secondary">
//                 {mockOrganizerStats.totalEvents}
//                 </div>
//                 <div className="text-sm text-default-500">Total Events</div>
//               </CardBody>
//               </Card>
//               <Card>
//               <CardBody className="text-center p-6">
//                 <div className="text-4xl mb-2">🟢</div>
//                 <div className="text-3xl font-bold text-success">
//                 {mockOrganizerStats.activeEvents}
//                 </div>
//                 <div className="text-sm text-default-500">Active Events</div>
//               </CardBody>
//               </Card>
//               <Card>
//               <CardBody className="text-center p-6">
//                 <div className="text-4xl mb-2">💰</div>
//                 <div className="text-3xl font-bold text-warning">
//                 ${mockOrganizerStats.totalRevenue}
//                 </div>
//                 <div className="text-sm text-default-500">Total Revenue</div>
//               </CardBody>
//               </Card>
//               <Card>
//               <CardBody className="text-center p-6">
//                 <div className="text-4xl mb-2">⭐</div>
//                 <div className="text-3xl font-bold text-primary">
//                 {mockOrganizerStats.averageRating}
//                 </div>
//                 <div className="text-sm text-default-500">Avg. Event Rating</div>
//               </CardBody>
//               </Card>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Main Content */}
//               <div className="lg:col-span-2 space-y-6">
//               {/* Active Events */}
//               <Card>
//                 <CardHeader className="flex justify-between">
//                 <h2 className="text-2xl font-bold">Active Events</h2>
//                 <Button
//                   as={Link}
//                   to="/organizer/events"
//                   size="sm"
//                   variant="light"
//                   color="primary"
//                 >
//                   View All
//                 </Button>
//                 </CardHeader>
//                 <CardBody className="space-y-4">
//                 {mockOrganizerEvents.length === 0 ? (
//                   <div className="text-center py-12">
//                   <div className="text-6xl mb-4">📅</div>
//                   <p className="text-default-500 mb-4">
//                     No active events yet
//                   </p>
//                   <Button as={Link} to="/organizer/create-event" color="primary">
//                     Create Event
//                   </Button>
//                   </div>
//                 ) : (
//                   mockOrganizerEvents.map((event) => (
//                   <div
//                     key={event.id}
//                     className="flex gap-4 p-4 border border-default-200 rounded-xl hover:border-primary transition-colors"
//                   >
//                     <img
//                     src={event.image}
//                     alt={event.title}
//                     className="w-24 h-24 rounded-lg object-cover"
//                     />
//                     <div className="flex-1">
//                     <h3 className="font-bold text-lg mb-1">
//                       {event.title}
//                     </h3>
//                     <p className="text-sm text-default-500 mb-2">
//                       📅 {formatDate(event.date)}
//                     </p>
//                     <div className="flex gap-2 mb-2">
//                       <Chip size="sm" variant="flat" color="primary">
//                       {event.status}
//                       </Chip>
//                       <Chip size="sm" variant="flat">
//                       {event.ticketsSold}/{event.totalTickets} Sold
//                       </Chip>
//                       <Chip size="sm" color="success" variant="flat">
//                       ${event.revenue}
//                       </Chip>
//                     </div>
//                     <Progress
//                       value={(event.ticketsSold / event.totalTickets) * 100}
//                       color="primary"
//                       size="sm"
//                       className="mb-2"
//                     />
//                     </div>
//                     <div className="flex flex-col gap-2">
//                     <Button
//                       as={Link}
//                       to={`/organizer/events/${event.id}`}
//                       size="sm"
//                       variant="bordered"
//                     >
//                       Manage
//                     </Button>
//                     <Button
//                       as={Link}
//                       to={`/events/${event.id}`}
//                       size="sm"
//                       color="primary"
//                     >
//                       View Event
//                     </Button>
//                     </div>
//                   </div>
//                   ))
//                 )}
//                 </CardBody>
//               </Card>

//               {/* Recent Feedback */}
//               <Card>
//                 <CardHeader>
//                 <h2 className="text-2xl font-bold">Recent Feedback</h2>
//                 </CardHeader>
//                 <CardBody>
//                 <div className="text-center py-8 text-default-500">
//                   No recent feedback yet.
//                 </div>
//                 </CardBody>
//               </Card>
//               </div>

//               {/* Sidebar */}
//               <div className="space-y-6">
//               <Card>
//                 <CardHeader>
//                 <h2 className="text-xl font-bold">Organizer Profile</h2>
//                 </CardHeader>
//                 <CardBody className="flex flex-col items-center gap-3">
//                 <Avatar
//                   src={user?.name}
//                   name={user?.name}
//                   size="lg"
//                   className="mb-2"
//                 />
//                 <div className="font-bold text-lg">{user?.name}</div>
//                 <Chip color="primary" variant="flat" size="sm">
//                   {user?.email}
//                 </Chip>
//                 <Button as={Link} to="/profile" size="sm" color="primary">
//                   Edit Profile
//                 </Button>
//                 </CardBody>
//               </Card>
//               <Card>
//                 <CardHeader>
//                 <h2 className="text-xl font-bold">Quick Actions</h2>
//                 </CardHeader>
//                 <CardBody className="flex flex-col gap-3">
//                 <Button as={Link} to="/organizer/create-event" color="primary" variant="light">
//                   Create Event
//                 </Button>
//                 <Button as={Link} to="/organizer/events" color="secondary" variant="light">
//                   Manage Events
//                 </Button>
//                 <Button as={Link} to="/settings" color="default" variant="light">
//                   Settings
//                 </Button>
//                 </CardBody>
//               </Card>
//               </div>
//             </div>
//             </div>
//           </div>
//           );
//         }



// export default Dashboard