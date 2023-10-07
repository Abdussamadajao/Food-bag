import Link from "next/link";
import React, { useState } from "react";
import { Badge, Button, Dropdown, Menu, message } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { logUserOut, logout } from "@/redux/slices/authSlice";
import Authentication from "@/components/Authentication";
import { useRouter } from "next/router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartIcon from "../CartIcon";
import Avatar from "../constants/Avatar";
import { account } from "@/utils/appwrite";

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isAuth, currentUser } = useAppSelector((state) => state.auth) as any;
  const { items } = useAppSelector((state) => state.cart);
  const [headerColorChange, setHeaderColorChange] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const onScroll = () => {
    if (window.scrollY >= 80) {
      setHeaderColorChange(true);
    } else {
      setHeaderColorChange(false);
    }
  };
  window.addEventListener("scroll", onScroll);
  const setTransparnt =
    router.pathname === "/"
      ? `${headerColorChange ? "bg-white" : "bg-transparent"}`
      : "bg-white";

  const setTextColor =
    router.pathname === "/"
      ? ` ${headerColorChange ? "text-black" : "text-white"}`
      : "text-black";

  let name: string = currentUser?.name;

  const userSignOut = async () => {
    dispatch(logUserOut());
  };

  const showCart = router.pathname === "/" ? "hidden" : "hidden md:block";

  const menu = (
    <Menu>
      <Menu.Item key='1' onClick={() => router.push("/user-details")}>
        Account Details
      </Menu.Item>
      <Menu.Item key='2' onClick={userSignOut}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className={`
        fixed
        top-0
        left-0
        w-full
        py-[20px]
        shadow-sm
        lg:px-20
        md:px-10
        px-5
        flex
        items-center
        justify-between
         z-[1000]
         ${setTransparnt}
         `}>
      <Link href='/'>
        <h1
          className={`font-pop text-[25px] font-bold text-black ${setTextColor}`}>
          Food<span className='text-primary'>Bag</span>
        </h1>
      </Link>
      <div className=' flex items-center gap-[50px]'>
        <Badge count={items.length} className={`${showCart}`}>
          {" "}
          <span
            onClick={() => setIsDrawerOpen(true)}
            className={` items-center text-lg flex cursor-pointer  ${setTextColor}`}>
            {" "}
            Cart
            <AiOutlineShoppingCart size={20} />
          </span>{" "}
        </Badge>

        {!isAuth ? (
          <Button
            // @ts-ignore
            type={""}
            onClick={() => setIsModalOpen(true)}
            className='border  border-primary px-4 py-2 w-[100px] h-[40px] rounded-[5px] hover:border-primary  flex items-center bg-transparent justify-center'>
            <span className='text-primary text-[16px] font-pop font-medium'>
              Join
            </span>
          </Button>
        ) : (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className='flex items-center'>
              <span
                className={`text-sm font-normal font-pop pr-2 ${setTextColor}`}>
                {name}
              </span>
              <div className='border-primary border rounded-full'>
                <Avatar name={name} saturation='90' />
              </div>
            </div>
          </Dropdown>
        )}
      </div>

      <CartIcon
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <Authentication
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Header;
