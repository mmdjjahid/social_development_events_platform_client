import React from "react";

const Newsletter = () => {
  return (
    <section className="bg-base-100 py-20 md:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div
          className="rounded-2xl bg-gray-200
                  
                   p-12 text-primary-content shadow-xl md:p-16"
        >
          <div className="text-center">
            <h2 className="heading-section">Stay in the Loop</h2>
            <p className="heading-text">
              Subscribe to our newsletter to get weekly updates on new events,
              community stories, and volunteering opportunities near you.
            </p>

            <form className="mt-8 flex flex-col gap-3 items-center sm:flex-row sm:justify-center max-w-lg mx-auto">
              <div className="w-full sm:w-auto sm:flex-1">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full text-base-content"
                  required
                />
              </div>
              <button className="btn-secondary">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
