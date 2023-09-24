import { currentProfile } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIO } from "@/types";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const profile = await currentProfile(req);
    const { content, fileUrl } = req.body;
    const { conversationId } = req.query;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!conversationId) {
      return res.status(401).json({ error: "channelId missing " });
    }
    if (!content) {
      return res.status(401).json({ error: "content missing " });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            memberOne: {
              profileId: profile.id,
            },
          },
          {
            memberTwo: {
              profileId: profile.id,
            },
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid Request", { status: 400 });
    }

    const member =
      conversation.memberOne.profileId === profile.id
        ? conversation.memberOne
        : conversation.memberTwo;

    if (!member) {
      return new NextResponse("Invalid Request", { status: 400 });
    }
    const message = await db.directMessage.create({
      data: {
        content,
        fileUrl,
        conversationId: conversationId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${conversationId}:messages`;
    res.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}
