"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "leaveServer";
  const { server } = data;
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isModalOpen}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Leave Servers
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave this server{" "}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>{" "}
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4 ">
          <div className="flex items-center justify-between w-full">
            <Button disabled={loading} variant={"ghost"} onClick={onClose}>
              {" "}
              Cancel
            </Button>
            <Button disabled={loading} variant={"primary"} onClick={onClick}>
              {" "}
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
