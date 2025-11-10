import React from "react";

const Banner = () => {
  return (
    <section className=" w-11/12 mx-auto my-0 bg-base-500 text-base-content">
      <div className="relative container mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left animate__animated animate__fadeInLeft">
            <h1 className="heading-banner">
              Your Community Needs You
            </h1>
            <p className="heading-text">
              Join local volunteers for road cleanups, tree plantations, and
              more. Or lead the change by creating your own event.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="/upcoming-events"
                className="btn-primary"
              >
                Find an Event
              </a>
              <a href="/create-event" className="btn-secondary">
                Create an Event
              </a>
            </div>
          </div>

          <div className="relative h-64 w-full md:h-80 lg:h-full animate__animated animate__fadeInRight animate__delay-1s">
            <img
              src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg"
              alt="A group of diverse volunteers planting a tree"
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover shadow-2xl"
            />
            <img
              src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg"
              alt="Volunteers sorting donations"
              className="absolute -bottom-10 -left-10 hidden h-48 w-48 rounded-2xl object-cover shadow-xl ring-4 ring-base-100 lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
