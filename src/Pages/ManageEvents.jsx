import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import { toast } from "react-toastify";

import { FaEdit, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../Context/CreateContext';
import axiosInstance from '../../Axios/AxiosInstance';

const ManageEvents = () => {
  const { user, loading } = useContext(AuthContext);
  const [myEvents, setMyEvents] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      if (!loading) setIsDataLoading(false);
      return;
    }

    const fetchMyEvents = async () => {
      setIsDataLoading(true);
      setIsError(null);
      try {
        const response = await axiosInstance.get(`/manage-events/${user.email}`);
        setMyEvents(response.data);
      } catch (err) {
        console.error("Failed to fetch user's events:", err);
        setIsError(err);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchMyEvents();
  }, [user, loading]);

  const handleDeleteEvent = async (id, title) => {

    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${title}"?\nThis cannot be undone.`
    );

    if (isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/events/${id}`);
        
        if (response.data.deletedCount > 0) {

          toast.success('Event deleted successfully!');
          setMyEvents(myEvents.filter(event => event._id !== id));
        } else {
          toast.error('Could not find the event to delete.');
        }
      } catch (err) {
        toast.error('Failed to delete the event.');
        console.error("Failed to delete event:", err);
      }
    }
  };

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
        <h2 className="text-2xl text-red-500">Error: Could not load your events.</h2>
      </div>
    );
  }

  if (myEvents.length === 0) {
    return (
      <div className="bg-base-200 py-20">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="heading-section mx-auto">Manage My Events</h2>
          <p className="heading-text max-w-2xl mx-auto mt-4">
            You haven't created any events yet.
          </p>
          <Link to="/create-event" className="btn btn-primary mt-8">
            Create Your First Event
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="heading-section mx-auto">Manage My Events</h2>
          <p className="heading-text max-w-2xl mx-auto">
            Update, edit, or delete the events you have created.
          </p>
        </div>

        <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Event Title</th>
                  <th>Location</th>
                  <th>Event Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myEvents.map((event) => {
                  const formattedDate = new Date(event.eventDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });

                  return (
                    <tr key={event._id} className="hover">

                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={event.thumbnail} alt={event.title} />
                            </div>
                          </div>
                          <div className="font-bold">{event.title}</div>
                        </div>
                      </td>

                      <td>{event.location}</td>

                      <td>{formattedDate}</td>

                      <td className="text-center">
                        <Link 
                          to={`/update-event/${event._id}`} 
                          className="btn btn-primary btn-sm"
                        >
                          <FaEdit />
                          Update
                        </Link>
                        <button 
                          onClick={() => handleDeleteEvent(event._id, event.title)}
                          className="btn btn-error btn-sm ml-2"
                        >
                          <FaTrash />
                          Delete
                        </button>
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

export default ManageEvents;