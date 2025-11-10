import React from "react";

const Gallery = () => {
  return (
    <section className="bg-base-100 py-20 md:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="heading-section">Our Community in Action</h2>
          <p className="heading-text">
            A glimpse into the successful road cleanups, tree plantations, and
            donation drives organized by our amazing users.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="col-span-2 row-span-2 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg"
              alt="A large group of volunteers planting trees"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.pexels.com/photos/3845544/pexels-photo-3845544.jpeg"
              alt="Volunteers cleaning a park"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg"
              alt="Volunteers sorting donation items"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.pexels.com/photos/6591427/pexels-photo-6591427.jpeg"
              alt="Close-up of hands planting a sapling"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.pexels.com/photos/7375631/pexels-photo-7375631.jpeg"
              alt="Volunteers smiling with trash bags after a road cleanup"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
