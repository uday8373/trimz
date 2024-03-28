"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Router from "next/router";
import Image from "next/image";

export default function RedirectPage() {
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      const ipAddressResponse = await fetch("https://api.ipify.org?format=json");

      const {ip} = await ipAddressResponse.json();

      const {shortUrl} = router.query;
      if (shortUrl) {
        fetch(`/api/${shortUrl}?ip=${ip}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              setError(true);
              throw new Error("Failed to fetch original URL");
            }
          })
          .then((data) => {
            window.location.replace(data.originalUrl);
          })
          .catch((error) => {
            console.error(error);
            setError(true);
          });
      }
    }
    fetchMyAPI();
  }, [router]);
  if (error) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center flex-col bg-background">
          <Image
            src="/404_page.svg"
            width={0}
            height={0}
            alt="URL shortener for businesses"
            className="sm:w-[350px]  sm:h-auto w-[250px] object-contain"
          />
          <h1 className="text-black font-sans font-semibold text-[26px] md:[32px]">
            opps! page not found
          </h1>
          <button
            onClick={() => Router.push("/")}
            className=" bg-primary mt-5 text-white px-10 py-3 rounded-xl text-[16px] font-semibold hover:bg-bghover transition-all duration-500">
            Go Home
          </button>
        </div>
      </>
    );
  }
  return null;
}
