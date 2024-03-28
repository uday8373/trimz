import React, {useState} from "react";
import {Dialog} from "@headlessui/react";
import {motion} from "framer-motion";
import {RxCross2} from "react-icons/rx";
import {GoUpload} from "react-icons/go";
import AvatarEditor from "react-avatar-editor";
import {toast} from "react-toastify";

export default function UploadModal({isOpen, setIsOpen, handleUploadedImage}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({x: 0.5, y: 0.5});
  const [showEditor, setShowEditor] = useState(true);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [editorRef, setEditorRef] = useState(null);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCrop = () => {
    if (editorRef) {
      const canvasScaled = editorRef.getImageScaledToCanvas().toDataURL("image/jpeg", 1);
      setCroppedImage(canvasScaled);
      setShowEditor(false);
    }
  };

  const handleCancelCrop = () => {
    setShowEditor(true);
    setCroppedImage(null);
    setSelectedFile(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && isFileTypeAccepted(file)) {
      setSelectedFile(file);
      setIsDraggingOver(false);
    } else {
      toast.error("Unsupported file type");
    }
  };

  const isFileTypeAccepted = (file) => {
    const acceptedTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    return acceptedTypes.includes(file.type);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleUpload = () => {
    handleUploadedImage(croppedImage);
    setShowEditor(true);
    setCroppedImage(null);
    setSelectedFile(null);
  };

  return (
    <div>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={setIsOpen}
          as="div"
          className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden bg-black/25">
          <div className="flex flex-col h-full overflow-hidden text-center mb-20 ">
            <Dialog.Overlay />

            <button
              onClick={handleCloseModal}
              className="fixed inset-0 transition-opacity cursor-default"
              aria-hidden="true">
              <div className="absolute inset-0 bg-black/40"></div>
            </button>

            <motion.div
              className="flex items-center justify-center min-h-screen  md:pb-0 text-center sm:block sm:p-0"
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
                className="inline-block overflow-hidden align-bottom transition-all transform  shadow-3xl  rounded-[15px]  bg-white sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline">
                <div className="md:w-[400px] w-full h-auto ">
                  <div className="relative flex w-full px-4 pt-5">
                    <div className="flex items-center justify-center w-full ">
                      <p className="font-sans text-[18px] font-semibold text-black ">
                        Upload Image
                      </p>
                    </div>

                    <div className="absolute right-5 top-4">
                      <button
                        type="button"
                        tabIndex={0}
                        className="flex items-center justify-center px-2 py-2 hover:bg-slate-100 rounded-full"
                        onClick={() => setIsOpen(false)}>
                        <RxCross2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className={`flex flex-col items-center justify-center px-8 py-5 `}>
                    {showEditor ? (
                      selectedFile ? (
                        <AvatarEditor
                          ref={(ref) => setEditorRef(ref)}
                          image={selectedFile}
                          width={300}
                          height={300}
                          border={50}
                          scale={scale}
                          position={position}
                          onPositionChange={setPosition}
                          onZoomChange={setScale}
                        />
                      ) : (
                        <label
                          htmlFor="fileUpload"
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragEnter={handleDragEnter}
                          onDragLeave={handleDragLeave}
                          className="flex flex-col items-center cursor-pointer justify-center px-10 py-10 bg-white hover:bg-slate-100 w-full border-2 border-lightGray border-dotted rounded-[10px]">
                          <GoUpload size={35} />
                          <h1 className="text-black font-sans text-[14px] pt-3">
                            Select file to upload,
                            <br />
                            or drag-and-drop file
                          </h1>
                          <input
                            type="file"
                            id="fileUpload"
                            className="hidden"
                            accept=".jpg, .jpeg, .png, .svg"
                            onChange={handleFileChange}
                          />
                        </label>
                      )
                    ) : null}
                    {croppedImage && (
                      <div className="flex justify-center">
                        <Image src={croppedImage} alt="Cropped Profile" />
                      </div>
                    )}
                  </div>
                  <div className="flex w-full justify-between px-8 pb-5 gap-2">
                    <button
                      onClick={handleCancelCrop}
                      disabled={!selectedFile}
                      className="px-5 py-2 border-2 w-full border-[#E0E2D9] disabled:bg-[#E0E2D9] bg-white transition-all duration-500 delay-75 hover:bg-white rounded-full text-black font-sans text-[16px]">
                      Clear
                    </button>

                    {showEditor ? (
                      <>
                        {selectedFile && (
                          <button
                            onClick={handleCrop}
                            className="px-5 py-2 bg-primary rounded-full w-full text-white hover:bg-bghover transition-all duration-500 delay-75 font-sans text-[16px]">
                            Crop
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        {selectedFile && (
                          <button
                            onClick={handleUpload}
                            className="px-5 py-2 bg-primary rounded-full text-white w-full hover:bg-bghover transition-all duration-500 delay-75 font-sans text-[16px]">
                            Upload
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
