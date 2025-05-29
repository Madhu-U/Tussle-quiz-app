"use client";
import { main } from "motion/react-client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const availableCategories = [
    "Geography",
    "Math",
    "General",
    "History",
    "Science",
    "Technology",
    "Gaming",
    "Mythology",
    "Literature",
  ];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [questionsCount, setQuestionsCount] = useState<number>(10);

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
    <main>
      <div className='px-8 w-[95%] mx-auto pt-12 flex flex-col gap-5 max-w-[1000px]'>
        <h1 className='font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase bg-gradient-to-br from-primary to-[#ff9564] text-transparent bg-clip-text'>
          Think Fast. <br />
          Score Hard. <br />
          Tussle!
        </h1>

        <ul className='text-foreground text-xl sm:text-2xl font-semibold font-heading text-right'>
          <li className=''>Choose your favorite categories.</li>
          <li className=''>Answer the questions.</li>
          <li className=''>Share the challenge.</li>
          <li className=' text-primary text-2xl sm:text-3xl mt-4 uppercase font-extrabold'>
            Who’ll come out on top?
          </li>
        </ul>
      </div>
      <div className='px-8 pt-8 min-h-screen flex flex-col gap-8 items-center '>
        <div className='gradient-primary text-foreground px-5 py-8 rounded-lg flex flex-col gap-3 text-center'>
          <h2 className=' text-xl uppercase '>Select Quiz Categories</h2>

          <div className=' flex gap-3 flex-wrap justify-center max-w-[600px]'>
            {availableCategories.map((category) => (
              <label key={category} className='cursor-pointer'>
                <input
                  type='checkbox'
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className='hidden peer'
                />
                <span
                  className=' rounded-lg px-4 py-2 text-foreground border-2 border-foreground font-medium
                hover:bg-foreground  hover:text-background-dark hover:border-foreground
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
        <div className='flex flex-col gap-5 items-center w-[400px]'>
          <h3 className='text-foreground italic '>Number of Questions</h3>
          <input
            type='range'
            min='5'
            max='15'
            value={questionsCount}
            onChange={(e) => setQuestionsCount(Number(e.target.value))}
            className='w-64 h-2 bg-foreground rounded-lg appearance-none cursor-pointer slider '
          />

          <p className='w-10 h-10 grid place-items-center text-foreground font-medium font-heading text-xl rounded-lg gradient-primary'>
            {questionsCount}
          </p>
        </div>

        <Link
          href={
            selectedCategories.length > 0
              ? `/quiz?categories=${categoryQueryString}&count=${questionsCount}`
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
              ? "gradient-primary hover:scale-105 active:scale-95 transition-all ease-in-out duration-200"
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
      </div>
    </main>
  );
}
