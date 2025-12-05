"use client";
import {
  Notepad2,
  ArrowLeft2,
  UserOctagon,
  Call,
  Calendar,
  Truck,
  Location,
  Link,
} from "iconsax-react";
import React from "react";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import ProgressTimeline from "./ProgressTimeline";

const CompleteOrderPage = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col grow min-h-full px-8 pb-8">
      <header className="flex items-center border-b border-b-[#00000021] w-full pt-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={goBack}
        >
          <ArrowLeft2 className="h-6 w-6 text-[#A0AEC0]" />
        </Button>
        <p className="relative flex items-center gap-2 text-base text-[#111827] w-max p-1">
          <Notepad2 size={19} />
          Complete order
          <span className="absolute h-[2px] w-full bottom-[-6px] left-0 bg-black" />
        </p>
      </header>

      <section className="size-full my-auto pt-12 flex flex-col items-center justify-center">
        <ProgressTimeline orderNumber="#127777489-DL-LG" currentStep={1} />

        {/* Outer Card */}
        <article className="w-full max-w-[1000px] mx-auto mt-9 border border-[#D9D9D9] rounded-3xl px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <section className="flex flex-col justify-between border border-black rounded-3xl px-5 py-6">
              <div>
                <div className="flex items-center text-sm mb-3 text-[#4A5568]">
                  <Notepad2 size="20" className="mr-2" color="#292D32" />
                  <span className="font-medium text-black">Order</span>
                </div>

                <div className="space-y-1 text-base text-[#0F172B] font-semibold pl-2">
                  <p>Adeline Faultline Cake</p>
                  <p>Adelya – Red Roses Bouquet</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="font-semibold tracking-wide">TOTAL</span>
                <span className="text-[#E11D28] font-bold text-base">
                  ₦120,000.00
                </span>
              </div>
            </section>

            <section className="flex flex-col items-center justify-center gap-1 border border-black rounded-3xl px-5 py-6 text-center">
              <div className="flex items-center text-sm mb-1 font-medium text-black">
                <Truck variant="Bold" size="24" className="mr-2" color="#292D32" /> Driver
              </div>
              <div className="font-medium text-lg md:text-xl">
                ID : 222-111-33
              </div>
              <div className="name text-[#194A7A] font-semibold text-xl md:text-2xl">
                Matthew Yinka
              </div>
              <div className="platform text-xs md:text-sm text-[#194A7A] mt-1">
                Rider Platform:{" "}
                <a href="#" className="text-[#194A7A] underline font-medium">
                  GIG
                </a>
              </div>
              <div className="mt-3">
                <Button className="mt-1 h-9 w-full text-sm max-w-[140px]" variant="black" size="md">
                  <Call size="20" className="mr-2" /> Call
                </Button>
              </div>
            </section>

            <section className="flex flex-col justify-between border border-black rounded-3xl px-5 py-6">
              <div className="space-y-3 text-sm text-[#2D3748]">
                <div className="flex items-start gap-2">
                  <UserOctagon size="20" className="mt-[2px]" color="#292D32" />
                  <div>
                    <p className="font-semibold text-xs uppercase tracking-wide text-[#292D32]">
                      Recipient Name
                    </p>
                    <p className="font-medium text-sm text-[#1A202C]">
                      Adeola Bukola
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Location size="20" className="mt-[2px]" color="#292D32" />
                  <div>
                    <p className="font-semibold text-xs uppercase tracking-wide text-[#292D32]">
                      Address
                    </p>
                    <p className="text-sm text-[#1A202C]">
                      No. 8, Adeniran close, Lekki Phase 1
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Truck size="20" className="mt-[2px]" color="#292D32" />
                  <div>
                    <p className="font-semibold text-xs uppercase tracking-wide text-[#292D32]">
                      Delivery Zone
                    </p>
                    <p className="text-sm text-[#1A202C]">Lagos Island</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar size="20" className="mt-[2px]" color="#292D32" />
                  <div>
                    <p className="font-semibold text-xs uppercase tracking-wide text-[#292D32]">
                      Expected Date
                    </p>
                    <p className="text-sm text-[#1A202C]">31, Aug 2024</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </article>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="px-8 h-14 rounded-xl bg-[#123A7A] hover:bg-[#0E2E5F] text-white flex items-center justify-center">
            <Link size="24" className="mr-2" /> Share Delivery Link
          </Button>

          <Button className="px-8 h-14 rounded-xl bg-[#C53030] hover:bg-[#9B2C2C] text-white flex items-center justify-center">
            Cancel Order
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CompleteOrderPage;
