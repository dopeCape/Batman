"use client";
import getSymbolFromCurrency from "currency-symbol-map";
import loader from "../../../public/svg/Rolling-1s-200px.svg";
import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { auth } from "@/firebase";
import { useRouter } from "next/router";
import { getUserCountry } from "@/utils/utils";
import axios from "axios";
import Image from "next/image";

function LongForm() {
  if (!process.env.NEXT_PUBLIC_STRIPE_KEY)
    throw new Error("Missing missing stripe publishable key");

  const [value, setValue] = useState<number[]>([10000]);
  const [price, setPrice] = useState<number>(19);
  const [multiplyer, setMultiplyer] = useState<number>(1);
  const [words, setWords] = useState<number>(10000);
  const [loading, setLoadin] = useState<boolean>(true);
  const [country, setCountry] = useState<string>("USD");
  const [symbol, setSymbol] = useState<string>("$");
  const [token, setToken] = useState<number>(100);
  const router = useRouter();
  async function convertFromUsd(to: string, price: number) {
    try {
      const res = await axios.post("/api/convertFromUsd", {
        price: price,
        to: to,
      });
      setMultiplyer(res.data.rate);
      setLoadin(false);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSliderChange = (value: number | number[]) => {
    handlePriceChange(value);
    if (Array.isArray(value)) {
      setValue(value);
    }
  };

  useEffect(() => {
    let x = async () => {
      const countryCode = await getUserCountry();
      setCountry(countryCode);
      if (countryCode != "USD") {
        const re = await convertFromUsd(countryCode, price);
        const symbol = getSymbolFromCurrency(countryCode);
        setSymbol(symbol);
      }
    };
    x();
  }, []);

  const makePayment = async () => {
    try {
      if (auth.currentUser) {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
        const data = {
          tokens: token,
          prices: country == "INR" ? price * multiplyer : price,
          words: words,
        };
        const body = {
          products: data,
          country: country == "INR" ? "INR" : "USD",
          userId: auth.currentUser?.uid,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await fetch("/api/payments/stripe", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        });

        const session = await response.json();

        if (stripe) {
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          if (result.error) {
            console.log(result.error);
          }
        }
      }
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  const PaymentHandler = () => {
    auth.currentUser ? makePayment() : router.push("/auth/signup");
  };

  const handlePriceChange = (value: number | number[]) => {
    if (value == 10000) {
      setPrice(19);
      setWords(10000);
      setToken(100);
    } else if (value == 20000) {
      setPrice(79);
      setWords(50000);
      setToken(500);
    } else if (value == 30000) {
      setPrice(149);
      setWords(100000);
      setToken(1000);
    } else if (value == 40000) {
      setPrice(279);
      setWords(200000);
      setToken(2000);
    } else if (value == 50000) {
      setPrice(599);
      setWords(500000);
      setToken(5000);
    }
  };

  const railStyle = {
    backgroundColor: "#e5e7eb",
    height: 5,
  };

  const handleStyle = {
    backgroundColor: "#374151",
    border: "none",
    borderRadius: 20,
    width: 40,
    height: 25,
    marginLeft: -0,
    marginTop: -10,
    zIndex: 100,
    outline: "none",
    "&:focus, &:hover": {
      outline: "none",
    },
  };

  const trackStyle = {
    backgroundColor: "#4A5568",
    height: 5,
  };

  const styleDot = {
    backgroundColor: "blue",
  };
  return (
    <div className="flex flex-col w-[500px] h-[100%] py-10 pb-20 items-center rounded-3xl border-[#6969ee] border-[1px] ">
      {/* <div className='flex flex-col h-[100%] py-10 mx-3 my-10 pb-20 items-center rounded-[40px] border-[#6969ee] border-[3px]'> */}
      <div className="flex flex-col w-[100%] items-center ">
        <h1 className="text-[#101827] font-bold text-3xl">Long-form</h1>
        <p className="font-medium py-2 text-[#4b5563] text-[23px] w-[60%] text-center ">
          For bloggers, freelancers & businesses
        </p>
        <p className="w-[65%] text-[#838995] text-[20px] text-center font-medium">
          Awesome tools to help you write blog posts, books, and more.
        </p>
        {loading ? (
          <div className="w-[50%] h-[20%] mt-[35%]">
            <Image
              src={loader}
              alt="loading.."
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="flex flex-col h-[400px] items-center">
            <div className="pt-20 pb-10 flex flex-col gap-y-2">
              <h1 className="text-5xl text-[#101827] font-bold flex">
                <span
                  dangerouslySetInnerHTML={{ __html: symbol }}
                  className="mr-1 "
                />
                {(price * multiplyer).toLocaleString("en-IN") + ".00"}
              </h1>
            </div>
            <div className="flex text-[#374151] mb-5 text-[14px] gap-x-[180px] mt-5">
              <p>{words.toLocaleString("en-IN")}</p>
              <p>5,00,000</p>
            </div>
            <div className="flex w-[90%] items-center justify-center">
              <Slider
                range
                defaultValue={[0]}
                min={10000}
                max={50000}
                step={null}
                railStyle={railStyle}
                handleStyle={[handleStyle, handleStyle]}
                trackStyle={[trackStyle, trackStyle]}
                onChange={handleSliderChange}
                marks={{
                  10000: "10k",
                  20000: "50k",
                  30000: "100k",
                  40000: "200k",
                  50000: "500k",
                }}
                dotStyle={styleDot}
              />
            </div>
            <div className="flex items-center gap-x-2 py-20 flex-col">
              <p className="text-[#101827] font-bold text-xl">
                {token.toLocaleString("en-IN")} Tokens
              </p>
              <p className="text-[#101827] font-bold text-xl">
                {words.toLocaleString("en-IN")} Words
              </p>
            </div>
          </div>
        )}
      </div>
      {!loading && (
        <div
          onClick={PaymentHandler}
          className=" cursor-pointer text-[20px] font-bold bg-[#705cf6] text-white p-5 px-10 rounded-[10px] relative top-10 "
        >
          Buy Tokens
        </div>
      )}
    </div>
  );
}

export default LongForm;
