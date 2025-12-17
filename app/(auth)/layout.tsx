import Image from 'next/image'
import React from 'react'
import AuthLine from "@/public/img/auth-line.png"

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
                    className='w-[60%] max-w-[380px] mx-auto'
                    alt="Auth Background"
                    layout="fill"
                    objectFit="contain"
                />
                <div className='absolute left-0 bottom-0 w-[40%]'>
                    <Image
                        src={AuthLine}
                        className='  object-cover'
                        alt="Auth Line"
                    />
                </div>
            </section>

            <section>
                {children}
            </section>

        </div>
    )
}

export default layout