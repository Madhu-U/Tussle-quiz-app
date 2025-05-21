"use client";

import { ScaleLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <ScaleLoader color='#fe7743' height={50} width={6} radius={4} />
    </div>
  );
}
