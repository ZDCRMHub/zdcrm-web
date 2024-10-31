"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TbCubePlus } from "react-icons/tb";
import { PiCubeFocusLight } from "react-icons/pi";
import { TfiWallet } from "react-icons/tfi";
import { LiaCubesSolid, LiaUserEditSolid } from "react-icons/lia";
import { GrUpdate } from "react-icons/gr";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoIosClose } from "react-icons/io";
import { PiHashStraightFill } from "react-icons/pi";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { SelectSingleCombo } from "@/components/ui";

const stockHistory = [
  {
    historyID: "HIS001",
    quantityUsed: "12",
    quantityLeft: "12",
    amount: "N2,450",
    typeStock: "Automatic",
    staffName: "Adetola Eniola",
    lastUpdate: "Feb. 25th, 2024 5:37PM",
  },
  {
    historyID: "HIS002",
    quantityUsed: "12",
    quantityLeft: "12",
    amount: "N2,450",
    typeStock: "Automatic",
    staffName: "Adetola Eniola",
    lastUpdate: "Feb. 25th, 2024 5:37PM",
  },
  {
    historyID: "HIS003",
    quantityUsed: "12",
    quantityLeft: "12",
    amount: "N2,450",
    typeStock: "Automatic",
    staffName: "Adetola Eniola",
    lastUpdate: "Feb. 25th, 2024 5:37PM",
  },
  {
    historyID: "HIS004",
    quantityUsed: "12",
    quantityLeft: "12",
    amount: "N2,450",
    typeStock: "Automatic",
    staffName: "Adetola Eniola",
    lastUpdate: "Feb. 25th, 2024 5:37PM",
  },
  {
    historyID: "HIS004",
    quantityUsed: "12",
    quantityLeft: "12",
    amount: "N2,450",
    typeStock: "Automatic",
    staffName: "Adetola Eniola",
    lastUpdate: "Feb. 25th, 2024 5:37PM",
  },
];

