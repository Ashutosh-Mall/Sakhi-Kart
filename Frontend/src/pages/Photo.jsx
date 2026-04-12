import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Photo = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState(null);

  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(1); // ✅ added

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch {
      toast.error("Camera access denied");
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");
    setImage(imageData);

    stopCamera();
  };

  const handleUpload = async () => {
    if (!image) return toast.error("Capture image first");
    if (!price) return toast.error("Enter price");

    try {
      setLoading(true);

      const blob = await fetch(image).then((res) => res.blob());
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("image", file);
      formData.append("price", price);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        formData,
        { withCredentials: true }
      );

      const data = res.data.data;

      setProductData({
        title: data.title,
        description: data.description,
        image: data.enhancedImage,
      });

      toast.success("AI Generated Product Ready 🚀");
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Save Product API
  const handleSaveProduct = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/save`,
        {
          title: productData.title,
          description: productData.description,
          price,
          stock,
          image: productData.image,
        },
        { withCredentials: true }
      );

      toast.success("Product Listed Successfully 🚀");

      // reset UI
      setProductData(null);
      setImage(null);
      setPrice("");
      setStock(1);
      startCamera();

    } catch {
      toast.error("Failed to save product");
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">

      <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow-lg">

        <h1 className="text-xl font-bold text-green-900 text-center mb-4">
          Sell Product 🛒
        </h1>

        {!productData && !image && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 object-cover rounded-xl"
          />
        )}

        {image && !productData && (
          <img
            src={image}
            alt="captured"
            className="w-full h-64 object-cover rounded-xl"
          />
        )}

        {!productData && image && (
          <input
            type="number"
            placeholder="Enter price ₹"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded-xl mt-3"
          />
        )}

        {productData && (
          <div className="space-y-3">

            <img
              src={productData.image}
              alt="product"
              className="w-full h-64 object-cover rounded-xl"
            />

            <input
              type="text"
              value={productData.title}
              onChange={(e) =>
                setProductData({ ...productData, title: e.target.value })
              }
              className="w-full border p-2 rounded-xl"
            />

            <textarea
              value={productData.description}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  description: e.target.value,
                })
              }
              className="w-full border p-2 rounded-xl"
              rows={3}
            />

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border p-2 rounded-xl"
            />

            {/* ✅ Stock Input */}
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border p-2 rounded-xl"
              placeholder="Stock"
            />

            <button
              onClick={handleSaveProduct}
              className="w-full bg-green-900 text-white py-2 rounded-xl"
            >
              List Product 🚀
            </button>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        {!productData && (
          <div className="flex gap-2 mt-4">

            {!image ? (
              <button
                onClick={capturePhoto}
                className="flex-1 bg-green-900 text-white py-2 rounded-xl"
              >
                Capture 📸
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setImage(null);
                    startCamera();
                  }}
                  className="flex-1 bg-gray-300 py-2 rounded-xl"
                >
                  Retake
                </button>

                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="flex-1 bg-green-900 text-white py-2 rounded-xl"
                >
                  {loading ? "Processing..." : "Upload"}
                </button>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default Photo;