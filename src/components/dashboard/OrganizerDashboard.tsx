// // src/components/dashboard/OrganizerDashboard.tsx
// import { Link } from 'react-router-dom';
// import { Card, CardHeader, CardBody, Button, Chip, Avatar, Progress } from '@heroui/react';
// import StatsCard from './StatsCard';

// interface OrganizerDashboardProps {
//   user: any;
//   stats: any;
//   events: any[];
// }

// const OrganizerDashboard = ({ user, stats, events }: OrganizerDashboardProps) => {
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: 'numeric',
//       minute: '2-digit',
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-display font-bold mb-2">
//             Welcome, {user?.name}! 🎤
//           </h1>
//           <p className="text-default-500">Manage your events and track ticket sales</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//           <StatsCard icon="🎫" value={stats.ticketsSold} label="Tickets Sold" color="primary" />
//           <StatsCard icon="📅" value={stats.totalEvents} label="Total Events" color="secondary" />
//           <StatsCard icon="🟢" value={stats.activeEvents} label="Active Events" color="success" />
//           <StatsCard icon="💰" value={`$${stats.totalRevenue}`} label="Total Revenue" color="warning" />
//           <StatsCard icon="⭐" value={stats.averageRating} label="Avg. Rating" color="primary" />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Active Events */}
//             <Card>
//               <CardHeader className="flex justify-between">
//                 <h2 className="text-2xl font-bold">Active Events</h2>
//                 <Button as={Link} to="/organizer/events" size="sm" variant="light" color="primary">
//                   View All
//                 </Button>
//               </CardHeader>
//               <CardBody className="space-y-4">
//                 {events.length === 0 ? (
//                   <div className="text-center py-12">
//                     <div className="text-6xl mb-4">📅</div>
//                     <p className="text-default-500 mb-4">No active events yet</p>
//                     <Button as={Link} to="/organizer/create-event" color="primary">Create Event</Button>
//                   </div>
//                 ) : (
//                   events.map((event) => (
//                     <div key={event.id} className="flex gap-4 p-4 border border-default-200 rounded-xl hover:border-primary transition-colors">
//                       <img src={event.image} alt={event.title} className="w-24 h-24 rounded-lg object-cover" />
//                       <div className="flex-1">
//                         <h3 className="font-bold text-lg mb-1">{event.title}</h3>
//                         <p className="text-sm text-default-500 mb-2">📅 {formatDate(event.date)}</p>
//                         <div className="flex gap-2 mb-2">
//                           <Chip size="sm" variant="flat" color="primary">{event.status}</Chip>
//                           <Chip size="sm" variant="flat">{event.ticketsSold}/{event.totalTickets} Sold</Chip>
//                           <Chip size="sm" color="success" variant="flat">${event.revenue}</Chip>
//                         </div>
//                         <Progress
//                           value={(event.ticketsSold / event.totalTickets) * 100}
//                           color="primary"
//                           size="sm"
//                         />
//                       </div>
//                       <div className="flex flex-col gap-2">
//                         <Button as={Link} to={`/organizer/events/${event.id}`} size="sm" variant="bordered">Manage</Button>
//                         <Button as={Link} to={`/events/${event.id}`} size="sm" color="primary">View Event</Button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </CardBody>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Profile Card */}
//             <Card>
//               <CardHeader><h2 className="text-xl font-bold">Organizer Profile</h2></CardHeader>
//               <CardBody className="flex flex-col items-center gap-3">
//                 <Avatar name={user?.name} size="lg" className="mb-2" />
//                 <div className="font-bold text-lg">{user?.name}</div>
//                 <Chip color="primary" variant="flat" size="sm">{user?.email}</Chip>
//                 <Button as={Link} to="/settings" size="sm" color="primary">Edit Profile</Button>
//               </CardBody>
//             </Card>

//             {/* Quick Actions */}
//             <Card>
//               <CardHeader><h2 className="text-xl font-bold">Quick Actions</h2></CardHeader>
//               <CardBody className="flex flex-col gap-3">
//                 <Button as={Link} to="/organizer/create-event" color="primary" variant="light">Create Event</Button>
//                 <Button as={Link} to="/organizer/events" color="secondary" variant="light">Manage Events</Button>
//                 <Button as={Link} to="/settings" color="default" variant="light">Settings</Button>
//               </CardBody>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrganizerDashboard;