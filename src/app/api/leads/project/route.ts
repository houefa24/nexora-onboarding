import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectSchema, planningSchema } from "@/lib/schemas";
import { z } from "zod";

const fullProjectSchema = projectSchema.merge(planningSchema).extend({
    leadId: z.string(),
});

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("[PATCH /api/leads/project] body reçu:", JSON.stringify(body));
        const parsed = fullProjectSchema.safeParse(body);
        console.log("[PATCH /api/leads/project] validation:", parsed.success, parsed.success ? "" : JSON.stringify(parsed.error.flatten()));

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const {
            leadId,
            needs,
            description,
            budget,
            timeline,
            currentStack,
            teamSize,
            preferredDate,
            additionalNotes,
        } = parsed.data;

        const project = await prisma.project.create({
            data: {
                needs: JSON.stringify(needs),
                description,
                budget: budget || null,
                timeline: timeline || null,
                currentStack: currentStack || null,
                teamSize: teamSize || null,
                preferredDate: preferredDate ? new Date(preferredDate) : null,
                additionalNotes: additionalNotes || null,
            },
        });

        await prisma.lead.update({
            where: { id: leadId },
            data: { projectId: project.id, status: "CONTACTED" },
        });

        return NextResponse.json({ projectId: project.id }, { status: 200 });
    } catch (error) {
        console.error("[PATCH /api/leads/project]", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}