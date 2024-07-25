import qs from 'qs';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  // console.log(req);
  try {
    // const res = await req.body;
    // console.log(res);

    const parsedBody = qs.parse(res);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsedBody;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update order details in Laravel
      const response = await fetch('http://your-laravel-backend/api/update-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: razorpay_order_id,
          paymentId: razorpay_payment_id,
          status: 'paid',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order in Laravel');
      }

      const url = new URL(
        `/paymentsuccess/?orderID=${razorpay_order_id}`,
        req.nextUrl.origin
      );
      return NextResponse.redirect(url);
    } else {
      return NextResponse.json({ success: false }, { status: 400 });
    }
  } catch (e) {
    console.log("Error start ", e, "Error ends");
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
