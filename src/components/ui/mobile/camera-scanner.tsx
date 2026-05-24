"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, X, Scan, Loader2 } from "lucide-react";

// BarcodeDetector is available in Chromium browsers — declare the types
declare class BarcodeDetector {
  constructor(options?: { formats?: string[] });
  detect(image: HTMLVideoElement | HTMLCanvasElement | ImageBitmap): Promise<{ rawValue: string }[]>;
}

interface CameraScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

type ScannerState = "initial" | "requesting" | "scanning" | "success" | "error" | "unsupported";

export default function CameraScanner({ onScan, onClose }: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectorRef = useRef<InstanceType<typeof BarcodeDetector> | null>(null);
  const [state, setState] = useState<ScannerState>("initial");
  const [errorMessage, setErrorMessage] = useState("");
  const [detectedCode, setDetectedCode] = useState("");
  const scanInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check for BarcodeDetector support
  const isBarcodeDetectorSupported =
    typeof window !== "undefined" && "BarcodeDetector" in window;

  const startCamera = useCallback(async () => {
    setState("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setState("scanning");

      // Auto-start scanning
      if (isBarcodeDetectorSupported) {
        try {
          detectorRef.current = new BarcodeDetector({
            formats: [
              "qr_code",
              "ean_13",
              "ean_8",
              "upc_a",
              "upc_e",
              "code_128",
              "code_39",
              "code_93",
              "codabar",
              "data_matrix",
              "aztec",
              "pdf417",
              "itf",
              "gs1_databar",
            ],
          });
          startScanLoop();
        } catch {
          // BarcodeDetector failed to initialize — show manual input
          console.warn("[Scanner] BarcodeDetector not available, showing manual input");
          setState("unsupported");
        }
      } else {
        setState("unsupported");
      }
    } catch (err: unknown) {
      const error = err as { name?: string; message?: string };
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setErrorMessage("Camera permission denied. Please allow camera access in your browser settings.");
      } else if (error.name === "NotFoundError") {
        setErrorMessage("No camera found on this device.");
      } else {
        setErrorMessage(error.message || "Could not access camera");
      }
      setState("error");
    }
  }, [isBarcodeDetectorSupported]);

  const startScanLoop = useCallback(() => {
    // Scan every 500ms
    scanInterval.current = setInterval(async () => {
      if (!videoRef.current || !detectorRef.current) return;
      try {
        const codes = await detectorRef.current.detect(videoRef.current);
        if (codes.length > 0) {
          const code = codes[0].rawValue;
          if (code && code !== detectedCode) {
            setDetectedCode(code);
            setState("success");
            // Haptic feedback on scan
            if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
            // Brief delay then callback
            setTimeout(() => onScan(code), 500);
          }
        }
      } catch {
        // Detection error — ignore and continue
      }
    }, 500);
  }, [detectedCode, onScan]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scanInterval.current) clearInterval(scanInterval.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Auto-start on mount
  useEffect(() => {
    startCamera();
  }, [startCamera]);

  const handleClose = useCallback(() => {
    if (scanInterval.current) clearInterval(scanInterval.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    onClose();
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      {/* Scanner UI */}
      <div className="relative w-full max-w-sm mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Scan className="w-5 h-5 text-[#ff4f8b]" />
            Scan Barcode
          </h3>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close scanner"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Camera view */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black shadow-2xl">
          {/* Video */}
          {state === "scanning" && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              muted
            />
          )}

          {/* Scan frame overlay */}
          {(state === "scanning" || state === "unsupported") && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-3/4 aspect-square max-w-[240px]">
                {/* Corner indicators */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ff4f8b] rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ff4f8b] rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ff4f8b] rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ff4f8b] rounded-br-lg" />
                {/* Scanning line animation */}
                <div className="absolute left-1 right-1 h-px bg-gradient-to-r from-transparent via-[#ff4f8b] to-transparent animate-scan-line" />
              </div>
            </div>
          )}

          {/* Requesting permission */}
          {state === "requesting" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-10 h-10 text-[#ff4f8b] animate-spin" />
              <p className="text-sm font-semibold text-white">Requesting camera...</p>
            </div>
          )}

          {/* Initial state */}
          {state === "initial" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Camera className="w-12 h-12 text-white/60" />
              <p className="text-sm text-white/80">Preparing camera...</p>
            </div>
          )}

          {/* Unsupported — show manual input */}
          {state === "unsupported" && (
            <div className="absolute top-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-4">
              <p className="text-xs text-white/80 text-center mb-2">
                Auto-scan not supported on this browser. Enter barcode manually:
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = (e.target as HTMLFormElement).barcode as HTMLInputElement;
                  const value = input.value.trim();
                  if (value) {
                    onScan(value);
                    handleClose();
                  }
                }}
                className="flex gap-2"
              >
                <input
                  name="barcode"
                  type="text"
                  placeholder="Enter barcode number"
                  className="flex-1 h-10 rounded-xl bg-white/20 border border-white/30 px-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#ff4f8b]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="h-10 px-4 rounded-xl bg-[#ff4f8b] text-white text-xs font-bold hover:bg-[#e63872] transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}

          {/* Error */}
          {state === "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
              <Camera className="w-12 h-12 text-[#ff4f8b]" />
              <p className="text-sm font-semibold text-white text-center">{errorMessage}</p>
              <button
                onClick={startCamera}
                className="h-10 px-5 rounded-xl bg-[#ff4f8b] text-white text-xs font-bold hover:bg-[#e63872] transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Success */}
          {state === "success" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-full bg-[#0c831f] flex items-center justify-center">
                <Scan className="w-7 h-7 text-white" />
              </div>
              <p className="text-sm font-bold text-white">Barcode detected!</p>
              <p className="text-xs text-white/70">{detectedCode}</p>
            </div>
          )}

          {/* Flashlight toggle */}
          {state === "scanning" && (
            <button
              onClick={() => {
                const track = streamRef.current?.getVideoTracks()[0];
                const capabilities = track?.getCapabilities?.();
                const hasTorch = capabilities && 'torch' in capabilities;
                if (hasTorch) {
                  const settings = track!.getSettings();
                  track!
                    .applyConstraints({ advanced: [{ torch: !(settings as Record<string, unknown>).torch }] as unknown as MediaTrackConstraintSet[] })
                    .catch(() => {});
                }
              }}
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Toggle flashlight"
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
          )}
        </div>

        {/* Instructions */}
        <p className="text-xs text-white/60 text-center mt-4">
          Point your camera at a barcode or QR code to search for the product
        </p>
      </div>
    </div>
  );
}
