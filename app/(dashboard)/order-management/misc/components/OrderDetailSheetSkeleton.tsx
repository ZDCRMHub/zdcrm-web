import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";



export default function OrderDetailSheetSkeleton() {
    return (
        <div className="w-full !max-w-[800px]">
            <header>
                <h2 className="text-xl font-semibold flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-6 w-40" />
                </h2>
            </header>

            <div className="flex justify-between pt-8">
                <div className="flex items-center gap-5">
                    <Skeleton className="h-10 w-40" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-40" />
                </div>
            </div>

            <div className="py-4 space-y-10">
                <div className="grid grid-cols-2 gap-2.5 mt-8">
                    {[1, 2].map((index) => (
                        <Card key={index} className="flex-1 bg-[#194A7A] text-white rounded-lg">
                            <CardHeader className="border-b border-[#FFC600] pb-4">
                                <CardTitle className="flex items-center justify-center gap-2 text-lg">
                                    <Skeleton className="h-6 w-6 bg-[#FFC600]" />
                                    <Skeleton className="h-6 w-32 bg-white" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 flex justify-center">
                                <div className="space-y-4 w-full">
                                    {[1, 2, 3].map((item) => (
                                        <Skeleton key={item} className="h-6 w-full bg-white" />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <section className="flex items-center gap-8 mb-16 mt-3">
                    {[1, 2, 3].map((index) => (
                        <Skeleton key={index} className="h-6 w-40" />
                    ))}
                </section>

                <section className="mt-16 mb-8">
                    <Skeleton className="h-8 w-40 mb-2" />
                    <Skeleton className="h-10 w-full" />
                </section>

                <Accordion type="single" defaultValue="product-items">
                    <section className="mb-8">
                        <AccordionItem value="product-items">
                            <AccordionTrigger>
                                <Skeleton className="h-8 w-40" />
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 mt-1">
                                    {[1, 2].map((index) => (
                                        <Skeleton key={index} className="h-40 w-full rounded-2xl" />
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </section>
                </Accordion>

                <section className="p-4 px-6 rounded-2xl border">
                    <Skeleton className="h-8 w-40 mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <React.Fragment key={index}>
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-6 w-full" />
                            </React.Fragment>
                        ))}
                    </div>
                </section>

                <section>
                    <Skeleton className="h-8 w-40" />
                </section>

                <section className="flex justify-end my-12">
                    <Skeleton className="h-12 w-40" />
                </section>

                <section className="flex flex-col gap-1.5">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                </section>
            </div>
        </div>
    );
}

