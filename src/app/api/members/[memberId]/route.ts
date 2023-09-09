import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(request.url);
    const { role } = await request.json();
    const serverId = searchParams.get("serverId");
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!role) return new NextResponse("Invalid Request", { status: 400 });
    if (!serverId) return new NextResponse("Invalid Request", { status: 400 });
    if (!params.memberId) {
      return new NextResponse("Invalid Request", { status: 400 });
    }

    const server = await db.server.findUnique({
      where: {
        id: serverId,
      },
    });

    if (!server) {
      return new NextResponse("Server Not Found", { status: 404 });
    }

    const serverUpdate = await db.server.update({
      where: {
        id: server.id,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return NextResponse.json(serverUpdate);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { memberId } = params;
    if (!memberId) return new NextResponse("Invalid Request", { status: 400 });

    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get("serverId");
    if (!serverId) return new NextResponse("Invalid Request", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
