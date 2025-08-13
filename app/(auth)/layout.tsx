import Image from 'next/image'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen overflow-hidden grid md:grid-cols-2">
            <section
                className="relative w-full h-full flex items-center justify-center"
                style={{
                    background: "linear-gradient(to bottom, #0575E6, #02298A, #021B79)"
                }}
            >
                <Image
                    src="/img/ZDCRMHubLogoLarge.png"
                    className='w-[80%] max-w-[500px] mx-auto'
                    alt="Auth Background"
                    layout="fill"
                    objectFit="contain"
                    // width={"50%"}
                    // height={"auto"}
                />
            </section>

            <section>
                {children}
            </section>

        </div>
    )
}

export default layout