import React, { useState, useEffect } from 'react';
import EventCard from '../../Components/EventCard';
import { useContext } from 'react';
import { AuthContext } from '../../Context/CreateContext';
import axiosInstance from '../../Axios/AxiosInstance';



const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const {setLoading, loading,} = useContext(AuthContext)
  const [isError, setIsError] = useState(null);

  const [type, setType] = useState('');
  const [search, setSearch] = useState(''); 
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true); 
      setIsError(null);  

      try {
        const response = await axiosInstance.get('/events', {
          params: {
            type: type,
            search: searchTerm,
          },
        });
        setEvents(response.data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setIsError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [type, searchTerm, setLoading]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(search);
  };

  const handleFilterChange = (e) => {
    setType(e.target.value);
    setSearchTerm(''); 
    setSearch('');
  };

  return (
    <div className="bg-base-200 py-20">
      <div className="container mx-auto max-w-7xl px-6">

        <div className="text-center mb-12">
          <h2 className="heading-section mx-auto">Upcoming Events</h2>
          <p className="heading-text max-w-2xl mx-auto">
            Find an event that matters to you. Search by name or filter by type.
          </p>
        </div>

        <form onSubmit={handleSearch} className="bg-base-100 p-6 rounded-lg shadow-md mb-12 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="form-control w-full md:col-span-2">
            <label className="label text-lg">Search by Event Name</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="e.g., Mirpur Cleanup" 
                className="input input-bordered w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label text-lg">Filter by Type</label>
            <select 
              className="select select-bordered w-full"
              value={type}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option>Cleanup</option>
              <option>Plantation</option>
              <option>Donation</option>
              <option>Food Drive</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>
        </form>

        <div>
          {loading && (
            <div className="text-center py-20">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}

          {isError && (
            <div className="text-center py-20">
              <p className="text-red-500">Error: Could not load events.</p>
            </div>
          )}

          {!loading && !isError && events.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold">No Events Found</h3>
              <p className="text-base-content/80 mt-2">
                Try adjusting your search or filter.
              </p>
            </div>
          )}

          {!loading && !isError && events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UpcomingEvents;