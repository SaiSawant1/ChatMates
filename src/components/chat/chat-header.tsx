import { Hash } from "lucide-react";
import MobileToggle from "@/components/mobile-toggle";
import UserAvatar from "../user-avatar";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  serverId,
  type,
  imageUrl,
}) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && (
        <UserAvatar className="h-8 w-8 md:h-8 md:w-8 mr-2" src={imageUrl} />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
    </div>
  );
};
export default ChatHeader;
