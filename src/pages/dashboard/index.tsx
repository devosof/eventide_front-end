"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Calendar, Edit2, Plus, Ticket, Trash2, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Booking, Event } from "@/api/types";
import { api } from "@/api/api";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { eventService } from "@/services/eventService";
import { useToast } from "@/components/toast-provider";
import { MetricCard } from "@/components/dashboard/metric-card";

const BASE_API_URL = "http://localhost:3000";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { success } = useToast();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalBookings: 0,
    revenue: 0,
  });

  const [userStats, setUserStats] = useState({
    totalBookings: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    totalSpent: 0,
  });
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  useEffect(() => {
    if (!user) return;
    if (user.role === "ORGANIZER") loadOrganizerDashboard();
    else if (user.role === "ATTENDEE") loadUserDashboard();
  }, [user]);

  // --- ATTENDEE DASHBOARD ---
  const loadUserDashboard = async () => {
    setLoading(true);
    try {
      const response = await eventService.fetchMyBookings();
      const bookings = response?.items || [];

      setUserBookings(bookings);

      const totalBookings = bookings.length;
      const totalSpent = bookings.reduce(
        (sum, booking) => sum + Number(booking.ticket.price),
        0
      );

      const now = new Date();
      const upcomingEvents = bookings.filter(
        (b) => new Date(b.event.startDate) > now
      ).length;
      const pastEvents = bookings.filter(
        (b) => new Date(b.event.endDate) < now
      ).length;

      setUserStats({
        totalBookings,
        upcomingEvents,
        pastEvents,
        totalSpent,
      });
    } catch (error) {
      console.error("Failed to load user dashboard bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- ORGANIZER DASHBOARD ---
  const loadOrganizerDashboard = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${BASE_API_URL}/events/my-events`);
      const eventsData = res.data as Event[];
      setEvents(eventsData);

      const now = new Date();
      const activeEvents = eventsData.filter(
        (e: Event) => new Date(e.endDate) > now
      );

      setStats({
        totalEvents: eventsData.length,
        activeEvents: activeEvents.length,
        totalBookings: 0,
        revenue: 0,
      });
    } catch (error) {
      console.error("Failed to load organizer dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE EVENT ---
  const handleDelete = async (eventId: string | number) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setDeletingId(eventId)
    try {
      const response = await api.delete(`${BASE_API_URL}/events/${eventId}`);
      if (response.status === 200) {
        setEvents((prev) => prev.filter((e) => e.id !== eventId));
        success("Event deleted successfully");
      }
    } catch (error: any) {
      console.error("Failed to delete event:", error);
      alert(error.response?.data?.message || "Failed to delete event");
    } finally {
      setDeletingId(null);
    }
  };

  // --- CONDITIONAL RENDERING ---
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (user?.role === "ATTENDEE") {
    return (
      <UserDashboard user={user} stats={userStats} bookings={userBookings} />
    );
  }

  // --- ORGANIZER DASHBOARD RENDER ---
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">Welcome Back</p>
          <h1 className="text-3xl font-bold text-primary">
            Hello, {user?.name || "Organizer"}
          </h1>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Events"
          value={stats.totalEvents.toString()}
          icon={<Calendar className="w-5 h-5 text-primary" />}
        />
        <MetricCard
          title="Tickets Sold"
          value="100"
          change={-2}
          changeType="negative"
          icon={<Ticket className="w-5 h-5 text-primary" />}
        />
        <MetricCard
          title="Active Events"
          value={stats.activeEvents.toString()}
          icon={<Users className="w-5 h-5 text-primary" />}
        />
        <MetricCard
          title="Revenue"
          value="$12,340"
          change={8.2}
          changeType="positive"
          icon={<Ticket className="w-5 h-5 text-primary" />}
        />
      </div>

      {/* Organizer Events Table */}
      <Card className="bg-card">
        <CardHeader className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Current Events
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Manage and track your events
            </p>
          </div>
          <Button
            color="primary"
            startContent={<Plus className="w-4 h-4" />}
            onPress={() => navigate("/dashboard/events")}
          >
            Create Event
          </Button>
        </CardHeader>

        <CardBody className="p-0">
          <Table aria-label="Events table" removeWrapper>
            <TableHeader>
              <TableColumn>EVENT NAME</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>LOCATION</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>

            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>
                    {new Date(event.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{event.location.city}</TableCell>
                  <TableCell>
                    <Chip size="sm" color="success" variant="flat">
                      Active
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                      as = {Link}
                      to = {`event/${event.id}`}
                      isIconOnly 
                      size="sm" 
                      variant="light">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        isDisabled={deletingId == event.id}
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => handleDelete(event.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
