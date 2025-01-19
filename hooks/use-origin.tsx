import { useEffect, useState } from "react";

export const useOrigin = () => {
    const [mounted,setMonted]= useState(false);

    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

    useEffect(() => {
        setMonted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return origin;
};