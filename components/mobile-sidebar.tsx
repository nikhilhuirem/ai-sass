"use client"

import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideBar from "@/components/sideBar";
import { use, useEffect, useState } from "react";

interface mobileSideBarProps {
    apiLimitCount: number;
    isPro: boolean;
}

export default function MobileSideBar({
    apiLimitCount,
    isPro = false
}: mobileSideBarProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu />
                </Button>
                <SheetContent className="p-0" side="left">
                    <SideBar isPro={isPro} apiLimitCount={apiLimitCount} />
                </SheetContent>
            </SheetTrigger>
        </Sheet>
    );
}