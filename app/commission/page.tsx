"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const paragraphs = [
  "I’m existentially bored, a sort of ennui, this hobby keeps me sane and going. I get solace in painting/sketching as I relive my subjects in substantial measure, an artistic engagement that allows me to document humanity in all its rawness.",
  "Nudity is the process of unlearning, that makes my subject vulnerable enough, to realise, living vulnerabilities is a sure way to empowerment. They start tentatively, and when they get used to their unabashed self, they confront me with their bareness, and I draw frantically, my lines dig deep on paper, whirring in the process. This engagement is joyous.",
  "I’m interested in people and the simplicity of their complexities, and love to engage with them, their universality in their individuality. Existentially, we’re essentially similar, however, the mix of the complex identities, tryst with destiny, experiences we gather, shape the ‘me’ in us. The burden of self is onerous and there’s always a need to mix with the all-encompassing whole.",
  "Nudity is revealing. Not just to my subject but also to me, as an experience, I get to know myself better with every sketching session.",
];

const WhyIDraw = () => {
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

  const desktopHeight = isDesktop ? textHeight * 1.4 : "auto";

  return (
    <div className="flex flex-col md:flex-row items-start justify-between p-8 gap-8 bg-white text-black overflow-hidden">
      {/* Left: Image */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center items-center rounded-lg overflow-hidden"
        style={{ height: desktopHeight }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img
          src="/potrait.avif"
          alt="Why I Draw"
          className="w-full h-auto md:h-full object-cover rounded-lg"
        />
        <p className="text-sm text-gray-500 mt-3 italic md:hidden text-center">
          Photo: Raul Irani
        </p>
      </motion.div>

      {/* Right: Text */}
      <motion.div
        ref={textRef}
        className="md:w-1/2 w-full space-y-5 text-gray-900"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-bold mb-4 tracking-tight"
          variants={itemVariants}
        >
          Why I Draw
        </motion.h1>

        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            className="text-justify leading-relaxed"
            variants={itemVariants}
          >
            {p}
          </motion.p>
        ))}

        <motion.div variants={itemVariants} className="mt-6">
          <a
            href="/contact"
            className="inline-block px-6 py-3 border border-black text-black rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.p
          className="hidden md:block text-sm text-gray-500 mt-4 italic"
          variants={itemVariants}
        >
          Photo: Raul Irani
        </motion.p>
      </motion.div>
    </div>
  );
};

export default WhyIDraw;
