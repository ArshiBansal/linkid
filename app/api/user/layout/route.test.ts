import { NextRequest } from "next/server";
import { PATCH } from "./route";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

jest.mock("next-auth", () => ({
    getServerSession: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
    __esModule: true,
    default: {
        user: {
            update: jest.fn(),
        },
    },
}));

describe("PATCH /api/user/layout", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 401 if unauthorized", async () => {
        (getServerSession as jest.Mock).mockResolvedValue(null);

        const req = new NextRequest("http://localhost/api/user/layout", {
            method: "PATCH",
            body: JSON.stringify({ layoutStyle: "GRID" }),
        });

        const res = await PATCH(req);
        expect(res.status).toBe(401);
        const data = await res.json();
        expect(data.error).toBe("Unauthorized");
    });

    it("should return 400 for invalid layoutStyle", async () => {
        (getServerSession as jest.Mock).mockResolvedValue({
            user: { email: "test@example.com" },
        });

        const req = new NextRequest("http://localhost/api/user/layout", {
            method: "PATCH",
            body: JSON.stringify({ layoutStyle: "INVALID" }),
        });

        const res = await PATCH(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toBe("Invalid layout style");
    });

    it("should return 200 and update layoutStyle", async () => {
        (getServerSession as jest.Mock).mockResolvedValue({
            user: { email: "test@example.com" },
        });
        (prisma.user.update as jest.Mock).mockResolvedValue({
            layoutStyle: "GRID",
        });

        const req = new NextRequest("http://localhost/api/user/layout", {
            method: "PATCH",
            body: JSON.stringify({ layoutStyle: "GRID" }),
        });

        const res = await PATCH(req);
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.success).toBe(true);
        expect(data.layoutStyle).toBe("GRID");

        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { email: "test@example.com" },
            data: { layoutStyle: "GRID" },
        });
    });
});
