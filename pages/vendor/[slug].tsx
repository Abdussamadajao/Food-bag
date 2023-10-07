import sanityClient, { urlFor } from "@/utils/sanity";
import { CardType, Dish, restaurantType } from "@/utils/types";
import { Breadcrumb } from "antd";
import Dishes from "@/components/DishRow/Dishes";
import CartIcon from "@/components/CartIcon";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import MobileCart from "@/components/CartIcon/mobileCart";
import React from "react";
import SEO from "@/components/SEO";

const Vendor = ({
  vendor: restaurant,
}: InferGetServerSidePropsType<GetStaticProps>) => {
  const router = useRouter();

  console.log();
  return (
    <>
      <SEO title={`Foodbag | Vendor`} />
      <MobileCart />
      <div className='py-20 md:px-10 px-5 lg:px-20'>
        <Breadcrumb
          className='pt-[50px]'
          separator='.'
          items={[
            {
              title: "Home",
              href: "/",
            },
            {
              title: <a onClick={() => router.back()}>Vendors</a>,
            },
            {
              title: "Vendor",
            },
          ]}
        />
        <div
          key={restaurant._id}
          className='flex flex-col gap-[40px] border-b last-of-type:border-0 pb-[90px] mt-[33px] '>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-[15px]'>
              <div className='relative w-[50px] h-[50px] border border-dark rounded-full  flex items-center justify-center'>
                {restaurant.image && (
                  <img
                    src={urlFor(restaurant.image && restaurant?.image).url()}
                    alt={restaurant?.name}
                  />
                )}
              </div>
              <h4 className='text-[20px] font-medium font-pop text-black '>
                {restaurant.name}
              </h4>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px]'>
            {restaurant.dishes?.map((dish: Dish) => (
              <Dishes dish={dish} key={dish._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendor;

export const getStaticPaths = async () => {
  const query = ` *[_type == "restaurant"]{
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
  const query = `*[_type == "restaurant" && slug.current == $slug][0] {
    name,
    image,
    dishes[]->,
    type->{name}
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
