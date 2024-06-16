"use client";

import { useRouter, usePathname } from "next/navigation";
import { useBackButton, useClosingBehavior } from "@tma.js/sdk-react";
import { useEffect } from "react";


export function useBackBtn() {
    const bb = useBackButton(); // will be undefined or BackButton.
    const close = useClosingBehavior(); // will be undefined or ClosingBehavior.
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        function goBack() {
            router.back();
        }
        if (close) {
            close.enableConfirmation()
        }

        if (bb) {
            if (pathname === "/") {
                bb.hide();
                return;
            }
            bb.show();
            bb.on("click", goBack);
        }
    }, [bb, router, pathname]);
}