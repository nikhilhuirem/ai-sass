"use client";

import { useState,useEffect } from "react";
import { ProModal } from "@/components/pro-modal";

export function ModalProvider() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if(!mounted) {
        return null;
    }

    return (
        <>
            <ProModal />
        </>
    )
}