import React from 'react';

const OrderPageSkeleton = () => {
    return (
        <div className="flex flex-col grow h-full px-8 animate-pulse">
            <header className="flex items-center border-b border-b-[#00000021] w-full pt-4 pb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2" />
                <div className="w-40 h-6 bg-gray-300 rounded" />
            </header>

            <section className="size-full my-auto flex flex-col items-center justify-center">
                <div className="bg-gray-300 w-full max-w-[800px] h-48 rounded-xl mb-9" />

                <article className="grid grid-cols-[0.85fr,1fr] gap-5 justify-around p-4 px-6 border border-[#0F172B1A] rounded-3xl w-full max-w-[800px] mx-auto">
                    <section className="flex flex-col items-center justify-center gap-4 p-4 py-6 border border-gray-300 rounded-3xl">
                        <div className="w-full h-6 bg-gray-300 rounded" />
                        <div className="w-3/4 h-6 bg-gray-300 rounded" />
                        <div className="w-1/2 h-6 bg-gray-300 rounded" />
                        <div className="w-1/3 h-10 bg-gray-300 rounded" />
                    </section>

                    <section className="flex flex-col items-center justify-around gap-4 p-4 border border-gray-300 rounded-3xl">
                        <div className="w-full h-6 bg-gray-300 rounded" />
                        <div className="w-3/4 h-6 bg-gray-300 rounded" />
                        <div className="w-full h-6 bg-gray-300 rounded" />
                        <div className="w-3/4 h-6 bg-gray-300 rounded" />
                    </section>
                </article>

                <div className="share-link-section p-4 text-center w-full">
                    <div className="w-48 h-14 bg-gray-300 rounded mx-auto" />
                </div>
            </section>
        </div>
    );
};

export default OrderPageSkeleton;

