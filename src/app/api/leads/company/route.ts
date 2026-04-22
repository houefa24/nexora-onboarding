import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { companySchema } from "@/lib/schemas";

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { leadId, ...companyData } = body;

        if (!leadId) {
            return NextResponse.json({ error: "leadId requis" }, { status: 400 });
        }

        const parsed = companySchema.safeParse(companyData);
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { name, siret, website, sector, size, city } = parsed.data;

        const company = await prisma.company.upsert({
            where: { siret: siret || `auto_${leadId}` },
            update: { name, website: website || null, sector, size, city: city || null },
            create: {
                name,
                siret: siret || null,
                website: website || null,
                sector,
                size,
                city: city || null,
            },
        });

        await prisma.lead.update({
            where: { id: leadId },
            data: { companyId: company.id },
        });

        return NextResponse.json({ companyId: company.id }, { status: 200 });
    } catch (error) {
        console.error("[PATCH /api/leads/company]", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}