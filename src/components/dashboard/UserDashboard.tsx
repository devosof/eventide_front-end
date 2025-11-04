// src/components/dashboard/UserDashboard.tsx
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Chip,
  Avatar,
} from "@heroui/react";
import { Booking, User } from "@/api/types";
import { TimerIcon, Wallet2Icon } from "lucide-react";

interface UserStats {
  totalBookings: number;
  upcomingEvents: number;
  pastEvents: number;
  totalSpent: number;
  // reviewsGiven: number;
}

interface Ticket {
  id: string;
  eventTitle: string;
  eventImage: string;
  date: string;
  location: string;
  ticketType: string;
  quantity: number;
  status: string;
}

interface UserDashboardProps {
  user: User | null;
  stats: UserStats;
  bookings: Booking[];
}

const UserDashboard = ({ user, stats, bookings }: UserDashboardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name || "Guest"}! 👋
        </h1>
        <p className="text-default-500">
          Manage your tickets and explore new events
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardBody className="text-center p-6">
            <div className="text-3xl mb-2">🎟️</div>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <div className="text-default-500 text-sm">Tickets Purchased</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center p-6">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
            <div className="text-default-500 text-sm">Upcoming Events</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center p-6">
            <div className="text-3xl mb-2 flex justify-center">
              <TimerIcon />
            </div>
            <div className="text-2xl font-bold">{stats.pastEvents}</div>
            <div className="text-default-500 text-sm">Past Events</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center p-6">
            <div className="text-3xl mb-2 flex items-center justify-center">
              <Wallet2Icon className="text-primary" />
            </div>
            <div className="text-2xl font-bold">${stats.totalSpent}</div>
            <div className="text-default-500 text-sm">Total Spent</div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Tickets */}
          <Card>
            <CardHeader className="flex justify-between">
              <h2 className="text-xl font-bold">Upcoming Events</h2>
              <Button
                as={Link}
                to="/dashboard/my-tickets"
                size="sm"
                variant="light"
                color="primary"
              >
                View All
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              {(() => {
                const upcomingBookings = bookings.filter(
                  (b) => new Date(b.event.startDate) > new Date()
                );

                if (upcomingBookings.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🎫</div>
                      <p className="text-default-500 mb-4">
                        No upcoming events for you yet
                      </p>
                      <Button as={Link} to="/" color="primary">
                        Browse Events
                      </Button>
                    </div>
                  );
                }

                return upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex gap-4 p-4 border border-default-200 rounded-xl hover:border-primary transition-colors"
                  >
                    <img
                      src={booking.event.images?.[0]?.imageUrl}
                      alt={booking.event.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">
                        {booking.event.name}
                      </h3>
                      <p className="text-sm text-default-500 mb-2">
                        📅 {formatDate(booking.event.startDate)}
                      </p>
                      <p className="text-sm text-default-500 mb-2">
                        📍 {booking.event.city || booking.event.city}
                      </p>
                      <div className="flex gap-2">
                        <Chip size="sm" variant="flat" color="primary">
                          {booking.ticket.name}
                        </Chip>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        as={Link}
                        to={`/events/${booking.event.id}`}
                        size="sm"
                        variant="bordered"
                      >
                        View Details
                      </Button>
                      <Button size="sm" color="primary">
                        View Ticket
                      </Button>
                    </div>
                  </div>
                ));
              })()}
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Profile</h2>
            </CardHeader>
            <CardBody className="flex flex-col items-center gap-3">
              <Avatar name={user?.name} size="lg" className="mb-2" />
              <div className="font-bold text-lg">{user?.name || "Guest"}</div>
              <Chip color="primary" variant="flat" size="sm">
                {user?.email || "No email"}
              </Chip>
              {/* <Button as={Link} to="/dashboard/settings" size="sm" color="primary">Edit Profile</Button> */}
            </CardBody>
          </Card>

          {/* Quick Actions
          <Card>
            <CardHeader><h2 className="text-xl font-bold">Quick Actions</h2></CardHeader>
            <CardBody className="flex flex-col gap-3">
              <Button as={Link} to="/" color="primary" variant="light">Browse Events</Button>
              <Button as={Link} to="/dashboard/my-tickets" color="secondary" variant="light">My Tickets</Button>
              <Button as={Link} to="/dashboard/settings" color="default" variant="light">Settings</Button>
            </CardBody>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
