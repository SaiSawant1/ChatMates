import { Server, Member, Profile } from "@prisma/client";

export type ServerWithMemberWithProfiles = Server & {
  members: (Member & {
    profile: Profile;
  })[];
};
