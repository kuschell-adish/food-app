import { database } from "@/app/lib/firebaseConfig";
import { ref, get, push, set, update } from "firebase/database";

export async function GET() {
    try {
        const ordersRef = ref(database, "orders");

        const snapshot = await get(ordersRef);

        let data = null; 

        if (snapshot.exists()) {
            data = snapshot.val();
        } else {
            data = [];
        }

        const orders = data
        ? Object.keys(data).map(key => ({
            id: key,  
            ...data[key] 
        }))
        : [];

        return new Response(
            JSON.stringify(orders), 
            { status: 200 }
        );
          
        
    } catch (error) {
        console.error("error fetching data:", error);

        return new Response(
            JSON.stringify({
                data: [],
                error: "error fetching data",
            }),
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try{
        const requestBody = await req.json();

        const {orderNumber, size, toppings, price, date} = requestBody; 

        const orderData = {
            orderNumber,
            size,
            toppings,
            price,
            date,
            status: "pending", 
        };

        const orderRef = ref(database, "orders");
        const newOrderRef = push(orderRef);
        await set(newOrderRef, orderData);

        return new Response(
            JSON.stringify({ id: newOrderRef.key, ...orderData }),
            { status: 201 } 
        );
    }
    catch (error) {
        console.error("error fetching data:", error);

        return new Response(
            JSON.stringify({
                error: "error posting data",
            }),
            { status: 500 }
        );
    }
}

//to use in CRUD functionality
export async function PUT(req) {
    try {
        const { orderId} = await req.json();

        const orderRef = ref(database, `orders/${orderId}`);
        await update(orderRef, { status: "completed" });

        return new Response(
            JSON.stringify({ message: "order status updated" }),
            { status: 200 }
        );
    }
    catch (error) {
        console.error("error fetching data:", error);

        return new Response(
            JSON.stringify({
                error: "error posting data",
            }),
            { status: 500 }
        );
    }
}
