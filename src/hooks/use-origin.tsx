import React from "react";
const useOrigin = () => {
  const [isMounted, setMounted] = React.useState<boolean>(false);
  const currentOrigin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) return null;
  return currentOrigin;
};

export default useOrigin;