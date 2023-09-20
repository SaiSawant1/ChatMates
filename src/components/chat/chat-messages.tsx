"use client";

import { Member } from "@prisma/client";
import ChatWelcome from "@/components/chat/chat-welcome";

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramsKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  apiUrl,
  type,
  member,
  name,
  chatId,
  paramsKey,
  socketUrl,
  paramValue,
  socketQuery,
}) => {
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
    </div>
  );
};

export default ChatMessages;
