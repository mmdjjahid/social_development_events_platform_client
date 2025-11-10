import React from "react";

const Feature = () => {
  return (
    <section className="bg-base-200 py-20 md:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="heading-section">Our Features</h2>
          <p className="heading-text">
            A complete platform to organize, find, and manage social development
            events in your local community.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="card bg-base-100 shadow-lg text-center transition-transform duration-300 hover:-translate-y-2">
            <div className="card-body items-center p-8">
              <div className="rounded-full bg-primary p-4 text-primary-content"></div>
              <h3 className="card-title text-2xl font-semibold mt-4">
                Create Events
              </h3>
              <p className="mt-2 text-base-content/80">
                Have an idea for a cleanup or plantation drive? Easily create
                and post your own social events for the community to join.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg text-center transition-transform duration-300 hover:-translate-y-2">
            <div className="card-body items-center p-8">
              <div className="rounded-full bg-primary p-4 text-primary-content"></div>
              <h3 className="card-title text-2xl font-semibold mt-4">
                Find & Join Events
              </h3>
              <p className="mt-2 text-base-content/80">
                Search for upcoming events in your area. Filter by type, like
                "Cleanup" or "Plantation," and join with a single click.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg text-center transition-transform duration-300 hover:-translate-y-2">
            <div className="card-body items-center p-8">
              <div className="rounded-full bg-primary p-4 text-primary-content"></div>
              <h3 className="card-title text-2xl font-semibold mt-4">
                Manage & Track
              </h3>
              <p className="mt-2 text-base-content/80">
                Keep track of all the events you've created or joined. Update
                your event details from your personal dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
