"use client";

import { useRef, useState, useEffect } from "react";
import Counter from "../animations/Counter";

export default function Counters() {
  const counterRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState([false, false, false]);

  useEffect(() => {
    if (!counterRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay([true, false, false]);
          setTimeout(() => setPlay([true, true, false]), 750);
          setTimeout(() => setPlay([true, true, true]), 1500);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(counterRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex justify-around flex-wrap gap-4 w-full">
      <div
        className="flex flex-col items-center justify-center border px-4 py-7 rounded-box bg-base-300 shadow-xl flex-1"
        ref={counterRef}
      >
        <h3 className="text-xl text-center">Serveurs</h3>
        <Counter
          value={play[0] ? 130 : 0}
          places={[100, 10, 1]}
          fontSize={60}
          padding={5}
          gap={10}
          textColor="white"
          fontWeight={900}
          gradientFrom="transparent"
        />
      </div>
      <div
        className="flex flex-col items-center justify-center border px-4 py-7 rounded-box bg-base-300 shadow-xl flex-1"
        ref={counterRef}
      >
        <h3 className="text-xl text-center">Membres</h3>
        <Counter
          value={play[1] ? 125 : 0}
          places={[100, 10, 1]}
          fontSize={60}
          padding={5}
          gap={10}
          textColor="white"
          fontWeight={900}
          gradientFrom="transparent"
        />
      </div>
      <div
        className="flex flex-col items-center justify-center border px-4 py-7 rounded-box bg-base-300 shadow-xl flex-1"
        ref={counterRef}
      >
        <h3 className="text-xl text-center">Blacklists</h3>
        <Counter
          value={play[2] ? 30 : 0}
          places={[100, 10, 1]}
          fontSize={60}
          padding={5}
          gap={10}
          textColor="white"
          fontWeight={900}
          gradientFrom="transparent"
        />
      </div>
    </div>
  );
}
