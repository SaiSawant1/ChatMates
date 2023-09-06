"use client";
import { Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ActionToolTip from "@/components/action-tooltip";
import { cn } from "@/lib/utils";
import { channel } from "diagnostics_channel";
interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  id,
  imageUrl,
  name,
}) => {
  const router = useRouter();
  const params = useParams();
  const onClick = () => {
    router.push(`/servers/${id}`);
  };
  return (
    <ActionToolTip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-24px group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image src={imageUrl} alt="channel" fill />
        </div>
      </button>
    </ActionToolTip>
  );
};

export default NavigationItem;
