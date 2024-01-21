"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export function CrispChat() {
    useEffect(() => {
        Crisp.configure("cefff97a-a2d3-420e-aa8c-baa23a0d653e");
    }, [])

    return null;
}