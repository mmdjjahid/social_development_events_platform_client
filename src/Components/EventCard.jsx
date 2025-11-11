import React from 'react';
import { Link } from 'react-router';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const EventCard = ({ event }) => {
  const { _id, title, thumbnail, location, eventType, eventDate } = event;

  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="card bg-base-100 shadow-xl transition-transform duration-300 hover:-translate-y-2">
      <figure className="h-56">
        <img 
          src={thumbnail} 
          alt={title} 
          className="h-full w-full object-cover" 
        />
      </figure>
      <div className="card-body">
        <div className="badge badge-primary mb-2">{eventType}</div>
        <h2 className="card-title h-14">
          {title.length > 50 ? title.substring(0, 50) + '...' : title}
        </h2>
        <div className="flex items-center gap-2 text-base-content/80">
          <FaMapMarkerAlt />
          <p>{location}</p>
        </div>

        <div className="flex items-center gap-2 text-base-content/80">
          <FaCalendarAlt />
          <p>{formattedDate}</p>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link to={`/events/${_id}`} className="btn btn-primary">
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;