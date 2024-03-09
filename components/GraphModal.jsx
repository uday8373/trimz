import React, {useState, useEffect} from "react";
import {Dialog} from "@headlessui/react";
import {motion, AnimatePresence} from "framer-motion";
import {RxCross2} from "react-icons/rx";
import Chart from "react-google-charts";
import countryList from "country-list";
import {ThreeDots} from "react-loader-spinner";
import Image from "next/image";
import {BiWorld} from "react-icons/bi";
import {MdDevices} from "react-icons/md";

// const getCountryFromIP = async (ip) => {
//   try {
//     const response = await fetch(`http://ip-api.com/json/${ip}`);
//     const data = await response.json();
//     return data.countryCode;
//   } catch (error) {
//     console.error("Error fetching country from IP:", error);
//     return "Unknown";
//   }
// };

const getCountryFromIP = async (ip) => {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return data.country;
  } catch (error) {
    console.error("Error fetching country from IP:", error);
    return "Unknown";
  }
};

export const GraphModal = ({isOpen, setIsOpen, BaseUrl, selectedItem}) => {
  const [geoChartData, setGeoChartData] = useState([]);
  const [dailyClicksData, setDailyClicksData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [topBrowsers, setTopBrowsers] = useState([]);
  const [topDevices, setTopDevices] = useState([]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const fetchGeoChartData = async () => {
    const clickDetails = selectedItem?.clickDetails || [];
    const countryData = {};

    await Promise.all(
      clickDetails.map(async (click) => {
        const country = await getCountryFromIP(click.clickIp);
        const countryName = countryList.getName(country) || "Unknown";
        countryData[countryName] = (countryData[countryName] || 0) + 1;
      }),
    );

    const chartData = Object.entries(countryData).map(([country, count]) => {
      return [country, count];
    });

    setGeoChartData([["Country", "Clicks"], ...chartData]);
  };
  const fetchDailyClicksData = () => {
    const dailyClicksMap = new Map();
    const currentDate = new Date();

    // Initialize the map with keys for the last 7
    for (let i = 6; i >= 0; i--) {
      const day = new Date(currentDate);
      day.setDate(day.getDate() - i);
      const formattedDay = `${day.getFullYear()}-${("0" + (day.getMonth() + 1)).slice(
        -2,
      )}-${("0" + day.getDate()).slice(-2)}`;
      dailyClicksMap.set(formattedDay, 0);
    }

    // Increment the count for days with clicks
    selectedItem?.clickDetails.forEach((click) => {
      const date = new Date(click.clickedAt);
      const differenceInTime = currentDate.getTime() - date.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      if (differenceInDays <= 6) {
        const formattedDate = `${date.getFullYear()}-${(
          "0" +
          (date.getMonth() + 1)
        ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        dailyClicksMap.set(formattedDate, (dailyClicksMap.get(formattedDate) || 0) + 1);
      }
    });

    // Convert the map to array for chart
    const dailyClicksData = [["Date", "Clicks"]];
    dailyClicksMap.forEach((value, key) => {
      dailyClicksData.push([key, value]);
    });

    setDailyClicksData(dailyClicksData);
  };

  const calculateTopBrowsers = () => {
    const browsersMap = new Map();
    selectedItem?.clickDetails.forEach((click) => {
      const browser = click.browser;
      browsersMap.set(browser, (browsersMap.get(browser) || 0) + 1);
    });

    const sortedBrowsers = Array.from(browsersMap.entries()).sort((a, b) => b[1] - a[1]);

    setTopBrowsers(sortedBrowsers.slice(0, 2));
  };

  const calculateTopDevices = () => {
    const osMap = new Map();
    selectedItem?.clickDetails.forEach((click) => {
      const os = click.os;
      osMap.set(os, (osMap.get(os) || 0) + 1);
    });

    const sortedos = Array.from(osMap.entries()).sort((a, b) => b[1] - a[1]);

    setTopDevices(sortedos.slice(0, 2));
  };

  useEffect(() => {
    if (isOpen) {
      fetchGeoChartData();
      fetchDailyClicksData();
      calculateTopBrowsers();
      calculateTopDevices();
      setIsLoading(false);
    }
  }, [isOpen, selectedItem]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={setIsOpen}
          as="div"
          className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden backdrop-blur-sm">
          <div className="flex flex-col w-full h-full px-6 overflow-hidden text-center lg:pt-12 lg:pb-8 md:pt-14 md:pb-8">
            <Dialog.Overlay />

            <button
              onClick={handleCloseModal}
              className="fixed inset-0 transition-opacity cursor-default"
              aria-hidden="true">
              <div className="absolute inset-0 opacity-30 bg-bghero"></div>
            </button>

            <motion.div
              className="flex  w-full items-center justify-center min-h-screen md:pb-0 text-center sm:block sm:p-0"
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  ease: "easeOut",
                  duration: 0.15,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
                transition: {
                  ease: "easeIn",
                  duration: 0.15,
                },
              }}>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true">
                &#8203;
              </span>
              <div
                className="inline-block overflow-hidden align-bottom transition-all transform  shadow-3xl  rounded-[15px]  bg-white sm:my-8 sm:align-middle  md:w-[640px] lg:w-[750px] w-full h-[560px] py-5"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline ">
                <div className="w-full h-full overflow-y-auto overflow-x-hidden">
                  <div className="flex items-center justify-between w-full border-b-2 border-dotted border-lightGray pb-5 px-8">
                    <p className="font-sans text-[22px] font-semibold text-pink ">
                      Analytics
                    </p>

                    <button
                      type="button"
                      tabIndex={0}
                      className="flex items-center justify-center px-2 py-2 border rounded-lg border-lightGray bg-white fixed right-8 z-50 shadow-3xl "
                      onClick={() => setIsOpen(false)}>
                      <RxCross2 size={20} />
                    </button>
                  </div>
                  {selectedItem.clicks < 1 ? (
                    <div className="flex justify-center items-center flex-col w-full h-[88%]">
                      <Image
                        src="/analytics_modal.png"
                        width={600}
                        height={600}
                        className="w-32 h-32"
                      />
                      <p className="font-sans text-[18px] font-semibold text-black py-5">
                        Share your link and start tracking clicks
                      </p>
                      <p className="font-sans text-[14px] font-semibold text-pink">
                        Be the first to click
                      </p>
                    </div>
                  ) : (
                    <div>
                      {isloading ? (
                        <>
                          <div className="flex w-full h-[88%] justify-center items-center">
                            <ThreeDots size={50} color="#E93266" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-full flex flex-col pt-5 px-8 justify-start text-black font-sans font-semibold text-[16px]">
                            World Map Analytics
                          </div>
                          <div className="w-full flex flex-col py-5 px-8 justify-center border-b-2 border-dotted border-lightGray">
                            <Chart
                              width={"100%"}
                              height={"400px"}
                              chartType="GeoChart"
                              data={geoChartData}
                              options={{
                                colorAxis: {colors: ["#fff", "#E93266"]},
                              }}
                            />
                          </div>
                          <div className="w-full flex flex-col pt-5 px-8 justify-start text-black font-sans font-semibold text-[16px]">
                            Click Analytics
                          </div>

                          <div className="w-full flex flex-col py-5 px-8 justify-center border-b-2 border-dotted border-lightGray">
                            <Chart
                              width={"100%"}
                              height={"400px"}
                              chartType="Bar"
                              data={dailyClicksData}
                              options={{
                                colors: ["#2161DF"],
                                legend: {position: "none"},
                                hAxis: {
                                  title: "Date",
                                },
                                vAxis: {
                                  title: "Clicks",
                                },
                              }}
                            />
                          </div>
                          <div className="w-full flex xl:flex-row flex-col py-5 px-8 justify-between gap-4">
                            <div className="  flex w-full flex-col py-5 px-5 rounded-md border-2 border-lightGray">
                              <h1 className="font-sans text-[14px] font-semibold text-black justify-start w-full mb-2">
                                Top Browsers
                              </h1>
                              {topBrowsers.map((browser, index) => (
                                <div
                                  key={index}
                                  className="flex w-full items-center justify-between bg-primary px-3 py-2 rounded-md mt-2">
                                  <div className="flex items-center ">
                                    <BiWorld size={30} color="#fff" />
                                    <h1 className="font-sans text-[16px] text-white font-semibold justify-start w-full pl-2">
                                      {browser[0]}
                                    </h1>
                                  </div>
                                  <h1 className="font-sans text-[16px] text-white font-semibold">
                                    {(
                                      (browser[1] / selectedItem.clickDetails.length) *
                                      100
                                    ).toFixed(0)}
                                    %
                                  </h1>
                                </div>
                              ))}
                            </div>

                            <div className="  flex w-full flex-col py-5 px-5 rounded-md border-2 border-lightGray">
                              <h1 className="font-sans text-[14px] font-semibold text-black justify-start w-full mb-2">
                                Top Devices
                              </h1>
                              {topDevices.map((os, index) => (
                                <div
                                  key={index}
                                  className="flex w-full items-center justify-between bg-pink px-3 py-2 rounded-md mt-2">
                                  <div className="flex items-center ">
                                    <MdDevices size={30} color="#fff" />
                                    <h1 className="font-sans text-[16px] text-white font-semibold justify-start w-full pl-2">
                                      {os[0]}
                                    </h1>
                                  </div>
                                  <h1 className="font-sans text-[16px] text-white font-semibold">
                                    {(
                                      (os[1] / selectedItem.clickDetails.length) *
                                      100
                                    ).toFixed(0)}
                                    %
                                  </h1>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
