// components/QRCodeButton.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { QrCode, Download, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QRCodeButtonProps {
  qrCode: string;
  avatarUrl?: string | null;
  username?: string | null;
  linkidUsername?: string | null;
}

function getInitials(name?: string | null): string {
  if (!name) return "?";

  const cleaned = name.trim();

  if (!cleaned) return "?";

  return cleaned
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

async function buildCompositeQR(
  qrDataUrl: string,
  avatarSrc: string | null | undefined,
  displayName: string,
): Promise<string | null> {
  const SIZE = 480;
  const AVATAR_RATIO = 0.24;
  const PADDING = 6;

  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");

    canvas.width = SIZE;
    canvas.height = SIZE;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      resolve(null);
      return;
    }

    const qrImg = new Image();

    qrImg.crossOrigin = "anonymous";

    qrImg.onload = () => {
      // background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, SIZE, SIZE);

      // draw qr
      ctx.drawImage(qrImg, 0, 0, SIZE, SIZE);

      const avatarDia = SIZE * AVATAR_RATIO;
      const avatarR = avatarDia / 2;

      const cx = SIZE / 2;
      const cy = SIZE / 2;

      // white border circle
      ctx.save();

      ctx.beginPath();
      ctx.arc(cx, cy, avatarR + PADDING, 0, Math.PI * 2);

      ctx.fillStyle = "#ffffff";
      ctx.fill();

      ctx.restore();

      const drawInitials = () => {
        const initials = getInitials(displayName);

        ctx.save();

        ctx.beginPath();
        ctx.arc(cx, cy, avatarR, 0, Math.PI * 2);
        ctx.clip();

        const gradient = ctx.createLinearGradient(
          cx - avatarR,
          cy - avatarR,
          cx + avatarR,
          cy + avatarR,
        );

        gradient.addColorStop(0, "#6366f1");
        gradient.addColorStop(1, "#8b5cf6");

        ctx.fillStyle = gradient;
        ctx.fillRect(cx - avatarR, cy - avatarR, avatarDia, avatarDia);

        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${Math.round(
          avatarDia * 0.38,
        )}px system-ui, sans-serif`;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(initials, cx, cy);

        ctx.restore();

        resolve(canvas.toDataURL("image/png"));
      };

      // no avatar → initials
      if (!avatarSrc) {
        drawInitials();
        return;
      }

      const avatarImg = new Image();

      avatarImg.crossOrigin = "anonymous";

      avatarImg.onload = () => {
        ctx.save();

        ctx.beginPath();
        ctx.arc(cx, cy, avatarR, 0, Math.PI * 2);
        ctx.clip();

        ctx.drawImage(
          avatarImg,
          cx - avatarR,
          cy - avatarR,
          avatarDia,
          avatarDia,
        );

        ctx.restore();

        resolve(canvas.toDataURL("image/png"));
      };

      // avatar failed → initials
      avatarImg.onerror = drawInitials;

      avatarImg.src = avatarSrc;
    };

    qrImg.onerror = () => resolve(null);

    qrImg.src = qrDataUrl;
  });
}

export default function QRCodeButton({
  qrCode,
  avatarUrl,
  username,
  linkidUsername,
}: QRCodeButtonProps) {
  const [open, setOpen] = useState(false);

  const [compositeQR, setCompositeQR] = useState<string | null>(null);

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  // Prefer actual display name first
  const displayName = username?.trim() || linkidUsername?.trim() || "Profile";

  const generate = useCallback(async () => {
    if (!qrCode) return;

    setStatus("loading");

    const result = await buildCompositeQR(qrCode, avatarUrl, displayName);

    if (result) {
      setCompositeQR(result);
      setStatus("idle");
    } else {
      setStatus("error");
    }
  }, [qrCode, avatarUrl, displayName]);

  useEffect(() => {
    if (!open) return;

    void generate();
  }, [open, generate]);

  const handleDownload = () => {
    const src = compositeQR ?? qrCode;

    if (!src) return;

    const link = document.createElement("a");

    link.href = src;
    link.download = `linkid-qr-${displayName}.png`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const displayQR = compositeQR ?? qrCode;

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <QrCode className="h-4 w-4" />
        Show QR Code
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-center">Your QR Code</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-2">
            <div className="relative h-52 w-52 overflow-hidden rounded-xl border bg-white shadow-sm">
              {status === "loading" && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
                  <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              )}

              {displayQR ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={displayQR}
                  alt="QR Code with profile"
                  width={208}
                  height={208}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                  QR code unavailable
                </div>
              )}
            </div>

            {status === "error" && (
              <p className="text-center text-xs text-destructive">
                Could not compose QR — plain version will download.
              </p>
            )}

            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={generate}
                disabled={status === "loading"}
                className="shrink-0"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    status === "loading" ? "animate-spin" : ""
                  }`}
                />
              </Button>

              <Button
                onClick={handleDownload}
                disabled={!displayQR || status === "loading"}
                className="flex-1 gap-2"
              >
                <Download className="h-4 w-4" />
                Download QR Code
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
