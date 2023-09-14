"use client";

import { Search } from "lucide-react";
import React from "react";
import {
  CommandEmpty,
  CommandList,
  CommandDialog,
  CommandInput,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useParams, useRouter } from "next/navigation";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}
const ServerSearch: React.FC<ServerSearchProps> = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const params = useParams();
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);
    if (type === "member") {
      router.push(`/server/${params?.serverId}/conversations/${id}`);
    }
    if (type === "channel") {
      router.push(`/server/${params?.serverId}/channels/${id}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          Search
        </p>
        <kbd
          className="pointer-events-none inline-flex h-5 select-none items-center
        gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium
        text-muted-foreground ml-auto"
        >
          <span className="text-xs ">win +</span>k
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={() => setOpen(false)}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {data.map(({ data, label, type }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      onSelect={() => onClick({ id, type })}
                      key={id}
                    >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
export default ServerSearch;
