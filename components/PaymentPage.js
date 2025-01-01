"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchpayments, fetchuser, initiate } from "@/actions/useractions";
// import { useSession,session } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notFound } from "next/navigation";
// import { useRouter } from "next/router";

const PaymentPage = ({ username }) => {
  // const {data: session} = useSession()
  const [paymentform, setPaymentform] = useState({name: "", message: "", amount: ""});
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const SearchParams = useSearchParams();
  // const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (SearchParams.get("paymentdone") == "true") {
      toast(`🦄 Payment Successful to ${username} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    // router.push(`/${username}`);
  }, []);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    console.log("GETDATA FETCHUSER");
    let u = await fetchuser(username);
    setcurrentUser(u);
    console.log(u);

    console.log("GETDATA FETCHPAYMENTS");
    let dbPayments = await fetchpayments(username);
    setPayments(dbPayments);
    console.log(dbPayments);
  };

  const pay = async (amount) => {
    //Get the orderId
    let a = await initiate(amount, username, paymentform);

    let orderId = a.id;

    var options = {
      key: currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me A Chai", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover w-full relative">
        <img
          className="object-cover w-full h-48 md:h-[350px]"
          src={currentUser.coverpic}
          alt=""
        />
        <div className="absolute bottom-[-35px] right-[38%] md:right-[46%] border-2 border-white rounded-full size-20 overflow-hidden">
          <img
            className="rounded-full object-cover size-20"
            src={currentUser.profilepic}
            alt=""
          />
        </div>
      </div>

      <div className="info flex justify-center items-center my-20 flex-col gap-2">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">Let's help {username} get a chai!</div>
        <div className="text-slate-400">
          {payments.length} Payments . ₹{payments.reduce((a,b)=> a+b.amount , 0)} raised
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
            {/* Show list of all the supporters as a leaderboard. */}
            <h2 className="text-2xl font-bold"> Top 6 Supporters</h2>
            <ul className="mx-5 text-lg">
              {payments.length == 0 && <li>No payments yet</li>}

              {payments.map((p, i) => {
                return (
                  <li className="my-4 flex gap-2 items-center">
                    <img width={30} src="avatar.gif" alt="user avatar" />
                    <span>
                      {p.name} donated{" "}
                      <span className="font-bold">{p.amount}</span> with a
                      message : {p.message}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex flex-col gap-2">
              {/* Input for name and message  */}
              <input
                onChange={handleChange}
                value={paymentform.name}
                type="text"
                name="name"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Name"
              />
              <input
                onChange={handleChange}
                value={paymentform.message}
                type="text"
                name="message"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
              />

              <input
                onChange={handleChange}
                value={paymentform.amount}
                type="text"
                name="amount"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
              />

              <button
                onClick={() => {
                  pay(Number.parseInt(paymentform.amount) * 100);
                }}
                type="button"
                disabled={
                  paymentform.name?.length < 2 ||
                  paymentform.message?.length < 4 || paymentform.amount?.length<1
                }
                className="text-white w-28 bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:from-yellow-300"
              >
                Pay
              </button>
            </div>

            {/* Or choose from these amounts */}
            <div className="flex flex-col md:flex-row gap-2 mt-5">
              <button
                className="bg-slate-800 p-3 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-300 "
                onClick={() => pay(1000)}
              >
                Pay ₹10
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg "
                onClick={() => pay(2000)}
              >
                Pay ₹20
              </button>
              <button
                className="bg-slate-800 p-3 rounded-lg"
                onClick={() => pay(3000)}
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
