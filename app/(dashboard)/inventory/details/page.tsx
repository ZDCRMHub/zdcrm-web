import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
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
  return (
    <section className="mx-16 mt-8">
      <div className="flex gap-6 flex-col">
        <FaArrowLeftLong size={20} />
        <h1 className="uppercase text-xl font-bold">view sandra red wine</h1>
      </div>
      <div className="mt-[67px] flex gap-[110px]">
        <div className="p-8 bg-[#F6F6F6] rounded-xl w-[522px] shadow-inner shadow-white">
          <p className="text-2xl font-medium text-center mb-3">Stock</p>
          <div className="bg-white py-9 rounded-[20px] items-center flex flex-col gap-4">
            <p className="text-[18px] uppercase">Quantity at hand</p>
            <p className="text-2xl text-[#113770] font-bold">18</p>
            <Button className="bg-[#1E1E1E] rounded-none text-sm w-[161px]">
              Adjust Stock
            </Button>
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
                  N2,450
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
          <Table>
            <TableHeader>
              <TableRow className="border-none">
                <TableHead className="">Quantity Used</TableHead>
                <TableHead className="">Quantity Left</TableHead>
                <TableHead className="">Amount</TableHead>
                <TableHead className="">Type of Stock Update</TableHead>
                <TableHead className="">Staff Name</TableHead>
                <TableHead className="">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {stockHistory.map((history) => (
                <TableRow key={history.historyID} className="">
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
