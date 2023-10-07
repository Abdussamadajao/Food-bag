import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  message,
} from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  Cart,
  decrement,
  increment,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import Currency from "react-currency-formatter";
import Image from "next/image";
import { urlFor } from "@/utils/sanity";
import { TrashIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import SEO from "@/components/SEO";
import getStripe from "@/utils/getStripe";

const Checkout = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const cartTotal = items.reduce(
    (total: number, item: any) => (total += item.price * item.count),
    0
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const total = cartTotal + 1200;


  return (
    <>
      <SEO title={`Foodbag | Checkout`} />
      <div className='pt-[150px] pb-20  md:px-10 lg:px-20 px-5 justify-between flex flex-col-reverse md:flex-row gap-[60px] md:gap-[30px]'>
        <div className='flex flex-col gap-[20px] md:w-[60%] md:max-h-[700px] overflow-hidden'>
          <div className='flex flex-col'>
            <h1 className='text-[30px] font-pop font-medium '>Verification</h1>
            <span className='text-primary text-base font-pop font-normal'>
              Confirm address & Payment
            </span>
          </div>
          <Form layout='vertical' className='custom-form'>
            <Row gutter={18}>
              <Col span={24} className='flex justify-between flex-row '>
                <div className='flex flex-col mb-5'>
                  <h1 className='text-[20px] font-pop font-medium '>
                    Delivery Address
                  </h1>
                  <p className='text-base font-pop font-normal '>
                    Your order will be delivered to your address
                  </p>
                </div>
                <Form.Item name={"haveBookedWithProviderBefore"}>
                  <Radio />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='first_name' label='First Name'>
                  <Input className='custom-input' />
                </Form.Item>
              </Col>{" "}
              <Col span={24}>
                <Form.Item name='last_name' label='Last Name'>
                  <Input className='custom-input' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='email' label='Email'>
                  <Input type='email' className='custom-input' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name='phone'
                  label='Phone Number'
                  className='custom-phone'>
                  <PhoneInput
                    country={"ng"}
                    inputClass='phone-input'
                    countryCodeEditable={false}
                    autoFormat={false}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name='payment-method' label='Payment method'>
                  <Select className='custom-select'>
                    <Select.Option>Card</Select.Option>
                    <Select.Option>Transfer</Select.Option>
                    <Select.Option>Pay on delivery</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Button
                  onClick={() => setIsOpen(true)}
                  //@ts-ignore
                  type=' '
                  className='w-full bg-primary h-12 text-white capitalize font-bold font-pop text-lg '>
                  proceed to checkout
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className='border md:w-[40%] px-2 py-4 flex flex-col rounded-lg h-full'>
          <h1 className='pb-3'>Order</h1>

          <div className='h-full flex flex-col justify-between'>
            <div className='border max-h-[430px] overflow-auto mb-[40px]'>
              {items.length === 0 ? (
                <div className='py-5 px-2 mx-auto flex justify-center'>
                  <Image
                    src={"/images/giphy.gif"}
                    width={200}
                    height={500}
                    alt=''
                  />
                </div>
              ) : (
                items.map((item: Cart) => {
                  const { name, image, price, _id, count } = item;
                  return (
                    <div
                      className='flex p-2 text-sm hover:bg-gray-100'
                      key={_id}>
                      <div className=' object-cover flex items-center'>
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

            <div className='flex flex-col px-5 border bg-gray-50 h-[110px] justify-center'>
              <div className='flex justify-between'>
                <span className='text-primaryDark-100 text-lg font-medium font-pop'>
                  Subtotal
                </span>
                <span className='text-primaryDark-100 text-lg font-medium font-pop'>
                  <Currency quantity={cartTotal || 0} currency='NGN' />
                </span>
              </div>
              <div className='flex justify-between pb-2'>
                <span className='text-primaryDark-100 text-lg font-medium font-pop'>
                  Delivery Fee
                </span>
                <span className='text-primaryDark-100 text-lg font-medium font-pop'>
                  <Currency quantity={1200} currency='NGN' />
                </span>
              </div>
              <div className='border-t border-gray-300'>
                <div className='flex justify-between pb-2'>
                  <span className='text-primaryDark text-xl font-pop font-bold'>
                    Total
                  </span>
                  <span className='text-primaryDark text-xl font-pop font-bold'>
                    <Currency quantity={total} currency='NGN' />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ComingSoon isModalOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Checkout;

const ComingSoon: React.FC<{ isModalOpen: boolean; onClose: any }> = ({
  isModalOpen,
  onClose,
}) => {
  const router = useRouter();
  return (
    <Modal open={isModalOpen} footer={false} onCancel={onClose}>
      <div className='flex justify-center items-center flex-col'>
        <Image
          src={"/images/comminsoon.gif"}
          width={200}
          height={200}
          alt='hello'
        />
        <Button
          //@ts-ignore
          type=''
          className='flex bg-primary w-[200px] items-center justify-center text-white font-pop text-xl font-bold '
          onClick={() => router.push("/")}>
          Go back home
        </Button>
      </div>
    </Modal>
  );
};
