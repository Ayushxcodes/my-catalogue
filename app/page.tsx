"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Transition } from "@headlessui/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Landing from "@/components/Landing/Landing";
import Hero from "@/components/Hero/Hero";

// =====================
// 📘 Sanity Data Types
// =====================
type CatalogueItem = {
  _id: string;
  title: string;
  description: string;
  image?: any;
};

type RainbowItem = {
  _id: string;
  title: string;
  artist?: string;
  description?: string;
  image?: any;
};

// =====================
// 🧠 Fetch Functions
// =====================
async function getCatalogue(): Promise<CatalogueItem[]> {
  return client.fetch(`
    *[_type == "catalogueItem"]{
      _id,
      title,
      description,
      image
    }
  `);
}

async function getRainbowPaintings(): Promise<RainbowItem[]> {
  return client.fetch(`
    *[_type == "rainbowPainting"]{
      _id,
      title,
      artist,
      description,
      image
    }
  `);
}

// =====================
// 🎞️ Animation Variants
// =====================
const paragraphVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// =====================
// 🎨 Main Component
// =====================
export default function CataloguePage() {
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CatalogueItem | null>(null);
  const [rainbowItems, setRainbowItems] = useState<RainbowItem[]>([]);
  const [selectedRainbow, setSelectedRainbow] = useState<RainbowItem | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      const [catalogueData, rainbowData] = await Promise.all([
        getCatalogue(),
        getRainbowPaintings(),
      ]);
      setItems(catalogueData);
      setRainbowItems(rainbowData);
    }
    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center bg-gray-50">
      {/* 1️⃣ Landing Section */}
      <Landing />

      {/* 2️⃣ Private Space for Public Nudity */}
      <section className="w-full bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-6 text-justify leading-relaxed text-base md:text-lg">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-center text-black mb-10 tracking-wide"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            PRIVATE SPACE FOR PUBLIC NUDITY
          </motion.h2>

          {[
            "Nudity is not the end of the exercise but the beginning. It’s a ticket to enter this space that I call ‘private space for public nudity’.",
            "In this space, I represent society, or the rest of the world, therefore dressed. In this space, we interact as energies, engagement is sought, sketch is capturing this engagement in bold lines. Trust is the basis of engagement and nudity is not, therefore, a state of being, but a dynamic process of unlearning.",
            "Anonymity and privacy guaranteed, for it doesn’t matter who my subjects are, their attributes, but the energy they bring to the engagement. Therefore, I don’t draw what I see, but what I feel.",
            "Paradoxical it is, I ask my subjects to experience solitude in my company, in this space, for we are different, closer to our inherent self, when we are not performing, securely secluded in a room, and naked. Society and seclusion are sought at the same time in this private space for public nudity.",
            "Also to witness in the way they have constructed themselves, entwined with complex identities, many manifestations of ego, for social consumption. So, here, in this space, they don’t represent themselves, they just exist.",
            "Trust in self, and me help my subject reconcile this paradoxical situation. This experiment has no fixed agenda, time frame, and is open to possibilities.",
          ].map((text, i) => (
            <motion.p
              key={i}
              variants={paragraphVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
              className="text-black"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </section>

      {/* 3️⃣ Hero Section */}
      <Hero />

      {/* 4️⃣ Live Drawing Section */}
      <section className="w-full max-w-7xl p-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-black tracking-tight">
          LIVE DRAWING
        </h1>

        <div className="max-w-3xl mx-auto mb-10">
          <p className="italic text-gray-700 text-base md:text-lg leading-relaxed text-center md:text-left">
            “Naked people speak their mind without inhibitions while inspiring
            my drawings. There comes a time, when my subjects are not conscious
            of their nudity like they are not conscious of their clothing
            (clothes and food make their presence felt in their absence). Nudity
            is the process that sets in an interesting psychology. My subjects
            feel I know everything about them because I have seen them naked,
            therefore, don’t feel the need to hide anything. They speak about
            things in this space that they wouldn’t otherwise.”
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {items.map((item) => (
            <div
              key={item._id}
              className="relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => setSelectedItem(item)}
            >
              {item.image && (
                <div className="w-full aspect-square relative">
                  <Image
                    src={urlFor(item.image).width(800).height(800).url()}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5️⃣ Live Drawing Modal */}
      <Modal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        titleField="title"
        descField="description"
      />

      {/* 6️⃣ Rainbow Existence Section (Same UI as Live Drawing) */}
      <section className="w-full max-w-7xl p-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
          RAINBOW EXISTENCE
        </h1>

        <div className="max-w-3xl mx-auto mb-10">
          <p className="italic text-gray-700 text-base md:text-lg leading-relaxed text-center md:text-left">
            “If sketches are what I feel in the moments of engagement, paintings
            are an outcome of what happens to you because of these engagements.
            Something shifts in me, insightful in a different way, sometimes
            overwhelmed, for a strong engagement is akin to love. To vent out
            pent up emotions I paint for hours, restlessly, briskly, with high
            libido, playing with colours.”
          </p>
        </div>

        {/* Same grid layout as Live Drawing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {rainbowItems.map((painting) => (
            <div
              key={painting._id}
              className="relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => setSelectedRainbow(painting)}
            >
              {painting.image && (
                <div className="w-full aspect-square relative">
                  <Image
                    src={urlFor(painting.image).width(800).height(800).url()}
                    alt={painting.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7️⃣ Rainbow Modal (Same as Live Drawing Modal) */}
      <Modal
        item={selectedRainbow}
        onClose={() => setSelectedRainbow(null)}
        titleField="title"
        descField="description"
        extraField="artist"
      />
    </main>
  );
}

// =====================
// 📦 Modal Component
// =====================
function Modal({
  item,
  onClose,
  titleField,
  descField,
  extraField,
}: {
  item: any;
  onClose: () => void;
  titleField: string;
  descField: string;
  extraField?: string;
}) {
  if (!item) return null;

  return (
    <Transition
      show={!!item}
      appear
      as="div"
      className="fixed inset-0 flex justify-center items-center z-50"
    >
      <Transition.Child
        as="div"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute inset-0 backdrop-blur-md bg-black/30"
        onClick={onClose}
      />
      <Transition.Child
        as="div"
        enter="transition transform duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition transform duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="relative bg-white rounded-2xl w-[90vw] h-[90vh] max-w-[1400px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
          <div className="md:w-1/2 w-full h-1/2 md:h-full relative bg-gray-50">
            <Image
              src={urlFor(item.image).url()}
              alt={item[titleField]}
              fill
              className="object-contain"
            />
          </div>
          <div className="md:w-1/2 w-full h-1/2 md:h-full p-8 overflow-y-auto text-gray-800">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
              {item[titleField]}
            </h2>
            {extraField && item[extraField] && (
              <p className="italic text-gray-700 mb-4">{item[extraField]}</p>
            )}
            <p className="leading-relaxed text-gray-800 text-justify">
              {item[descField]}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Transition.Child>
    </Transition>
  );
}
