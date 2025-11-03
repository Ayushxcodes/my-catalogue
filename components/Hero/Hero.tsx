"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-11-03",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface HeroSlide {
  _id: string;
  title: string;
  paragraphs: string[];
  image: any;
}

const Hero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchSlides() {
      const data = await client.fetch(`*[_type == "heroSlide"]{
        _id, title, paragraphs, image
      }`);
      setSlides(data);
    }
    fetchSlides();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (slides.length ? (prev + 1) % slides.length : 0));
    }, 7000);
    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) return null;
  const slide = slides[current];

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-[80vh] bg-gray-50 overflow-hidden px-4 py-10">
      {/* Centered Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Live Images
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
          NUDITY IS REVEALING. PEOPLE SPEAK THEIR MIND WITHOUT INHIBITIONS WHEN
          THEY INSPIRE MY DRAWINGS WITH THEIR BARE COUNTENANCE.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl">
        {/* LEFT TEXT */}
        <div className="md:w-1/2 w-full p-6 md:p-10 flex flex-col items-center md:items-start text-center md:text-left">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide._id}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-5 leading-tight">
                {slide.title}
              </h2>
              <div className="text-base md:text-lg text-gray-700 mb-6 max-w-md leading-relaxed space-y-4">
                {slide.paragraphs?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                Explore Catalogue
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative md:w-1/2 w-full h-[250px] md:h-[70vh] flex items-center justify-center bg-white overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.image?.asset?._ref}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {slide.image && (
                <Image
                  src={urlFor(slide.image).width(800).url()}
                  alt={slide.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;
