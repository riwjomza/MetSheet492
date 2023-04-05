import { useEffect } from "react";

// How to use
//useBlockScroll(block)
//you need th pass boolean for block scroll
const useBlockScroll = (block: boolean) => {
  useEffect(() => {
    //get original body overflow
    const original: any = document.body.style.overflow;

    //prevent scrolling on mount
    document.body.style.overflow = "hidden";

    //re-enable scrolling when component unmounts
    if (!block) {
      document.body.style.overflow = original || "";
    }
    return () => (document.body.style.overflow = original || "");
  }, [block]);
};

export default useBlockScroll;
