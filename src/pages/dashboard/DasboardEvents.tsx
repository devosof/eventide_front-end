import React, { useEffect } from "react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/contexts/eventContext";
import { Loader } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import EventRow from "@/components/dashboard/EventRow";

const DasboardEvents = () => {


    const navigate = useNavigate();
    const {events, loading, error, fetchOrganizerEvents} = useEvents()

    useEffect(() => {
        fetchOrganizerEvents();
    }, [fetchOrganizerEvents]);

    const handleCreateEvent = () => {
        navigate('/dashboard/create-event');
    }
  return (
    <>
    
    <div className="w-full p-5">
      <div className="mb-5 flex items-center">
        <h1 className="text-primary text-3xl font-bold">Your Events</h1>
        <Button onPress= {handleCreateEvent} className="ml-auto" variant="solid" color="primary">
          Create New Event
        </Button>
      </div>
    </div>

    <div className="w-full p-5">
        {loading ? (
            <Loader className="animate-spin mx-auto" />
        ): error ? (
            <p className="text-red-500">Error loading events: {error}</p>
        ) : events.length === 0 ? (
            <p>No events found. Create your first event!</p>
        ) : (
            <div className= "gap-6">
                {events.map((event) => (
                    <EventRow key={event.id} event={event} />
                ))}
            </div>
         )}
    </div>


    </>

   
  );
};

export default DasboardEvents;


