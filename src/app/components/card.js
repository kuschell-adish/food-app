'use client';

import React from "react";
import dayjs from 'dayjs';

import Button from '@/app/components/button';

export default function Card({order, handleCancelClick, handleCompleteClick}) {
    return (
            <div
              className={`p-4 rounded-lg bg-gray-50 flex flex-col h-full`}
              role="tabpanel"
            > 
              {order.status_id !== 1 && (
                <div className={` ${order.status_id === 2 ? 'bg-green-700' : 'bg-gray-700'} text-white rounded-full w-1/4 capitalize font-semibold text-xs p-1 px-2`}>{order.statuses.name}</div>
              )}
              <div className="flex flex-col sm:flex flex-row justify-between p-1 mt-2">
                <p className="font-semibold text-custom-red">Order #{order.id}</p>
                <p className="text-gray-500 text-xs">{dayjs(order.created_at).format('MMMM D, YYYY hh:mm A')}</p>
              </div>
              <div className="flex flex-col flex-1 p-1">
                <p className="capitalize">{order.sizes.name} Acai Bowl</p>
                <ul className="list-disc pl-5">
                  {order.order_toppings?.map((item, index) => (
                    <li key={index} className="capitalize">{item.toppings.name}</li>
                  ))}
                </ul>
              </div>
              {order.status_id === 1 && (
                <div className="flex flex-row justify-between mt-auto">
                  <Button 
                  label="Mark as Cancelled"
                  className="text-xs bg-gray-500 hover:bg-gray-600"
                  onClick={() => handleCancelClick(order.id)}
                  />
                  <Button 
                  label="Mark as Completed"
                  className="text-xs bg-green-700 hover:bg-green-800"
                  onClick={() => handleCompleteClick(order.id)} 
                  />
              </div>
              )}
            </div>
    )
}