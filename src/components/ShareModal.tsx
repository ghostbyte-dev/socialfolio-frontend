import type { IUser } from "@/types/user-type";
import Image from "next/image";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Save from "@/assets/icons/save.svg";

interface ShareModalProps {
  user: IUser;
  onClose: () => void;
}

export default function ShareModal({ user, onClose }: ShareModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null); // Store QR code instance
  const [bgColor, setBgColor] = useState("#ffffff");
  const [primaryColor, setPrimaryColor] = useState("#4169E1");

  useEffect(() => {
    // Create QRCode instance **only on client**
    setQrCode(
      new QRCodeStyling({
        width: 280,
        height: 280,
        margin: 20,
        type: "svg",
        image: "/logo.svg",
        dotsOptions: {
          color: "#4267b2",
          type: "rounded",
        },
        imageOptions: {
          margin: 10,
          imageSize: 0.5,
        },
      })
    );
  }, []);

  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.className = "bg-surface-container text-primary";
    document.body.appendChild(tempDiv);

    const computedStyle = getComputedStyle(tempDiv);
    const backgroundColor = computedStyle.backgroundColor;
    const primaryColor = computedStyle.color;
    document.body.removeChild(tempDiv);

    setBgColor(backgroundColor);
    setPrimaryColor(primaryColor);
  }, []);

  useEffect(() => {
    if (!qrCode) return;
    if (ref.current) {
      qrCode.update({
        data: "https://socialfolio.me/" + user.username,
      });
      qrCode.append(ref.current);
    }
  }, [qrCode]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update({
      backgroundOptions: {
        color: bgColor,
      },
      dotsOptions: {
        color: primaryColor,
        type: "rounded",
      },
    });
  }, [bgColor, qrCode]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://socialfolio.me/${user.username}`
      );
      toast.success("copied to clipboard");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: "webp",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="relative bg-surface-container rounded-2xl shadow-lg flex overflow-hidden flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="basis-full flex flex-col overflow-y-scroll p-6 sm:p-8 gap-4">
          <div className="flex justify-center items-centers">
            <div ref={ref}></div>
          </div>
          <div
            className="flex flex-row gap-2 justify-center w-full hover:cursor-pointer"
            onClick={copyToClipboard}
          >
            <Image
              src={user.avatar}
              alt="avatar"
              height={24}
              width={24}
              className="rounded-md"
            />
            <p>{user.username}</p>
          </div>
          <button
            className="flex flex-row gap-2 justify-center w-full hover:cursor-pointer"
            onClick={onDownloadClick}
          >
            <Save className="w-6 h-6" />
            <p>Save QR-Code</p>
          </button>
        </div>
      </div>
    </div>
  );
}
