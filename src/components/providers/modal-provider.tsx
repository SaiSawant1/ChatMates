"use client";

import CreateServerModal from "../modals/create-server-modal ";
import React from "react";
const ModalProvider = () => {
  const [isMounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <CreateServerModal />
    </>
  );
};
export default ModalProvider;
