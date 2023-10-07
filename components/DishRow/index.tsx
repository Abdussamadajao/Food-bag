import React from "react";
import { urlFor } from "@/utils/sanity";
import Currency from "react-currency-formatter";
import { Dish } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import Disable from "@/public/icons/disable.svg";
import Image from "next/image";
import { Card } from "antd";
const DishRow: React.FC<{ dish: Dish }> = ({
  dish: { name, price, image, _id },
}) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state: RootState) => state.cart);

  const addItemToCart = () => {
    const item = { name, price, image, _id };
    dispatch(addToCart(item));
  };
  const product = items.find((item: any) => item._id === _id);
  const removeItemFromCart = () => {
    dispatch(removeFromCart({ _id }));
  };
  return (
    <>
      {/* <Card
        hoverable={true}
        cover={
          <div className='bg-gray-100 py-2 pl-20'>
            <div className='relative object-contain px-10 max-w-[150px] h-[150px] py-2'>
              <Image src={urlFor(image).url()} alt={name} fill />
            </div>
          </div>
        }
        actions={[
          <>
            {product ? (
              <button
                onClick={removeItemFromCart}
                className='w-[138px] h-[40px] bg-dark-200 rounded flex items-center justify-center gap-[8px]'>
                <Disable />
                <span className='text-white text-[16px] font-pop font-medium'>
                  Remove
                </span>
              </button>
            ) : (
              <button
                onClick={addItemToCart}
                className='border border-primary w-[138px] h-[40px] hover:border-primary bg-white rounded'>
                <span className='text-primary text-[16px] font-pop font-medium'>
                  Add to Cart
                </span>
              </button>
            )}
          </>,
        ]}>
        <div className='flex items-start justify-between mb-5'>
          <p className='text-base font-medium font-pop'>{name}</p>
          <span className='text-base font-medium font-pop'>
            <Currency quantity={price} currency='NGN' />
          </span>
        </div>
      </Card> */}

      <div className='flex flex-col border gap-[20px] w-full justify-between h-full hover:shadow-xl transition duration-200 ease-linear pb-5 rounded-lg'>
        <div className=''>
          <div className='bg-gray-100 py-2 pl-20'>
            <div className='relative object-contain px-10 max-w-[150px] h-[150px] py-2'>
              <Image src={urlFor(image).url()} alt={name} fill />
            </div>
          </div>
          <div className='flex items-start justify-between px-2'>
            <p className='text-base font-medium font-pop'>{name}</p>
            <span className='text-base font-medium font-pop'>
              <Currency quantity={price} currency='NGN' />
            </span>
          </div>
        </div>

        <div className='px-2'>
          {product ? (
            <button
              onClick={removeItemFromCart}
              className='w-[138px] h-[40px] bg-dark-200 rounded flex items-center justify-center gap-[8px]'>
              <Disable />
              <span className='text-white text-[16px] font-pop font-medium'>
                Remove
              </span>
            </button>
          ) : (
            <button
              onClick={addItemToCart}
              className='border border-primary w-[138px] h-[40px] hover:border-primary bg-white rounded'>
              <span className='text-primary text-[16px] font-pop font-medium'>
                Add to Cart
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DishRow;
