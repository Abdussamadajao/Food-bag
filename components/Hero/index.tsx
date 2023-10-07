import React, { useState } from "react";
import Particle from "@/utils/particle";

const Hero = () => {
  return (
    <>
      <Particle />
      <div className='flex justify-center bg-hero-image  flex-col items-center gap-[10px] mb-20 h-screen bg-no-repeat bg-center bg-cover'>
        <h1 className='md:text-9xl text-4xl font-extrabold text-white  font-pop'>
          Food<span className='text-primary'>Bag</span>
        </h1>
        <p className='md:text-2xl  text-xl font-normal text-white font-pop'>
          Anything food, we got you covered.
        </p>
      </div>
    </>
  );
};

export default Hero;
