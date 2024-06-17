"use client";
import React, { useEffect } from "react";
import { useMainButton } from "@tma.js/sdk-react";

import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

function Confirm({ network }: { network: string }) {
  const mainBtn = useMainButton();

  function handleClick() {
    mainBtn.enable();
    mainBtn.setParams({
      backgroundColor: "#12AAdf",
      text: "Get Testnet Tokens",
      isVisible: true,
    });
  }
  useEffect(() => {
    if (!mainBtn) return;
    mainBtn.on("click", handleFaucet);

    return () => {
      mainBtn.off("click", handleFaucet);
    };
  }, [mainBtn]);

  function handleClose() {
    mainBtn.disable();
    mainBtn.hide();
  }

  async function handleFaucet() {
    mainBtn.showLoader();
    mainBtn.setBackgroundColor("#828493");
    setTimeout(async () => {
      console.log("Faucet Requested");
      mainBtn.setBackgroundColor("#12AAdf");
      mainBtn.hideLoader();
    }, 2000);
  }
  return (
    <div>
      <Drawer onClose={handleClose}>
        <DrawerTrigger>
          <Button variant="faucet" size="full" onClick={handleClick}>
            Get the faucet Now
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-sky-blue text-navy">
          <DrawerHeader>
            <DrawerTitle className="text-3xl p-4 text-left">
              Request some faucet
            </DrawerTitle>
            <DrawerDescription className="w-full text-left px-4 text-navy">
              <div className="py-3">
                <h4 className="text-lg mb-3">Guidelines</h4>
                <div className="text-black tracking-tighter flex flex-col gap-2">
                  <p>Faucet Drips every 24 hours</p>
                  <p>
                    Wallets with more than 0.01 Eth on Mainnet/ Arbitrum One
                    will be dripped 0.2 ETH
                  </p>
                  <p>
                    Wallets with less than 0.01 Eth on Mainnet/ Arbitrum One
                    will be dripped 0.1 ETH
                  </p>
                </div>
              </div>
              <h1 className="mt-2 text-navy">Enter the Address</h1>
              <Input
                name="address"
                placeholder="0xdb1.."
                className="w-full -mb-4"
              />
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            {/* <DrawerClose className="">
              <Button variant="outline" size="small" onClick={handleClose}>
                Cancel
              </Button>
            </DrawerClose> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Confirm;
