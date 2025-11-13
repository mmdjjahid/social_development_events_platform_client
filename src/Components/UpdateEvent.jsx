
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from "react-toastify";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import { useContext } from 'react';
import { AuthContext } from '../Context/CreateContext';
import axiosInstance from '../Axios/AxiosInstance';

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const {user} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date());

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/events/${id}`);
        const data = response.data;

        setTitle(data.title);
        setThumbnail(data.thumbnail);
        setEventType(data.eventType);
        setLocation(data.location);
        setDescription(data.description);
        setEventDate(new Date(data.eventDate)); 
        
      } catch (error) {
        toast.error("Failed to load event data.");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedEvent = {
      title,
      thumbnail,
      eventType,
      location,
      description,
      eventDate,
    };

    try {
      
      const response = await axiosInstance.put(`/events/${id}`, updatedEvent);
      
      if (response.data.modifiedCount > 0) {
        toast.success("Event updated successfully!");
        navigate(`/manage-events/${user.email}`);
      } else {
        toast.error("No changes were made.");
      }
    } catch (error) {
      toast.error("Failed to update event.");
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-200 py-20">
      <div className="container mx-auto max-w-4xl px-6">

        <div className="text-center mb-12">
          <h2 className="heading-section mx-auto">Update Your Event</h2>
          <p className="heading-text max-w-2xl mx-auto">
            Make changes to your event and save.
          </p>
        </div>

        <form 
          onSubmit={handleUpdateEvent}
          className="bg-base-100 p-8 md:p-12 rounded-lg shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="form-control w-full md:col-span-2">
              <label className="label text-lg">Event Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full" 
                required 
              />
            </div>

            <div className="form-control w-full md:col-span-2">
              <label className="label text-lg">Thumbnail Image URL</label>
              <input 
                type="url" 
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="input input-bordered w-full" 
                required 
              />
            </div>

            <div className="form-control w-full">
              <label className="label text-lg">Event Type</label>
              <select 
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="select select-bordered w-full" 
                required
              >
                <option value="" disabled>Select event type</option>
                <option>Cleanup</option>
                <option>Plantation</option>
                <option>Donation</option>
                <option>Food Drive</option>
                <option>Education</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label text-lg">Event Date</label>
              <DatePicker
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                minDate={new Date()} 
                className="input input-bordered w-full" 
                dateFormat="MMMM d, y_yyy"
                required
              />
            </div>

            <div className="form-control w-full md:col-span-2">
              <label className="label text-lg">Location</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input input-bordered w-full" 
                required 
              />
            </div>


            <div className="form-control w-full md:col-span-2">
              <label className="label text-lg">Event Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered h-32 w-full" 
                placeholder="Share details about the event..."
                required
              ></textarea>
            </div>


            <div className="form-control w-full md:col-span-2 mt-6">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="loading loading-spinner"></span> : "Update Event"}
              </button>
            </div>
            
          </div>
        </form>

      </div>
    </div>
  );
};

export default UpdateEvent;