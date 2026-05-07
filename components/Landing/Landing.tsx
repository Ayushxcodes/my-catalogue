"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import { PortableText } from "@portabletext/react";

// =====================
// 🔗 Sanity Setup
// =====================
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

// =====================
// 📘 Data Types
// =====================
interface LandingData {
  _id: string;
  title: string;
  content: any;
  image?: any;
}

// =====================
// 🎨 Component
// =====================
export default function Landing() {
  const [data, setData] = useState<LandingData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const result = await client.fetch(
        `*[_type == "landingSection"][0]{_id, title, content, image}`
      );
      setData(result);
    }
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="relative w-full py-20 px-6 md:px-10 flex justify-center overflow-hidden">
      {/* 🧠 NOTE: Background blur removed — main page already has it */}

      {/* 🌫️ Foreground content layer */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center md:items-start gap-12 bg-black/40 backdrop-blur-sm rounded-3xl p-10 shadow-2xl">
        {/* LEFT: Text */}
        <motion.div
          className="md:w-1/2 w-full flex flex-col justify-center space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
            {data.title}
          </h1>
          <div className="prose max-w-none text-lg text-gray-200 leading-relaxed">
            <PortableText value={data.content} />
          </div>
        </motion.div>

        {/* RIGHT: Image */}
        {data.image && (
          <motion.div
            className="md:w-1/2 w-full flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-lg h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={urlFor(data.image).width(1000).url()}
                alt={data.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
