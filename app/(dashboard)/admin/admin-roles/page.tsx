import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdErrorOutline } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import { SlSettings } from "react-icons/sl";
import { BsBriefcase } from "react-icons/bs";
import { FaTreeCity } from "react-icons/fa6";
import { TbReplace } from "react-icons/tb";
import { GoPlus } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { FaSort } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";

const MENUS = [
  {
    name: "Order",
    value: "order",
    icon: <MdErrorOutline size={20} color="#A0AEC0" />,
  },
  {
    name: "Enquiries",
    value: "enquiries",
    icon: <FaTreeCity size={20} color="#A0AEC0" />,
  },
  {
    name: "Order History",
    value: "order-history",
    icon: <TbWorld size={20} color="#A0AEC0" />,
  },
  {
    name: "Order Statistics",
    value: "order-statistics",
    icon: <BsBriefcase size={20} color="#A0AEC0" />,
  },
  {
    name: "Financial Report",
    value: "financial-report",
    icon: <CiCalendarDate size={20} color="#A0AEC0" />,
  },
  {
    name: "Manage Admin",
    value: "manage-admin",
    icon: <SlSettings size={20} color="#A0AEC0" />,
  },
  {
    name: "Roles and Permission",
    value: "roles-permission",
    icon: (
      <TbReplace
        size={20}
        color="#A0AEC0"
        className="focus:bg-[#0CAF60] hover:text-[#0CAF60]"
      />
    ),
  },
];

type MenuTab = {
  name: string;
  value: string;
  icon: React.ReactNode;
};

const TabContent = () => {
  return (
    <div className="bg-white mt-3 p-7">
      <div className="flex justify-between items-center pb-7 border-b-[1px] border-[#E0E0E0]">
        <p className="text-2xl font-bold">Roles</p>
        <div className="flex gap-6 items-center">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search Roles"
              className="h-16 w-80"
            />
            <CiSearch
              size={20}
              color="#111827"
              className="absolute top-[35%] right-[24px]"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="h-14 flex gap-4 bg-[#111827] rounded-xl text-[18px] px-7">
                <GoPlus size={24} /> Add New
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold pb-8">
                  Add New Role
                </SheetTitle>
                <SheetDescription className="flex flex-col gap-3">
                  <Label htmlFor="role" className="text-[#111827]">
                    Role Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="role" type="text" className="h-14" />
                </SheetDescription>
              </SheetHeader>
              <SheetFooter className="mt-20">
                <SheetClose asChild>
                  <Button
                    type="submit"
                    className="w-full bg-white text-black border border-solid h-14"
                  >
                    Cancel
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button type="submit" className="w-full bg-[#111827] h-14">
                    Create
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="mt-7 flex gap-24">
        <div className="flex-1">
          <p className="bg-[#fafafa] p-5 text-[#687588] text-sm font-bold">
            Job Title
          </p>
          <p className="p-5 border-b-[1px] border-[#E0E0E0] text-[#111827]">
            Admin
          </p>
          <p className="p-5 border-b-[1px] border-[#E0E0E0] text-[#111827]">
            Branch Manager
          </p>
          <p className="p-5 border-b-[1px] border-[#E0E0E0] text-[#111827]">
            Delivery Representative
          </p>
          <p className="p-5 border-b-[1px] border-[#E0E0E0] text-[#111827]">
            Digital Marketer
          </p>
        </div>
        <div className="flex-1">
          <div className="text-[#687588] flex">
            <div className="flex-auto">
              <div className="p-5 flex gap-6 items-center bg-[#fafafa] font-bold text-sm">
                <p className="">Number of Employees</p>
                <FaSort />
              </div>
              <p className="p-5 border-b-[1px] border-[#E0E0E0] text-[#111827] text-sm h-[65px]">
                10
              </p>
              <p className="p-5 border-b-[1px] border-[#E0E0E0] text-[#111827] text-sm h-[65px]">
                10
              </p>
              <p className="p-5 border-b-[1px] border-[#E0E0E0] text-[#111827] text-sm h-[65px]">
                10
              </p>
              <p className="p-5 border-b-[1px] border-[#E0E0E0] text-[#111827] text-sm h-[65px]">
                10
              </p>
            </div>
            <div className="flex-1">
              <p className="p-5 bg-[#fafafa] font-bold text-sm">Active</p>
              <div className="p-5 border-b-[1px] border-[#E0E0E0] h-[65px]">
                <Switch id="admin" />
                <Label htmlFor="admin"></Label>
              </div>
              <div className="p-5 border-b-[1px] border-[#E0E0E0] h-[65px]">
                <Switch id="branch-manager" />
                <Label htmlFor="branch-manager"></Label>
              </div>
              <div className="p-5 border-b-[1px] border-[#E0E0E0] h-[65px]">
                <Switch id="delivery-rep" />
                <Label htmlFor="delivery-rep"></Label>
              </div>
              <div className="p-5 border-b-[1px] border-[#E0E0E0] h-[65px]">
                <Switch id="digital-markerter" />
                <Label htmlFor="digital-markerter"></Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const page = ({ name, value, icon }: MenuTab) => {
  return (
    <section className="mx-9 mt-10 h-[869px] bg-white rounded-xl">
      <div className="pl-20 h-20 flex items-center border-b-[1px] border-[#E0E0E0] relative">
        <p className="text-xl font-medium text-[#1E1E1E]">Permission</p>
        <div className="w-[103px] h-[3px] bg-[#194A7A] absolute bottom-0" />
      </div>
      <div className=" h-[749px] bg-[#FAFAFA] m-5">
        <Tabs
          defaultValue="order"
          orientation="vertical"
          className="flex gap-7"
        >
          <TabsList className="flex flex-col mt-5 bg-white w-[290px] h-full items-start p-7 ml-5 gap-5">
            {MENUS.map((menu) => (
              <TabsTrigger
                key={menu.name}
                value={menu.value}
                className="font-bold py-5 w-full flex gap-3 justify-start hover:bg-[#F8F8F8] hover:ml-4 focus:ml-4 focus:bg-black"
              >
                {menu.icon}
                <p>{menu.name}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="grow mr-7">
            <TabsContent value="order" className="grid">
              <TabContent />
            </TabsContent>
            <TabsContent value="enquiries" className="grid mt-0">
              <TabContent />
            </TabsContent>
            <TabsContent value="order-history" className="grid mt-0">
              <TabContent />
            </TabsContent>
            <TabsContent value="order-statistics" className="grid mt-0">
              <TabContent />
            </TabsContent>
            <TabsContent value="financial-report" className="grid mt-0">
              <TabContent />
            </TabsContent>
            <TabsContent value="manage-admin" className="grid mt-0">
              <TabContent />
            </TabsContent>
            <TabsContent value="roles-permission" className="grid mt-0">
              <TabContent />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default page;
