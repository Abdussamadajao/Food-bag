import { useEffect, useState } from "react";
import { Select, Card as AntdCard } from "antd";
import Map from "@/public/images/Map_Two.svg";
import Food from "@/public/images/Fastfood.svg";
import Scooter from "@/public/images/Scooter.svg";
import sanityClient from "@/utils/sanity";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Card from "@/components/constants/Card";
import { CardType } from "@/utils/types";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";

export default function Home({
  location,
  categories,
}: InferGetServerSidePropsType<any>) {
  const [isAddressSet, setIsAddressSet] = useState<string>("");
  const [isGray, setIsGray] = useState<boolean>(true);
  const onChange = () => {
    setIsGray(false);
  };

  // useEffect(() => {
  //   localStorage.setItem("address", JSON.stringify(isAddressSet));
  // }, [isAddressSet]);

  return (
    <>
      <SEO title='Foodbag' />
      <main className=''>
        <Hero />
        <div className='lg:px-20 py-20 px-5 md:px-10 pb-[20px]'>
          <div className='flex flex-col gap-[10px] mb-[42px]'>
            <h4 className='text-xl font-medium text-primaryDark-100 font-pop'>
              Where are you?
            </h4>
            <Select
              className='custom-select'
              onChange={(value: any) => {
                onChange();
                setIsAddressSet(value);
              }}
              placeholder={"Enter your delivery address"}>
              {location.map((item: any) => (
                <Select.Option key={item._id} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className='flex flex-col gap-[20px] mb-[161px]'>
            <h4 className='text-xl font-medium text-primaryDark-100  font-pop'>
              Pick an interest
            </h4>
            {/**/}
            <div className='flex flex-col lg:flex-row gap-[10px]'>
              {categories.map((item: CardType) => (
                <Card isGray={isGray} data={item} key={item._id} />
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-[70px]'>
            <h1 className='text-center text-[20px] md:text-[30px] text-dark-100 font-semibold font-pop'>
              How we serve you
            </h1>
            <div className='flex flex-col md:flex-row justify-between items-center gap-[40px]'>
              <div className='flex flex-col items-center'>
                <Map />
                <div className='flex flex-col items-center '>
                  <h2 className='mb-[15px] text-[20px] md:text-[25px] text-dark font-medium font-pop'>
                    Tell us where you are
                  </h2>
                  <p className='md:w-[250px] w-[190px] text-center text-[18px] md:text-[20px] font-normal text-dark-200 '>
                    Select the location you want us to deliver.
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <Food />
                <div className='flex flex-col items-center '>
                  <h2 className='mb-[15px] text-[20px] md:text-[25px] text-dark font-medium font-pop'>
                    Tell us what you want
                  </h2>
                  <p className='md:w-[270px]  w-[190px] text-center text-[18px] md:text-[20px] font-normal text-dark-200 '>
                    Browse the type of food that interest you.
                  </p>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <Scooter />
                <div className='flex flex-col items-center '>
                  <h2 className='mb-[15px] text-[20px] md:text-[25px] text-dark font-medium font-pop'>
                    We’ll come running
                  </h2>
                  <p className='md:w-[270px] w-[190px] text-center text-[18px] md:text-[20px] font-normal text-dark-200 '>
                    Your order will be delivered to you in no time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const locationQuery = `*[_type == "location"]{
  _id,
  name
  }
  `;
  const location = await sanityClient.fetch(locationQuery);
  const query = ` *[_type == "featured"] | order(_createdAt asc) {
      _id,
     name,
     slug,
     image,
  short_description,
  restaurants[]
 }`;
  const categories = await sanityClient.fetch(query);
  return {
    props: {
      location,
      categories,
    },
  };
};
