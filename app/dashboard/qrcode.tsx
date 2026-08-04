import QRCodeLib from "qrcode";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

import QRCodeButton from "@/components/ui/QRCodeButton";

async function generateQRCode() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      redirect("/login");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        username: true,
        name: true,
        image: true,
      },
    });

    if (!user?.username) {
      redirect("/dashboard");
    }

    const url = `https://linkid.qzz.io/${user.username}`;

    const qrCode = await QRCodeLib.toDataURL(url);

    return { {
      qrCode,
      user,
    }, user };
  } catch (error) {
    console.error("QR generation failed:", error);

    return null;
  }
}

export default async function QRCode() {
  const data = await generateQRCode();

  if (!data) {
    return null;
  }

  return (
    <QRCodeButton
      qrCode={data.qrCode}
      avatarUrl={data.user.image}
      username={data.user.name}
      linkidUsername={data.user.username}
    />
  );
}
