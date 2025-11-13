import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Context/CreateContext";
import axiosInstance from "../../Axios/AxiosInstance";

const JoinedEvents = () => {
  const { user, loading } = useContext(AuthContext);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      if (!loading) {
        setIsDataLoading(false);
      }
      return;
    }

    const fetchJoinedEvents = async () => {
      setIsDataLoading(true);
      setIsError(null);
      try {
        const response = await axiosInstance.get(
          `/joined-events/${user.email}`
        );
        setJoinedEvents(response.data);
      } catch (err) {
        console.error("Failed to fetch joined events:", err);
        setIsError(err);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [user, loading]);

  if (loading || isDataLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl text-red-500">
          Error: Could not load your events.
        </h2>
      </div>
    );
  }

  if (joinedEvents.length === 0) {
    return (
      <div className="bg-base-200 py-20">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="heading-section mx-auto">My Joined Events</h2>
          <p className="heading-text max-w-2xl mx-auto mt-4">
            You haven't joined any events yet.
          </p>
          <Link to="/upcoming-events" className="btn btn-primary mt-8">
            Find Events to Join
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 py-20">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <h2 className="heading-section mx-auto">My Joined Events</h2>
          <p className="heading-text max-w-2xl mx-auto">
            Here is a list of all the events you have registered for.
          </p>
        </div>

        <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Event Title</th>
                  <th>Location</th>
                  <th>Event Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {joinedEvents.map((event) => {
                  const formattedDate = new Date(
                    event.eventDate
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  return (
                    <tr key={event._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={event.thumbnail} alt={event.title} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{event.title}</div>
                          </div>
                        </div>
                      </td>
                      <td>{event.location}</td>
                      <td>{formattedDate}</td>
                      <td>
                        <Link
                          to={`/events/${event.eventId}`}
                          className="btn btn-primary btn-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinedEvents;
