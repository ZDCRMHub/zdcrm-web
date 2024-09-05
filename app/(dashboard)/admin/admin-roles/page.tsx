import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <section className="mx-9 mt-10 h-[869px] bg-white rounded-xl">
      <div className="pl-20 h-20 flex items-center border-b-[1px] border-[#E0E0E0] relative">
        <p className="text-xl font-medium text-[#1E1E1E]">Permission</p>
        <div className="w-[103px] h-[3px] bg-[#194A7A] absolute bottom-0" />
      </div>
      <div className=" h-[749px] bg-[#FAFAFA] m-5">
        <Tabs
          defaultValue="account"
          orientation="vertical"
          className="flex"
        >
          <TabsList className="flex flex-col max-w-[250px]">
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
            <TabsTrigger value="three">Three</TabsTrigger>
            <TabsTrigger value="four">Four</TabsTrigger>
          </TabsList >
          <div className="grow">
            <TabsContent value="one" className="grid">
              One changes to your account here.
            </TabsContent>
            <TabsContent value="two" className="grid">
              Two changes to your account here.
            </TabsContent>
            <TabsContent value="three" className="grid">
              Three changes to your account here.
            </TabsContent>
            <TabsContent value="four" className="grid">
              Four changes to your account here.
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default page;
