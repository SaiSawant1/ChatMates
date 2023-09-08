"use client";

import CreateServerModal from "@/components/modals/create-server-modal ";
import React from "react";
import InviteModal from "@/components/modals/invite-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
const ModalProvider = () => {
  const [isMounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
    </>
  );
};
export default ModalProvider;
