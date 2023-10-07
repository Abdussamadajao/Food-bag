import { Button, Drawer, DrawerProps, FloatButton, message } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { decrement, increment, removeFromCart } from "@/redux/slices/cartSlice";
import { urlFor } from "@/utils/sanity";
import Currency from "react-currency-formatter";

import Image from "next/image";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { TrashIcon } from "@heroicons/react/24/outline";
import Authentication from "../Authentication";
import getStripe from "@/utils/getStripe";

const CartIcon: React.FC<{ isDrawerOpen: boolean; onClose: any }> = ({
  isDrawerOpen,
  onClose,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const cartTotal = items.reduce(
    (total: number, item: any) => (total += item.price * item.count),
    0
  );


  const handleCheckOut = () => {
    if (!isAuth) {
      setIsModalOpen(true);
    } else {
      router.push("/checkout");
      onClose();
    }
  };

  return (
    <>
      <Drawer
        title={
          <div className='flex justify-between items-center'>
            <ShoppingBagIcon className='h-7 text-primary' />

            <h3 className='text-black font-pop font-medium text-[15px]'>
              {items.length} Item
              {items.length > 1 ? "s" : ""}
            </h3>
          </div>
        }
        closable={false}
        open={isDrawerOpen}
        width={600}
        onClose={onClose}>
        <div className='flex flex-col gap-[0px] max-h-[3000px] pt-[10px] mb-[100px] overflow-hidden'>
          {items.length === 0 ? (
            <div className='w-1/2 flex flex-col gap-[40px] items-center object-contain justify-center mx-auto'>
              <Image
                src={"/images/giphy.gif"}
                width={500}
                height={200}
                alt=''
              />
              <h1 className='text-dark-100 font-pop font-medium text-[20px]'>
                Cart is Empty
              </h1>
            </div>
          ) : (
            items.map((item: any) => {
              const { name, image, price, _id, count } = item;
              return (
                <div
                  className='flex py-2 text-sm hover:bg-gray-100 border-b last-of-type:border-0'
                  key={_id}>
                  <div className='object-cover flex items-center'>
                    <Image
                      src={urlFor(image).url()}
                      width={100}
                      height={100}
                      alt={name}
                    />
                  </div>
                  <div className='p-1 ml-2 w-[85%]'>
                    <p className='m-0 text-gray-600'>{name}</p>
                    <p className='mb-1 text-xs text-gray-400'>
                      <Currency quantity={price} currency='NGN' />
                    </p>
                    <div className='flex items-center justify-between text-sm font-normal'>
                      <div>
                        <Currency quantity={price * count} currency='NGN' />
                      </div>
                      <div className='p-1 bg-white border border-primary rounded-lg w-[30%] flex justify-between items-center'>
                        <button
                          onClick={() => dispatch(decrement(_id))}
                          className='flex justify-center items-center rounded-lg'>
                          <MinusIcon className='h-4 text-primary' />
                        </button>
                        <span>{count}</span>
                        <button
                          className='flex justify-center items-center rounded-lg'
                          onClick={() => {
                            dispatch(increment(_id));
                          }}>
                          <PlusIcon className='h-4 text-primary' />
                        </button>
                      </div>
                      <div>
                        <TrashIcon
                          className='h-5 text-primary cursor-pointer'
                          onClick={() => dispatch(removeFromCart({ _id }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className='mt-auto fixed bottom-0 w-[550px] py-2 bg-white'>
          <Button
            onClick={handleCheckOut}
            disabled={items.length === 0}
            className='custom-button justify-between '>
            <span className='text-lg text-white font-pop font-semibold'>
              Checkout
            </span>
            <div className='bg-white h-9 rounded-lg w-[200px] text-primary flex items-center justify-center'>
              <Currency quantity={cartTotal} currency='NGN' />
            </div>
          </Button>
        </div>
      </Drawer>

      <Authentication
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CartIcon;
