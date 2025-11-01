// // src/components/dashboard/UserDashboard.tsx
// import { Link } from 'react-router-dom';
// import { Card, CardHeader, CardBody, Button, Chip, Avatar } from '@heroui/react';
// import StatsCard from './StatsCard';

// interface UserDashboardProps {
//   user: any;
//   stats: any;
//   tickets: any[];
// }

// const UserDashboard = ({ user, stats, tickets }: UserDashboardProps) => {
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
//             Welcome back, {user?.name}! 👋
//           </h1>
//           <p className="text-default-500">
//             Manage your tickets and explore new events
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <StatsCard icon="🎟️" value={stats.ticketsPurchased} label="Tickets Purchased" color="primary" />
//           <StatsCard icon="📅" value={stats.upcomingEvents} label="Upcoming Events" color="secondary" />
//           <StatsCard icon="💰" value={`$${stats.totalSpent}`} label="Total Spent" color="success" />
//           <StatsCard icon="⭐" value={stats.reviewsGiven} label="Reviews Given" color="warning" />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Upcoming Tickets */}
//             <Card>
//               <CardHeader className="flex justify-between">
//                 <h2 className="text-2xl font-bold">Upcoming Events</h2>
//                 <Button as={Link} to="/my-tickets" size="sm" variant="light" color="primary">
//                   View All
//                 </Button>
//               </CardHeader>
//               <CardBody className="space-y-4">
//                 {tickets.length === 0 ? (
//                   <div className="text-center py-12">
//                     <div className="text-6xl mb-4">🎫</div>
//                     <p className="text-default-500 mb-4">No upcoming events yet</p>
//                     <Button as={Link} to="/" color="primary">Browse Events</Button>
//                   </div>
//                 ) : (
//                   tickets.map((ticket) => (
//                     <div key={ticket.id} className="flex gap-4 p-4 border border-default-200 rounded-xl hover:border-primary transition-colors">
//                       <img src={ticket.eventImage} alt={ticket.eventTitle} className="w-24 h-24 rounded-lg object-cover" />
//                       <div className="flex-1">
//                         <h3 className="font-bold text-lg mb-1">{ticket.eventTitle}</h3>
//                         <p className="text-sm text-default-500 mb-2">📅 {formatDate(ticket.date)}</p>
//                         <p className="text-sm text-default-500 mb-2">📍 {ticket.location}</p>
//                         <div className="flex gap-2">
//                           <Chip size="sm" variant="flat" color="primary">{ticket.ticketType}</Chip>
//                           <Chip size="sm" variant="flat">Qty: {ticket.quantity}</Chip>
//                           <Chip size="sm" color="success" variant="flat">{ticket.status}</Chip>
//                         </div>
//                       </div>
//                       <div className="flex flex-col gap-2">
//                         <Button as={Link} to={`/events/${ticket.id}`} size="sm" variant="bordered">View Details</Button>
//                         <Button size="sm" color="primary">View Ticket</Button>
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
//               <CardHeader><h2 className="text-xl font-bold">Profile</h2></CardHeader>
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
//                 <Button as={Link} to="/" color="primary" variant="light">Browse Events</Button>
//                 <Button as={Link} to="/my-tickets" color="secondary" variant="light">My Tickets</Button>
//                 <Button as={Link} to="/settings" color="default" variant="light">Settings</Button>
//               </CardBody>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;