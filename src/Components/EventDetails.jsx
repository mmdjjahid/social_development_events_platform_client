import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/CreateContext";

import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import axiosInstance from "../Axios/AxiosInstance";
import NotFoundPage from "../Pages/NotFoundPage";
import Loading from "./Loading";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
        setIsError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, setLoading]);

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error("You must be logged in to join an event.");
      navigate("/login");
      return;
    }

    const joinData = {
      userEmail: user.email,
      eventId: event._id,
      title: event.title,
      thumbnail: event.thumbnail,
      location: event.location,
      eventDate: event.eventDate,
    };

    try {
      const response = await axiosInstance.post("/join-event", joinData);
      if (response.data.insertedId) {
        toast.success("You have successfully joined the event!");
      }
    } catch (error) {
      console.error("Failed to join event:", error);
      toast.error("An error occurred. You may have already joined this event.");
    }
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl text-red-500">
          Error: Could not load event details.
        </h2>
      </div>
    );
  }
if (!event){
   return <NotFoundPage></NotFoundPage>
}
  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

//   console.log(`this event ${event}`);

  return (
    <div className="bg-base-200 py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
          {loading ? <Loading></Loading> :  (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 md:h-80 lg:h-full">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-4">
                  <span className="badge badge-primary badge-lg">
                    {event.eventType}
                  </span>

                  <span className="text-sm text-base-content/70">
                    <FaUser className="inline mr-1" />
                    Posted by: {event.creatorEmail}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-6">
                  {event.title}
                </h1>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-primary text-xl" />
                    <div>
                      <h3 className="font-semibold text-lg">Date</h3>
                      <p className="text-base-content/80">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-primary text-xl" />
                    <div>
                      <h3 className="font-semibold text-lg">Location</h3>
                      <p className="text-base-content/80">{event.location}</p>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none text-base-content/90 mb-8">
                  <p>{event.description}</p>
                </div>

                <button
                  onClick={handleJoinEvent}
                  className="btn btn-primary btn-lg w-full"
                >
                  Join Event
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
