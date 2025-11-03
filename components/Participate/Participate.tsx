"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

interface ParticipateProps {
  title: string;
  text: string;
  imageSrc: string;
  buttonText?: string;
  buttonLink?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const ParticipateComponent: React.FC<ParticipateProps> = ({
  title,
  text,
  imageSrc,
  buttonText = "Contact Me",
  buttonLink = "/contact",
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [textHeight, setTextHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateHeight = () => {
      if (textRef.current) setTextHeight(textRef.current.offsetHeight);
      setIsDesktop(window.innerWidth >= 768);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Make desktop height larger
  const desktopHeight = isDesktop ? Math.max(textHeight * 1.4, 500) : "auto";

  return (
    <div
      className={`flex flex-col md:flex-row items-start justify-between gap-8 px-8 md:px-16 ${
        isDesktop ? "pt-30 min-h-[80vh]" : "pt-8"
      }`}
    >
      {/* Left Side: Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center rounded-lg overflow-hidden"
        style={{ height: desktopHeight }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </motion.div>

      {/* Right Side: Text */}
      <motion.div
        ref={textRef}
        className="md:w-1/2 w-full space-y-6 text-gray-900"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          variants={itemVariants}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-justify text-lg md:text-xl leading-relaxed"
          variants={itemVariants}
        >
          {text}
        </motion.p>
        <motion.div variants={itemVariants} className="mt-6">
          <a
            href={buttonLink}
            className="inline-block px-6 py-3 border border-black text-black rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold"
          >
            {buttonText}
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ParticipateComponent;
