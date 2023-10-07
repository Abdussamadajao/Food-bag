import React from "react";
import Twitter from "@/public/icons/twitter.svg";
import YouTube from "@/public/icons/youtube.svg";
import Facebook from "@/public/icons/facebook-f.svg";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  return (
    <div className='md:px-20 px-5 pb-20 pt-20'>
      <div className='border-t'>
        <div className='flex flex-col md:mt-[81px] mt-[30px] gap-[47px]'>
          <div className='flex flex-col justify-center items-center gap-[30px]'>
            <h1 className='text-[18px] text-dark-200 font-pop font-medium leading-normal'>
              Contact us
            </h1>
            <div className='flex items-center text-2xl text-primary justify-center gap-[30px]'>
              <AiFillInstagram />
              <FaFacebookF />
              <IoLogoWhatsapp />
            </div>
          </div>
          <div className='flex justify-between items-center flex-col md:flex-row gap-[30px]'>
            <div className='flex items-center gap-[5px]'>
              <Link
                href='/'
                className='text-[18px] text-dark-200 font-pop font-normal'>
                Terms & Conditions
              </Link>
              {" . "}
              <Link
                href='/'
                className='text-[18px] text-dark-200 font-pop font-normal'>
                Privacy Policy
              </Link>
            </div>
            <span className='text-[18px] text-center text-dark-200 font-pop font-normal'>
              © Copyright {new Date().getFullYear()} FoodBag is a registered
              trademark
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
