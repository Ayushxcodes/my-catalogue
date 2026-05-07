"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface CatalogueItem {
  _id: string;
  title: string;
  description: string;
  image?: any;
}

const CatalogueGrid = () => {
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<CatalogueItem | null>(null);

  // 🧠 Fetch data from Sanity on mount
  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(`
        *[_type == "catalogueItem"] | order(_createdAt desc) {
          _id,
          title,
          description,
          image
        }
      `);
      setItems(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center tracking-tight">
        LIVE DRAWING
      </h1>

      {/* Intro Paragraph */}
      <div className="max-w-3xl mx-auto mb-8">
        <p className="italic text-gray-700 text-base md:text-lg leading-relaxed text-center md:text-left">
          “Naked people speak their mind without inhibitions while inspiring my
          drawings. There comes a time, when my subjects are not conscious of
          their nudity like they are not conscious of their clothing. Nudity is
          the process that sets in an interesting psychology. My subjects feel I
          know everything about them because I have seen them naked, therefore,
          don’t feel the need to hide anything. They speak about things in this
          space that they wouldn’t otherwise.”
        </p>
      </div>

      {/* 🖼️ Grid of images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {items.map((item) => (
          <div
            key={item._id}
            className="relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            onClick={() => setSelectedItem(item)}
          >
            <div className="w-full aspect-square relative">
              {item.image && (
                <Image
                  src={urlFor(item.image).width(800).height(800).url()}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🪞 Modal Popup */}
      <Transition
        show={!!selectedItem}
        appear
        as="div"
        className="fixed inset-0 flex justify-center items-center z-50"
      >
        {/* Background Blur */}
        <Transition.Child
          as="div"
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute inset-0 backdrop-blur-md bg-black/30"
          onClick={() => setSelectedItem(null)}
        />

        {/* Modal Content */}
        <Transition.Child
          as="div"
          enter="transition transform duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition transform duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {selectedItem && (
            <div className="relative bg-white rounded-2xl w-[90vw] h-[90vh] max-w-[1400px] max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl">
              {/* Left: Image */}
              <div className="md:w-1/2 w-full h-1/2 md:h-full relative bg-gray-50 flex items-center justify-center">
                {selectedItem.image && (
                  <Image
                    src={urlFor(selectedItem.image).width(1200).url()}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              {/* Right: Content */}
              <div className="md:w-1/2 w-full h-1/2 md:h-full p-8 overflow-y-auto text-gray-800">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  {selectedItem.title}
                </h2>

                <div className="space-y-4 leading-relaxed text-justify text-gray-700">
                  {selectedItem.description
                    ?.split(". ")
                    .filter(Boolean)
                    .map((sentence, idx) => {
                      const trimmed = sentence.trim();
                      const endsWithPeriod = trimmed.endsWith(".");
                      return (
                        <p key={idx}>
                          {trimmed}
                          {!endsWithPeriod ? "." : ""}
                        </p>
                      );
                    })}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-colors duration-200"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </Transition.Child>
      </Transition>
    </div>
  );
};

export default CatalogueGrid;
