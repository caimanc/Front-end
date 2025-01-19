import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const authResult = await auth(); 
        const { userId } = authResult;
        const body = await req.json();
        const { name } = body;
        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Nombre es requerido", { status: 400 });
        }

        const store= await prismadb.store.create({
            data: { name, userId },
        }); 
        return NextResponse.json(store);
    } catch (error) {
        console.log("[STORES_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}   