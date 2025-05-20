"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const availableCategories = ["Geography", "Math", "General"];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Function to handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const categoryQueryString = selectedCategories.join(",");

  return (
    <main className='px-8 pt-12 min-h-screen flex flex-col gap-8 items-center'>
      <h1 className='text-3xl font-semibold text-center text-foreground '>
        Welcome to the Quiz App
      </h1>
      <div className='bg-primary text-foreground px-5 py-8 rounded-lg flex flex-col gap-3 text-center'>
        <h2 className='text-xl uppercase '>Select Quiz Categories</h2>

        <div className='flex gap-3 flex-wrap'>
          {availableCategories.map((category) => (
            <label key={category} className='cursor-pointer'>
              <input
                type='checkbox'
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className='hidden peer'
              />
              <span
                className='rounded-lg px-4 py-2 text-foreground border-2 border-foreground
                hover:bg-foreground hover:font-medium hover:text-background-dark hover:border-foreground
                peer-checked:bg-background-dark peer-checked:font-medium peer-checked:text-foreground peer-checked:border-background-dark inline-block
                transition-all ease-in-out duration-200
              '
              >
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Link
        href={
          selectedCategories.length > 0
            ? `/quiz?categories=${categoryQueryString}`
            : "#"
        }
        onClick={(e) => {
          if (selectedCategories.length === 0) {
            e.preventDefault();
          }
        }}
        aria-disabled={selectedCategories.length === 0}
        className={`px-6 py-3 uppercase font-heading tracking-widest text-foreground rounded-lg transition-colors ease-in-out duration-200 ${
          selectedCategories.length > 0
            ? "bg-primary  hover:scale-105 active:scale-95 transition-all ease-in-out duration-200"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Start Quiz
      </Link>
      {selectedCategories.length === 0 && (
        <p className='text-center text-primary font-semibold italic text-sm'>
          Please select at least one category
        </p>
      )}
    </main>
  );
}
