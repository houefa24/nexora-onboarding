import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = contactSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { firstName, lastName, email, phone, role } = parsed.data;

        const lead = await prisma.lead.upsert({
            where: { email },
            update: { firstName, lastName, phone: phone || null, role: role || null },
            create: { firstName, lastName, email, phone: phone || null, role: role || null },
        });

        return NextResponse.json({ leadId: lead.id }, { status: 201 });
    } catch (error) {
        console.error("[POST /api/leads/contact]", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}