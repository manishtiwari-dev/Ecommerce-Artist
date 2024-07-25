// import Razorpay from "razorpay";
import { NextResponse } from "next/server";


// const instance = new Razorpay({
//     key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
// });

export async function POST(req) {
    const { amount } = await req.json();

    console.log(amount);
    const parsedAmount = parseInt(amount);

    const options = {
        amount: parsedAmount,
        currency: "INR",
    };
   // const order = await instance.orders.create(options);
    const order = '';

    return NextResponse.json({
        success: true,
        order,
    });

}