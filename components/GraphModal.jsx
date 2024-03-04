import React, {useState, useEffect} from "react";
import {Dialog} from "@headlessui/react";
import {motion, AnimatePresence} from "framer-motion";
import {RxCross2} from "react-icons/rx";
import Chart from "react-google-charts";
import countryList from "country-list";

const getCountryFromIP = async (ip) => {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    return data.countryCode;
  } catch (error) {
    console.error("Error fetching country from IP:", error);
    return "Unknown";
  }
};

export const GraphModal = ({isOpen, setIsOpen, BaseUrl, selectedItem}) => {
  const [geoChartData, setGeoChartData] = useState([]);
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchGeoChartData = async () => {
      const clickDetails = selectedItem?.clickDetails || [];
      const countryData = {};

      // Count clicks from each country
      await Promise.all(
        clickDetails.map(async (click) => {
          const country = await getCountryFromIP(click.clickIp);
          const countryName = countryList.getName(country) || "Unknown";
          countryData[countryName] = (countryData[countryName] || 0) + 1;
        }),
      );

      // Prepare data for GeoChart
      const chartData = Object.entries(countryData).map(([country, count]) => {
        return [country, count];
      });

      setGeoChartData([["Country", "Clicks"], ...chartData]);
    };

    if (isOpen) {
      fetchGeoChartData();
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
              className="flex  w-full items-center justify-center min-h-screen md:pb-0 text-cente sm:block sm:p-0"
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
                <div className="w-full h-full overflow-y-auto">
                  <div className="flex items-center justify-between w-full border-b-2 border-dotted border-lightGray pb-5 px-8">
                    <p className="font-sans text-[22px] font-semibold text-pink ">
                      Analytics
                    </p>

                    <button
                      type="button"
                      tabIndex={0}
                      className="flex items-center justify-center px-2 py-2 border rounded-lg border-lightGray bg-white"
                      onClick={() => setIsOpen(false)}>
                      <RxCross2 size={20} />
                    </button>
                  </div>
                  <div className="w-full flex flex-col py-6 px-8 justify-start">
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
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
