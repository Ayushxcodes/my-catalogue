"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [textHeight, setTextHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateHeight = () => {
      if (textRef.current) {
        setTextHeight(textRef.current.offsetHeight);
      }
      setIsDesktop(window.innerWidth >= 768);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const desktopHeight = isDesktop ? textHeight * 1.05 : "auto";

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 pt-20 md:pt-10 pb-16 gap-10 bg-white text-black overflow-hidden">
      {/* Left Side — Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-start"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ height: desktopHeight }}
      >
        <motion.img
          src="/profile.avif"
          alt="Mihir Srivastava"
          className="w-full h-auto md:h-full max-h-[700px] object-cover rounded-2xl shadow-xl grayscale hover:grayscale-0 transition duration-500"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Right Side — Text */}
      <motion.div
        ref={textRef}
        className="md:w-1/2 w-full space-y-5 leading-relaxed text-justify"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center md:text-left uppercase tracking-wide">
          About Me
        </h1>

        <p>
          I, though professionally identify myself as a journalist,
          existentially I like to fancy myself as undefined, a bit unformed. My
          outlines are blurred. I’m, therefore, everything in some measure, and
          nothing in particular.
        </p>

        <p>
          I have worked for more than two decades in leading national weeklies
          and delved into a wide spectrum of subjects that includes politics,
          environment, wildlife, and investigative journalism—which essentially
          entails getting more time and resources to do a story.
        </p>

        <p>
          I’m curious about people, what they do and why, to experience their
          unqualified self, sheds light into my own being. Writing and drawing
          are tools to capture the essence of people and our times.
        </p>

        <p>
          A journalist at heart, I make a living poking my nose in other’s
          affairs. I co-founded and edit{" "}
          <a
            href="https://vyakti.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            vyakti.co.in
          </a>{" "}
          in which I write about people to understand the world we inhabit, how
          we came here, and where we are heading at an express speed!
        </p>

        <p>
          In this quagmire of a dynamic world, a Vyakti (or an individual) is a
          good reference point–for is the change and the change agent as well.
        </p>

        <p>
          I have a few books to my credit (
          <span className="italic">Love Jihadi</span> and{" "}
          <span className="italic">Conversations In The Nude</span>); some are
          in the pipeline.
        </p>

        <p>
          Beyond writing, I have also ventured into documentary filmmaking. I
          love travelling to places and living like a native; therefore, more
          often than not, I don’t visit places but people.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
