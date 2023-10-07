import UserDetails from "@/components/EditDetails/UserDetails";
import SEO from "@/components/SEO";
import { Breadcrumb, Tabs, TabsProps } from "antd";
import React, { useState } from "react";

const UserDetail = () => {
  const [activeTab, setActiveTab] = useState("user-detail");
  const tabItems: TabsProps["items"] = [
    {
      key: "user-detail",
      label: <p className='label'>User Detail</p>,
      children: <UserDetails />,
    },
  ];

  return (
    <div className='lg:px-20 py-20 px-5 md:px-10 pb-5'>
      {" "}
      <Breadcrumb
        className='pt-[50px] pb-7'
        separator='.'
        items={[
          {
            title: "Home",
            href: "/",
          },
          {
            title: "Account Details",
          },
        ]}
      />
      <div className='flex flex-col lg:items-start'>
        <Tabs
          items={tabItems}
          activeKey={activeTab}
          onChange={(val) => setActiveTab(val)}
        />
      </div>
    </div>
  );
};

export default UserDetail;
