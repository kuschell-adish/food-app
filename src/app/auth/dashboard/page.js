'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

import Button from '@/app/components/button';

export default function Home() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [orders, setOrders] = useState([]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const tabMenus = ["All Orders", "Completed", "Cancelled"]; 

  useEffect(() => {
    async function fetchOrders() {
        let { data, error } = await supabase
          .from("orders")
          .select(`
              *,
              sizes(
                name
              ), 
              order_toppings(
                *,
                toppings(
                  name
                )
              )
          `);

        if (error) 
        {
            console.error(error);
        } else 
        {
            setOrders(data); 
        }
    }
    fetchOrders();
}, []);

console.log("orders", orders);

  return (
    <div className="p-5">
      <div className="flex flex-row gap-x-1 items-center mb-10">
            <img
            src="https://images.unsplash.com/vector-1739809596425-35fa340f2ab0?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="logo"
            className="h-8"
            />
            <p className="font-semibold text-custom-yellow md:text-lg tracking-wide">
            acai bowl co.
            </p>
      </div>
      <p>Logout</p>
      <div className="mb-4">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {tabMenus.map((tab,index) => (
            <li key={index} className="me-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-full ${
                activeTab === tab
                  && "bg-custom-red text-white"
              }`}
              onClick={() => handleTabChange(tab)}
              role="tab"
            >
              {tab}
            </button>
          </li>
          ))}
        </ul>
      </div>
      
      {/* all orders */}
      <div id="default-styled-tab-content">
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-4 text-sm">
          {orders.map((order, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg bg-gray-50 ${
                activeTab === "All Orders" ? "" : "hidden"
              } flex flex-col h-full`}
              role="tabpanel"
            >
              <div className="flex flex-row justify-between mb-4">
                <p className="font-semibold text-custom-red">#{order.id}</p>
                <p className="text-gray-500 text-xs">{order.date}</p>
              </div>
              <div className="flex flex-col flex-1 mb-4">
                <p className="capitalize">{order.sizes.name} Acai Bowl</p>
                <ul className="list-disc pl-5">
                  {order.order_toppings?.map((item, index) => (
                    <li key={index} className="capitalize">{item.toppings.name}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-row justify-between mt-auto">
                <Button 
                label={order.status_id === 1 ? "Mark as Cancelled" : "Cancelled"}
                className="text-xs bg-gray-500 hover:bg-gray-600"/>
                <Button 
                label={order.status_id === 1 ? "Mark as Completed" : "Completed"}
                className="text-xs bg-green-700 hover:bg-green-800" />
              </div>
            </div>
          ))}
        </div>
        
        {/* to fix in single page UI */}
        <div
          className={`p-4 rounded-lg bg-gray-50 ${
            activeTab === "Completed" ? "" : "hidden"
          }`}
          role="tabpanel"
        >
          <p className="text-sm text-gray-500">
            This is some placeholder content for the{" "}
            <strong className="font-medium text-gray-800">
              Completed tab's associated content
            </strong>
            .
          </p>
        </div>
        
        {/* to fix in single page UI */}
        <div
          className={`p-4 rounded-lg bg-gray-50 ${
            activeTab === "Cancelled" ? "" : "hidden"
          }`}
          role="tabpanel"
        >
          <p className="text-sm text-gray-500">
            This is some placeholder content for the{" "}
            <strong className="font-medium text-gray-800">
              Cancelled tab's associated content
            </strong>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
