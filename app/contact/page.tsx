"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  AiOutlineMail,
  AiOutlineInstagram,
  AiOutlineWeiboSquare,
} from "react-icons/ai";

const ContactMe = () => {
  const contactInfo = [
    {
      icon: <AiOutlineMail size={24} className="text-blue-600" />,
      label: "Email",
      value: "srivastavamihir@gmail.com",
      link: "mailto:srivastavamihir@gmail.com",
    },
    {
      icon: <AiOutlineInstagram size={24} className="text-pink-500" />,
      label: "Instagram",
      value: "@srivastavamihir",
      link: "https://www.instagram.com/srivastavamihir/",
    },
    {
      icon: <AiOutlineWeiboSquare size={24} className="text-green-500" />,
      label: "Vyakti",
      value: "https://vyakti.co.in",
      link: "https://vyakti.co.in",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-start justify-between p-8 gap-12">
      {/* Left Side: Optional Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-start rounded-lg overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/profile.avif" // Replace with your image
          alt="Mihir Srivastava"
          className="w-full h-auto md:h-[80vh] object-cover rounded-lg"
        />
      </motion.div>

      {/* Right Side: Contact Info */}
      <motion.div
        className="md:w-1/2 w-full flex flex-col justify-start space-y-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl font-bold mb-4">Say Hello</h1>
        <p className="text-gray-700">
          I’m Mihir Srivastava, a journalist and documenter of humanity. Feel
          free to reach out through any of the channels below.
        </p>

        <div className="flex flex-col gap-6 mt-6">
          {contactInfo.map((info, idx) => (
            <motion.a
              key={idx}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div>{info.icon}</div>
              <div className="flex flex-col">
                <span className="font-semibold">{info.label}</span>
                <span className="text-gray-600">{info.value}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactMe;
