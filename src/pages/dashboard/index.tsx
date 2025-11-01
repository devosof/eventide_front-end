"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  Chip,
} from "@heroui/react";

import { MetricCard } from "@/components/dashboard/metric-card";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { Calendar, Ticket, Users } from "lucide-react";
import { mockEventCards } from "@/config/mockEvents";
import { useNavigate } from "react-router-dom";
import {EventDetailModal} from "@/components/dashboard/event-detail-modal";


export default function DashboardPage() {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const eventColumns = [
    { key: "title", label: "Event Title" },
    { key: "date", label: "Date" },
    { key: "location", label: "Location" },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            value === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  // const events = [
  //   { name: "Music Fest", date: "2025-10-20", location: "Karachi", status: "Active" },
  //   { name: "Tech Expo", date: "2025-11-05", location: "Lahore", status: "Inactive" },
  //   { name: "Startup Meetup", date: "2025-09-18", location: "Islamabad", status: "Active" },
  // ];

  const events = [...mockEventCards];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">Welcome Back</p>
          <h1 className="text-3xl font-bold text-gray-900">
            Darlene Robertson
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {/* <TeamAvatarGroup members={teamMembers} onInvite={() => console.log("Invite clicked")} /> */}
          <p className="text-xs text-gray-500">
            Last Update 7:15 pm 2 Jan 2024
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Events"
          value="24"
          change={5}
          changeType="positive"
          icon={<Calendar className="w-5 h-5 text-primary" />}
        />
        <MetricCard
          title="Tickets Sold"
          value="1,240"
          change={-2}
          changeType="negative"
          icon={<Ticket className="w-5 h-5 text-primary" />}
        />
        <MetricCard
          title="Active Users"
          value="532"
          change={3.5}
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


      
      {/* Events  */}
      <Card className="border border-gray-200">
        <CardHeader className="flex flex-col items-start gap-2 p-6">
          <h2 className="text-lg font-bold text-gray-900">Current Events</h2>
        </CardHeader>
        <Divider />
        <CardBody className="p-6">
          <DataTable
            columns={eventColumns}
            data={events}
            onRowClick={(event) => {
              navigate('/dashboard/events');
              console.log(`Event ${event}`)
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
