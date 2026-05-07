"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Space", href: "/" },
  { name: "Witness", href: "/witness" },
  { name: "Why I Draw", href: "/commission" },
  { name: "Blog", href: "/blog" },
  { name: "Participate", href: "/participate" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-2xl font-semibold text-gray-900 tracking-wide"
        >
          SKININK
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-800 hover:text-black transition-colors duration-200 font-medium"
            >
              {link.name}
            </Link>
          ))}

          {/* Highlighted Studio Button */}
          <Link
            href="/studio"
            className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            Studio
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="flex flex-col space-y-4 py-4 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-800 hover:text-black font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}

            {/* Highlighted Studio Button */}
            <Link
              href="/studio"
              onClick={() => setIsOpen(false)}
              className="bg-black text-white text-center px-5 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
            >
              Studio
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
