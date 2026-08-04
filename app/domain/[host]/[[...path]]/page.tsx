import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PublicProfile from "@/app/[username]/page";

// Custom-domain handler. middleware.ts rewrites requests on a pointed custom
// domain to /domain/{host}{path}; resolve the owner by customDomain and render
// the same public profile the /{username} route renders.
export default async function DomainProfile({
    params,
}: {
    params: Promise<{ host: string; path?: string[] }>;
}) {
    const { host } = await params;

    const owner = await prisma.user.findUnique({
        where: { customDomain: host },
        select: { username: true },
    });

    if (!owner?.username) {
        notFound();
    }

    return <PublicProfile params={Promise.resolve({ username: owner.username })} />;
}
