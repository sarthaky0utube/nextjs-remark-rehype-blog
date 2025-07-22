"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./theme-btn";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setProgress(20);
    setTimeout(() => setProgress(40), 100);
    setTimeout(() => setProgress(100), 400);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setProgress(0), 50);
  }, []);

  const isHome = pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-20 border shadow-xl transition-all duration-300 rounded-br-xl rounded-bl-xl  ${
        isHome && !scrolled
          ? "bg-white/10 dark:bg-black/10"
          : "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <LoadingBar
        color="#933ce6"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container mx-auto flex justify-evenly items-center px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/">
          <div className="text-2xl font-extrabold tracking-tight text-primary">
            Study Point
          </div>
        </Link>
        <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
          <Link
            href="/"
            className="hover:text-primary transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-primary transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="hover:text-primary transition-colors duration-200"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors duration-200"
          >
            Contact
          </Link>
          <ModeToggle />
        </div>
        <div className="hidden">
          <ModeToggle />
          <Sheet className="[z-999]">
            <SheetTrigger>
              <svg
                className="w-6 h-6 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-[80%] p-6">
              <SheetHeader>
                <div className="font-bold text-xl mb-4">Menu</div>
                <SheetDescription>
                  <div className="flex flex-col gap-4 text-base">
                    <Link
                      href="/"
                      className="hover:text-primary transition-colors duration-200"
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="hover:text-primary transition-colors duration-200"
                    >
                      About
                    </Link>
                    <Link
                      href="/blog"
                      className="hover:text-primary transition-colors duration-200"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/contact"
                      className="hover:text-primary transition-colors duration-200"
                    >
                      Contact
                    </Link>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
