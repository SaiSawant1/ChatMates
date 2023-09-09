import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelFormValidator } from "@/lib/form-schema";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Invalid Request", { status: 401 });
    }
    const body: ChannelFormValidator = await request.json();
    const { name, type } = body;
    if (!name || !type) {
      return new NextResponse("Invalid Request", { status: 400 });
    }
    if (name === "general") {
      return new NextResponse("Invalid Request name cannot be general", {
        status: 400,
      });
    }
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");
    if (!serverId) {
      return new NextResponse("Invalid Request", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: { in: [MemberRole.ADMIN, MemberRole.MODERATOR] },
          },
        },
      },
      data: {
        channels: {
          create: {
            name,
            type,
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("Internal server Error", { status: 500 });
  }
}
