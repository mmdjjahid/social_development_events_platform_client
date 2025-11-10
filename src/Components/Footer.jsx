import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
    return (
// Ensure you have react-icons installed: npm install react-icons
// Import these in your Footer.jsx file:
// import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

<footer className="bg-base-200 text-base-content">
<div className="bg-base-300 py-6 text-base-content text-sm">
  <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
    
    {/* Copyright */}
    <p>
      &copy; {new Date().getFullYear()} Social Events. All rights reserved.
    </p>
    
    {/* Relevant Links */}
    <div className="flex gap-6">
       <Link className="link link-hover">Create Event</Link>
       <Link className="link link-hover">Manage Events</Link>
       <Link className="link link-hover">Joined Events</Link>
    </div>
  </div>
</div>
</footer>
    );
};

export default Footer;