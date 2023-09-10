import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerFormValidator } from "@/lib/form-schema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const { name, imageUrl } = await request.json();

    //check if the name exits.
    if (!name || !imageUrl) {
      return new Response("Invalid Request", { status: 400 });
    }
    //get the current user profile;
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    //get the server & check if the current user is allowed to update the server
    const server = await db.server.findUnique({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });
    if (!server) {
      return new NextResponse("Server Not Found", { status: 404 });
    }
    // update new server.
    const updatedServer = await db.server.update({
      where: {
        id: server.id,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });
    return NextResponse.json(updatedServer);
  } catch (error) {
    return new NextResponse(`SERVER_PATCH_ERROR ${error}`, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    //get the current user profile;
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse(`SERVER_DELETE_ERROR ${error}`, { status: 500 });
  }
}
