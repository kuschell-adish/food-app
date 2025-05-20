import { useEffect } from 'react';
import { supabase } from "@/app/lib/supabaseClient";

const useOrdersRealtime = ({
  fetchOrders,
  setOrders,
  setCompletedOrders,
  setCancelledOrders
}) => {
  useEffect(() => {
    const refetchAllOrders = () => {
      fetchOrders(null, setOrders);
      fetchOrders(2, setCompletedOrders);
      fetchOrders(3, setCancelledOrders);
    };

    const channel = supabase
      .channel('realtime:orders')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders',
        },
        (payload) => {
          console.log("new order:", payload);
          refetchAllOrders();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
        },
        (payload) => {
          const oldStatus = payload.old.status_id;
          const newStatus = payload.new.status_id;

          if (oldStatus !== newStatus) {
            console.log("status changed: ", payload);
            refetchAllOrders();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
};

export default useOrdersRealtime;
