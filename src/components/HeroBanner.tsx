import React from "react";

const HeroBanner = () => (
  <div className="flex flex-col justify-center items-start h-full p-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl text-white max-w-lg w-full animate-fadeIn">
    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to Your Next Adventure!</h1>
    <p className="text-lg mb-6 opacity-90">Create your account and join a vibrant community. Enjoy exclusive features and a seamless experience.</p>
    <img
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      alt="Modern Hero Banner"
      className="rounded-2xl shadow-xl w-full object-cover max-h-56 border-4 border-white/30"
    />
  </div>
);

export default HeroBanner; 