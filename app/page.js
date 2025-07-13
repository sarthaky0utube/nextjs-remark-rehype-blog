"use client";
import { Button } from "@/components/ui/button";
import Typed from "typed.js";
import React, { useRef, useEffect } from "react";

export default function Home() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Accounts",
        "Micro Economics",
        "Stats For Economics",
        "B.S.T",
        "English",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <main
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/your-bg.jpg')" }}
    >
      {/* Overlay with lower z-index */}
      <div className="absolute inset-0 z-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm"></div>

      {/* Content should be higher */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <span className="mb-4 px-4 py-1 rounded-full bg-gray-800/10 dark:bg-white/10 text-sm font-medium text-gray-800 dark:text-white">
          Learn Commerce the right way
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
          Welcome to <span className="text-primary">Commerce Zone</span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-900 dark:text-white">
          Learn <span ref={el} className="underline decoration-primary" />
        </h2>

        <p className="mt-6 max-w-2xl text-gray-700 dark:text-gray-300 text-lg">
          Confused about which subject to start with? We&apos;ve got you covered! Get
          simplified chapter-wise notes for Class 11 Commerce students for free.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <Button className="bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black">
            Explore Courses
          </Button>
          <Button variant="outline">Read Articles</Button>
        </div>

        {/* Stats Section */}
        <div className="flex gap-10 mt-12 text-gray-900 dark:text-white text-center bg-white/80 dark:bg-black/50 px-6 py-4 rounded-xl shadow-md backdrop-blur-sm">
          <div>
            <div className="text-2xl font-bold">50+</div>
            <div className="text-sm">Notes</div>
          </div>
          <div>
            <div className="text-2xl font-bold">100+</div>
            <div className="text-sm">Students</div>
          </div>
          <div>
            <div className="text-2xl font-bold">5.0</div>
            <div className="text-sm">Rating</div>
          </div>
        </div>
      </div>
      <section className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
              Our Subjects
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Everything you need to ace 11th grade commerce, completely free.
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            {/* Accounts Plan */}
            <div className="w-full p-4">
              <div className="p-6 h-64 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 text-center flex flex-col justify-center">
                <h3 className="text-2xl font-semibold">📊 Accounts</h3>
                <p className="mt-4">Master the fundamentals of accounting.</p>
                <Button
                  className="mx-auto mt-6 text-sm px-4 py-1 rounded-md"
                  variant="secondary"
                >
                  Start Learning
                </Button>
              </div>
            </div>

            {/* Micro Plan */}
            {/* Micro Economics Plan */}
            <div className="w-full sm:w-1/2 p-4">
              <div className="p-6 h-64 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 text-center flex flex-col justify-center">
                <h3 className="text-2xl font-semibold">🔬 Micro Economics</h3>
                <p className="mt-4">
                  Explore the principles of microeconomics.
                </p>
                <Button
                  className="mx-auto mt-6 text-sm px-4 py-1 rounded-md"
                  variant="secondary"
                >
                  Start Learning
                </Button>
              </div>
            </div>

            {/* Statistics Plan */}
            <div className="w-full sm:w-1/2 p-4">
              <div className="p-6 h-64 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 text-center flex flex-col justify-center">
                <h3 className="text-2xl font-semibold">📈 Statistics</h3>
                <p className="mt-4">
                  Understand data and statistical analysis.
                </p>
                <Button
                  className="mx-auto mt-6 text-sm px-4 py-1 rounded-md"
                  variant="secondary"
                >
                  Start Learning
                </Button>
              </div>
            </div>

            {/* Business Studies Plan */}
            <div className="w-full sm:w-1/2 p-4">
              <div className="p-6 h-64 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 text-center flex flex-col justify-center">
                <h3 className="text-2xl font-semibold">👔 Business Studies</h3>
                <p className="mt-4">
                  Learn the essentials of business and management.
                </p>
                <Button
                  className="mx-auto mt-6 text-sm px-4 py-1 rounded-md"
                  variant="secondary"
                >
                  Start Learning
                </Button>
              </div>
            </div>

            {/* English Plan */}
            <div className="w-full sm:w-1/2 p-4">
              <div className="p-6 h-64 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 text-center flex flex-col justify-center">
                <h3 className="text-2xl font-semibold">📚 English</h3>
                <p className="mt-4">
                  Improve your language and communication skills.
                </p>
                <Button
                  className="mx-auto mt-6 text-sm px-4 py-1 rounded-md"
                  variant="secondary"
                >
                  Start Learning
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
