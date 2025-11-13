import React from "react";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-base-200 px-6 py-20">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-primary">
          404
        </h1>

        <h2 className="mt-4 text-4xl font-bold text-base-content">
          Page Not Found
        </h2>

        <p className="mt-4 text-lg text-base-content/70 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved, deleted, or you may have typed the URL incorrectly.
        </p>
        <Link to="/" className="btn btn-primary btn-lg mt-12">
          <FaHome className="mr-2" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
