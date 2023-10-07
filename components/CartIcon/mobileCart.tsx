import React, { useState } from "react";
import { Button, Drawer } from "antd";
import Currency from "react-currency-formatter";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { decrement, increment, removeFromCart } from "@/redux/slices/cartSlice";
import { urlFor } from "@/utils/sanity";
import { TrashIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import Image from "next/image";
import Authentication from "../Authentication";

const MobileCart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const { isAuth } = useAppSelector((state) => state.auth);
  const [isdrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
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
      setIsDrawerOpen(false);
    }
  };
  return (
    <>
      <Authentication
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className='md:hidden block fixed bottom-0 px-3 z-[1000] py-4 w-full'>
        <Button onClick={() => setIsDrawerOpen(true)} className='cart-button'>
          <h1 className='shadow-lg px-2 py-1 text-white text-lg font-extrabold font-pop'>
            {items.length}
          </h1>
          <span className='text-white flex-1 font-extrabold text-lg font-pop'>
            View Basket
          </span>
          <h3 className='text-white font-extrabold text-lg font-pop'>
            {" "}
            <Currency quantity={cartTotal} currency='NGN' />
          </h3>
        </Button>
      </div>

      <Drawer
        // closable={false}
        open={isdrawerOpen}
        width={600}
        height={560}
        className='custom-drawer'
        onClose={() => setIsDrawerOpen(false)}
        placement={"bottom"}>
        <div className='flex flex-col gap-[20px] max-h-[3000px] px-2 pt-[10px] mb-[100px] overflow-hidden'>
          {items.length === 0 ? (
            <div className='w-full flex mt-16 flex-col gap-[40px] items-center object-contain justify-center mx-auto'>
              <Image
                src={"/images/giphy.gif"}
                width={200}
                height={200}
                alt=''
              />
              <h1 className='text-dark-100 font-pop font-extrabold text-2xl'>
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
                    <div className='flex items-center justify-between text-sm font-normal font-pop'>
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

        <div className='mt-auto mx-auto fixed bottom-0 w-full p-2 bg-white'>
          <Button
            onClick={handleCheckOut}
            disabled={items.length === 0}
            className='custom-button'>
            <span className='text-lg text-white font-pop font-semibold'>
              Checkout
            </span>
            <div className='bg-white h-9 rounded-lg w-[200px] text-primary flex items-center justify-center'>
              <Currency quantity={cartTotal} currency='NGN' />
            </div>
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default MobileCart;
