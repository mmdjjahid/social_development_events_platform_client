import React, { useContext, useState} from "react";
import DatePicker from "react-datepicker";
import {useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Context/CreateContext";
import { toast } from "react-toastify";
import axiosInstance from "../../Axios/AxiosInstance";

const CreateEvent = () => {
  const [eventDate, setEventDate] = useState(new Date());
  const { user, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const creatorEmail = user.email

  const handleCreateEvent = async (e)=>{
    e.preventDefault();
    setLoading(true)
    const title = e.target.title.value;
    const thumbnail = e.target.thumbnail.value;
    const eventType = e.target.eventType.value;
    const location = e.target.location.value;
    const description = e.target.description.value;

    const newEvent = {
      title,
      thumbnail,
      eventType,
      location,
      description,
      eventDate,
      creatorEmail,
    };
    console.log(newEvent)
    try {
      const response = await axiosInstance.post('/events', newEvent);
      
      if (response.data.insertedId) {
        toast.success("Event Created Successfully!");
        navigate("/upcoming-events");
      } else {
        toast.error("Failed to create event. Please try again.");
      }

    } catch (error) {
      // console.error("Create event error:", error);
      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }


  }
  return (
    <div className="bg-base-200 py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <h2 className="heading-section ">Create a New Event</h2>
          <p className="heading-text">
            Fill out the form below to post your social service event.
          </p>
        </div>

        <fieldset className="fieldset bg-gray-200 border-gray-300 rounded-box border p-4">
          <legend className="fieldset-legend">Create Event</legend>
          <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full md:col-span-2">
              <label className="label text-lg">Event Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Mirpur 10 Road Cleanup"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full md:col-span-2">
              <label className="label text-lg">Thumbnail Image URL</label>
              <input 
                type="url" 
                name="thumbnail"
                placeholder="https://example.com/image.jpg" 
                className="input input-bordered w-full" 
                required 
              />
            </div>

            <div className="form-control w-full">
              <label className="label text-lg">Event Type</label>
              <select 
                name="eventType"
                className="select select-bordered w-full" 
                defaultValue=""
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
              <br />
              <DatePicker
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                minDate={new Date()}
                className="input input-bordered w-full" 
                dateFormat="MMMM d, yyyy"
                required
              />
            </div>


            <div className="form-control w-full md:col-span-2">
              <label className="label text-lg">Location</label>
              <input 
                type="text" 
                name="location"
                placeholder="e.g., Hossainpur, Kishoreganj" 
                className="input input-bordered w-full" 
                required 
              />
            </div>


            <div className="form-control w-full md:col-span-2">
              <label className="label text-lg">Event Description</label>
              <textarea 
                name="description"
                className="textarea textarea-bordered h-32 w-full" 
                placeholder="Share details about the event, what to bring, and who to contact..."
                required
              ></textarea>
            </div>

            <button className="btn-primary ">Create Event</button>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default CreateEvent;
