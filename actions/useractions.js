"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();

  //fetch the secret of the user who is getting the payment
  let user=await User.findOne({username: to_username})
  const secret = user.razorpaysecret

  var instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });


  // Defines the parameters for creating the payment order.
  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);

  //create a payment object which shows pending payment

  await Payment.create({
    oid: x.id,
    amount: amount/100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });

  return x;
};

export const fetchuser = async (username) => {
  await connectDb();
  let u = await User.findOne({ username: username }).lean();
  if (!u) {
    console.log("User not found");
    return null;
  }
  console.log("FETCHUSER");

  return {
    ...u,
    _id: u._id.toString(),
  };
};

export const fetchpayments = async (username) => {
  await connectDb();
  let p = await Payment.find({ to_user: username , done:true }).sort({ amount: -1 }).limit(6).lean();

  if (!p) {
    console.log("No payments found");
    return [];
  }
  console.log("FETCHPAYMENTS");

  p = p.map((payment) => ({
    ...payment,
    _id: payment._id.toString(),
    oid: payment.oid ? payment.oid.toString() : null,
  }));

  return p;
};

export const updateProfile = async (data, oldusername) => {
  await connectDb();
  let ndata = Object.fromEntries(data);
  //If the username is being updated check if user name is available
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username already exists" };
    }
    await User.updateOne({email:ndata.email} , ndata)
    //Now update all the usernames in the Payments table
    await Payment.updateMany({to_user:oldusername},{to_user: ndata.username})

  }else{
    await User.updateOne({email:ndata.email} , ndata)
  }

};
