// src/pages/ScanPage.jsx
import { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";
import { AlertTriangle, RefreshCcw, Unlock } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import UserCard from "../components/UserCard";

export default function ScanPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [cameraDenied, setCameraDenied] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute("playsinline", true); // iOS fix
      await videoRef.current.play();

      // ✅ clear previous errors if camera starts successfully
      setCameraDenied(false);
      setErrorMessage("");
      setScanning(true);

      scanLoop();
    } catch (err) {
      console.warn("Camera error:", err);
      setCameraDenied(true);
      setErrorMessage("🚫 Camera access denied. Please allow access.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
  };

  // Continuous scan loop
  const scanLoop = () => {
    if (!videoRef.current || videoRef.current.readyState !== 4) {
      requestAnimationFrame(scanLoop);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);

    if (code) {
      handleResult(code.data);
    } else {
      requestAnimationFrame(scanLoop);
    }
  };

  // Handle QR result
  const handleResult = async (text) => {
    try {
      const id = text.split("/qr/")[1];
      const docSnap = await getDoc(doc(db, "users", id));
      if (docSnap.exists()) {
        setUser(docSnap.data());
        setErrorMessage("");
        setScanning(false);
        stopCamera();
      } else {
        setErrorMessage("⚠️ No user data found for this QR code.");
        requestAnimationFrame(scanLoop);
      }
    } catch (err) {
      console.error("QR parse error:", err);
      setErrorMessage("⚠️ Invalid QR code format.");
      requestAnimationFrame(scanLoop);
    }
  };

  return (
    <section className="py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        Scan QR Code
      </h1>

      <div className="flex flex-col items-center space-y-6">
        {/* Scanner Box */}
        <div className="relative w-72 h-72 rounded-xl overflow-hidden shadow-lg bg-black flex items-center justify-center">
          <video ref={videoRef} className="w-full h-full object-cover" />

          {/* Overlay (iPhone-style brackets + laser) */}
          {scanning && !cameraDenied && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
              <div className="absolute w-full h-1 bg-red-500 animate-scan" />
            </div>
          )}

          {/* Camera denied overlay */}
          {cameraDenied && (
            <div className="flex flex-col items-center text-red-500 absolute inset-0 justify-center bg-black/70">
              <AlertTriangle size={56} className="mb-2 animate-pulse-triangle" />
              <p className="text-sm text-center text-white">
                Camera access denied
              </p>
            </div>
          )}
        </div>

        {/* Hidden canvas for decoding */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Error Message (only show if not camera issue) */}
        {errorMessage && !cameraDenied && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
            <AlertTriangle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Re-enable Camera Button */}
        {cameraDenied && (
          <button
            onClick={startCamera}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Unlock size={18} />
            Enable Camera
          </button>
        )}

        {/* User Card */}
        {user && (
          <div className="mt-4 w-full max-w-md flex flex-col items-center gap-4">
            <UserCard user={user} />

            <button
              onClick={() => {
                setUser(null);
                setErrorMessage("");
                setScanning(true);
                startCamera();
              }}
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition"
            >
              <RefreshCcw size={18} />
              Scan Again
            </button>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes scan {
            0% { top: 0; }
            50% { top: 95%; }
            100% { top: 0; }
          }
          .animate-scan {
            animation: scan 3s linear infinite;
          }
          @keyframes pulseTriangle {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.6; }
          }
          .animate-pulse-triangle {
            animation: pulseTriangle 1.5s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
}
