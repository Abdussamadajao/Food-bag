import React, { useEffect } from "react";
import { Breadcrumb, Button } from "antd";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import sanityClient, { urlFor } from "@/utils/sanity";
import { CardType, restaurantType } from "@/utils/types";
import Image from "next/image";
import DishRow from "@/components/DishRow";
import CartIcon from "@/components/CartIcon";
import Link from "next/link";
import MobileCart from "@/components/CartIcon/mobileCart";
import SEO from "@/components/SEO";

const Vendors = ({
  vendor,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  const restaurants = vendor.restaurants;
  return (
    <>
      <SEO title={`Foodbag | Vendors`} />
      <div className='lg:px-20 py-20 px-5 md:px-10 pb-5'>
        <Breadcrumb
          className='pt-[50px]'
          separator='.'
          items={[
            {
              title: "Home",
              href: "/",
            },
            {
              title: "Vendors",
            },
          ]}
        />

        <div className='flex flex-col mt-[33px] gap-[28px]'>
          <h1 className='text-black font-pop font-medium text-[30px]'>
            All Vendors
          </h1>

          {restaurants?.map((restaurant: restaurantType) => (
            <div
              key={restaurant._id}
              className='flex flex-col gap-[40px] border-b last-of-type:border-0 pb-[90px]'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-[15px]'>
                  <div className='relative w-[50px] h-[50px] flex items-center justify-center border border-dark rounded-full'>
                    <Image
                      width={100}
                      height={50}
                      src={urlFor(restaurant.image).url()}
                      alt={restaurant.name}
                    />
                  </div>
                  <h4 className='text-[20px] font-medium font-pop text-black '>
                    {restaurant.name}
                  </h4>
                </div>
                {restaurant.dishes.length <= 4 && (
                  <Link
                    href={`/vendor/${restaurant.slug.current}`}
                    className='text-primary text-base font-pop cursor-pointer'>
                    View all
                  </Link>
                )}
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px]'>
                {restaurant.dishes
                  ?.filter((_, i) => i < 4)
                  ?.map((dish) => (
                    <DishRow dish={dish} key={dish._id} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <MobileCart />
    </>
  );
};

export default Vendors;

export const getStaticPaths = async () => {
  const query = ` *[_type == "featured"]{
      _id,
     slug{
     current
     },
 }`;

  const vendors = await sanityClient.fetch(query);
  const paths = vendors.map((vendor: CardType) => ({
    params: {
      slug: vendor.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: ({ params }: { params: any }) => Promise<
  | { redirect: string }
  | {
      revalidate: number;
      props: { vendor: any };
    }
> = async ({ params }) => {
  const query = `*[_type == "featured" && slug.current == $slug][0] {
    restaurants[]->{
    ...,
    dishes[]->,
    type->{
    name
    }
    }
    }`;

  const vendor = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!vendor) {
    return {
      redirect: "/",
    };
  }

  return {
    props: {
      vendor,
    },
    revalidate: 60,
  };
};
