import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkOutUser } from "../../redux/checkin/checkInAction";

const Checkout = () => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [workedTime, setWorkedTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [location, setLocation] = useState("Loading...");
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, checkOutData } = useSelector(
    (state) => state.checkOut
  );

  useEffect(() => {
    if (showWebcam) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const res = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
              );
              const locationName =
                res.data.address.city ||
                res.data.address.town ||
                "Unknown Location";
              setLocation(locationName);
            } catch (error) {
              console.error("Error getting location name:", error);
              setLocation("Unable to fetch location");
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            setLocation("Geolocation not supported or denied");
          }
        );
      } else {
        setLocation("Geolocation not supported by browser");
      }
    }
  }, [showWebcam]);

  const videoConstraints = {
    facingMode: "user",
  };

  const handleCapturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const timestamp = new Date();
    const formattedTime = `${String(timestamp.getHours()).padStart(
      2,
      "0"
    )}:${String(timestamp.getMinutes()).padStart(2, "0")}`;
    const formattedDate = timestamp.toLocaleDateString();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      ctx.font = "24px Arial";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      const watermark = `${location} - ${formattedDate}, ${formattedTime}`;

      ctx.strokeText(watermark, 10, img.height - 20);
      ctx.fillText(watermark, 10, img.height - 20);

      const watermarkedImage = canvas.toDataURL("image/jpeg");
      setCapturedPhoto({ src: watermarkedImage, watermark });
      setWorkedTime(formattedTime);
      setCheckOutTime(`${formattedDate} - ${formattedTime}`);
      setShowWebcam(false);
      const formData = new FormData();
      formData.append("photo", dataURItoBlob(watermarkedImage));
      formData.append("location", location);
      const user = JSON.parse(localStorage.getItem("user"));
      formData.append("userId", user._id);

      dispatch(checkOutUser(formData));
      setShowWebcam(false);
    };
  };

  const handleCancel = () => {
    setShowWebcam(false);
    navigate("/");
  };

  const dataURItoBlob = (dataURI) => {
    let byteString = atob(dataURI.split(",")[1]);
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <button
        onClick={() => setShowWebcam(true)}
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 mb-4">
        Check Out
      </button>
      {showWebcam && (
        <div className="flex flex-col items-center space-y-4">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="border-2 border-gray-300"
          />

          <div className="flex space-x-4">
            <button
              onClick={handleCapturePhoto}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
              OK
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Batal
            </button>
          </div>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {checkOutData && (
        <div className="mt-6">
          <img
            src={capturedPhoto?.src}
            alt="Captured"
            className="w-64 h-auto border-2 border-gray-300"
          />
          <p className="text-sm text-gray-500 mt-2">
            {capturedPhoto.watermark}
          </p>
        </div>
      )}

      {workedTime && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            Check-Out Time: {checkOutTime}
          </h2>
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default Checkout;