const InventoryDetailsPage = () => {
  const router = useRouter();
  const [quantityCounter, setQuantityCounter] = useState(0);
  const [lowStockCounter, setLowStockCounter] = useState(0);

  const quantityPlus = () => {
    setQuantityCounter(quantityCounter + 1);
  };

  const quantityMinus = () => {
    setQuantityCounter(quantityCounter - 1);
  };

  const lowStockPlus = () => {
    setLowStockCounter(lowStockCounter + 1);
  };

  const lowStockMinus = () => {
    setLowStockCounter(lowStockCounter - 1);
  };







  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(undefined);

  return (
    <section className="mx-16 mt-8">
      <div className="flex gap-6 flex-col">
        <button onClick={() => router.back()}>
          <FaArrowLeftLong size={20} />
        </button>
        <h1 className="uppercase text-xl font-bold">view sandra red wine</h1>
      </div>

      {
        
        <SelectSingleCombo
          placeholder='Variations'
          options={[
            { label: '6 inches', value: '6 inches' },
            { label: '8 inches', value: '8 inches' },
            { label: '12 inches', value: '12 inches' }
          ]}
          className='w-96 !h-12 text-[#8B909A] text-xs mt-4'
          placeHolderClass='text-[#8B909A] text-xs'
          triggerColor='#8B909A'
          value={selectedVariant}
          onChange={(value) => setSelectedVariant(value)}
          name="variations"
          valueKey="value"
          labelKey="label"
        />
      }
      <div className="mt-[67px] flex gap-[110px]">
        <div className="p-8 bg-[#F6F6F6] rounded-xl w-[522px] shadow-inner shadow-white">
          <p className="text-2xl font-medium text-center mb-3">Stock</p>
          <div className="bg-white py-9 rounded-[20px] items-center flex flex-col gap-4">
            <p className="text-[18px] uppercase">Quantity at hand</p>
            <p className="text-2xl text-[#113770] font-bold">18</p>
            <Dialog>
              <DialogTrigger asChild className="cursor-pointer">
                <Button className="bg-[#1E1E1E] rounded-none text-sm w-[161px]">
                  Adjust Stock
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col gap-8 w-[596px] px-8 py-8 pt-16">
                <DialogClose className="absolute right-8">
                  <IoIosClose size={30} />
                </DialogClose>
                <DialogHeader className="">
                  <DialogTitle className="text-xl font-semibold uppercase">
                    stock adjustment
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-9 bg-[#72ADE614] h-24 rounded-xl py-3 pl-5 flex gap-10 items-center">
                  <Image
                    src="/img/cake1.png"
                    alt="cake"
                    width={78}
                    height={69}
                    className="rounded-xl"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="uppercase font-bold">Chocolate cake</h3>
                    <div className="flex gap-3">
                      <PiHashStraightFill />
                      <p className="text-xs">
                        Stocked Product:{" "}
                        <span className="font-semibold">12 in stock</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs">Quantity</p>
                    <div className="border border-solid border-[#E1E1E1] py-3 px-[18px] flex gap-12 mt-2">
                      <div className="cursor-pointer" onClick={quantityMinus}>
                        <CiCircleMinus size={20} />
                      </div>
                      <div className="font-bold text-sm">{quantityCounter}</div>
                      <div className="cursor-pointer" onClick={quantityPlus}>
                        <CiCirclePlus size={20} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs">Low in Stock</p>
                    <div className="border border-solid border-[#E1E1E1] py-3 px-[18px] flex gap-12 mt-2">
                      <div className="cursor-pointer" onClick={lowStockMinus}>
                        <CiCircleMinus size={20} />
                      </div>
                      <div className="font-bold text-sm">{lowStockCounter}</div>
                      <div className="cursor-pointer" onClick={lowStockPlus}>
                        <CiCirclePlus size={20} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="price" className="text-xs font-extrabold">
                    Cost Price (₦)
                  </Label>
                  <Input id="price" type="number" className="mt-2" />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-[#17181C] mt-28 mb-3 w-full p-6 h-[70px] rounded-[10px]"
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div>
          <p className="uppercase pb-[22px]">additional sales data</p>
          <Button className="flex gap-[60px] bg-transparent border border-solid border-[#B8BBC2] text-[#111827] rounded-[8px] text-sm px-[18px] py-3">
            Today
            <IoChevronDown />
          </Button>
          <div className="mt-12 flex gap-6">
            <div className="w-[235px] h-[117.5px] bg-[#194A7A] relative">
              <Image
                src="/img/MaskGroup1.svg"
                alt="masked"
                width={235}
                height={117.5}
                className="absolute top-0"
              />
              <p className="font-semibold text-white pl-[18px] pt-6 pb-[18px]">
                Quantity Sold
              </p>
              <div className="flex items-center gap-3">
                <p className="font-extrabold text-[30px] text-white pl-[18px]">
                  18
                </p>
                <BiSolidUpArrow color="#fff" size={24} />
              </div>
            </div>
            <div className="w-[235px] h-[117.5px] bg-[#332A7C] relative">
              <Image
                src="/img/MaskGroup2.svg"
                alt="masked"
                width={235}
                height={117.5}
                className="absolute top-0"
              />
              <p className="font-semibold text-white pl-[18px] pt-6 pb-[18px]">
                Profit
              </p>
              <div className="flex items-center gap-3">
                <p className="font-extrabold text-[30px] text-white pl-[18px]">
                  ₦2,450
                </p>
                <BiSolidDownArrow color="#fff" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h3 className="uppercase mb-[18px]">stock history</h3>
        <div className="px-12 bg-white pt-8 pb-28 rounded-[20px] border border-solid border-[#FCF0F2] mb-14">
          <Table className="">
            <TableHeader className="">
              <TableRow className="border-none">
                <TableHead className="w-[15%]">
                  <div className="flex gap-3 justify-center items-center">
                    <TbCubePlus size={20} />
                    Quantity Used
                  </div>
                </TableHead>
                <TableHead className="w-[15%]">
                  <div className="flex gap-3 justify-center items-center">
                    <PiCubeFocusLight size={20} />
                    Quantity Left
                  </div>
                </TableHead>
                <TableHead className="w-[15%]">
                  <div className="flex gap-3 justify-center items-center">
                    <TfiWallet size={20} />
                    Amount
                  </div>
                </TableHead>
                <TableHead className="w-[15%]">
                  <div className="flex gap-3 justify-center items-center">
                    <LiaCubesSolid size={24} />
                    Type of Stock Update
                  </div>
                </TableHead>
                <TableHead className="w-[15%]">
                  <div className="flex gap-3 justify-center items-center">
                    <LiaUserEditSolid size={22} />
                    Staff Name
                  </div>
                </TableHead>
                <TableHead className="w-[15%]">
                  <div className="flex gap-3 justify-center items-center">
                    <GrUpdate size={20} color="#E01E1F" />
                    Last Updated
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {stockHistory.map((history) => (
                <TableRow key={history.historyID} className="text-center">
                  <TableCell>{history.quantityUsed}</TableCell>
                  <TableCell>{history.quantityLeft}</TableCell>
                  <TableCell>{history.amount}</TableCell>
                  <TableCell>{history.typeStock}</TableCell>
                  <TableCell>{history.staffName}</TableCell>
                  <TableCell>{history.lastUpdate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default InventoryDetailsPage;
