import React, {useState, useEffect} from "react";
import {Dialog} from "@headlessui/react";
import {motion, AnimatePresence} from "framer-motion";
import {RxCross2} from "react-icons/rx";
import QRCode from "qrcode-generator";
import Image from "next/image";

export const QrModalUrl = ({isOpen, setIsOpen, BaseUrl, selectedItem}) => {
  const [qrCodeData, setQRCodeData] = useState(null);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    handleQrMouseEnter();
  }, []);

  const handleQrMouseEnter = () => {
    const qr = QRCode(0, "H");
    qr.addData(`${BaseUrl}${selectedItem?.shortUrl}`);
    qr.make();

    setQRCodeData(qr.createDataURL(6));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={setIsOpen}
          as="div"
          className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden backdrop-blur-sm">
          <div className="flex flex-col h-full px-8 overflow-hidden text-center lg:pt-10 lg:pb-8 md:pt-14 md:pb-8 ">
            <Dialog.Overlay />

            <button
              onClick={handleCloseModal}
              className="fixed inset-0 transition-opacity cursor-default"
              aria-hidden="true">
              <div className="absolute inset-0 opacity-30 bg-bghero"></div>
            </button>

            <motion.div
              className="flex items-center justify-center min-h-screen px-4 md:pb-0 text-cente sm:block sm:p-0"
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
                className="inline-block overflow-hidden align-bottom transition-all transform  shadow-3xl  rounded-[15px]  bg-bghero sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline">
                <div className="md:w-[400px] w-full h-auto ">
                  <div className="relative flex w-full px-4 py-4 border-b border-dashed border-lightGray ">
                    <div className="flex items-center justify-center w-full ">
                      <p className="font-sans text-2xl font-semibold text-gray ">
                        QR Code
                      </p>
                    </div>

                    <div className="absolute right-5 ">
                      <button
                        type="button"
                        tabIndex={0}
                        className="flex items-center justify-center px-2 py-2 border rounded-lg border-lightGray bg-bghero"
                        onClick={() => setIsOpen(false)}>
                        <RxCross2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center px-10 py-5 bg-bghero">
                    <h1 className="text-black font-sans font-medium text-[18px] mb-3">
                      {BaseUrl}
                      {selectedItem?.shortUrl}
                    </h1>
                    <div>
                      <Image
                        draggable="false"
                        width={500}
                        height={500}
                        src={qrCodeData}
                        alt="QR Code"
                        className="w-40 lg:w-56"
                      />
                    </div>
                    <a
                      href={qrCodeData}
                      download="qrcode.png"
                      className=" flex bg-primary justify-center items-center mt-5 mb-2 px-10 py-3 text-white rounded-[100px] text-[18px] font-medium hover:bg-bghover transition-all duration-500">
                      Download
                    </a>
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
