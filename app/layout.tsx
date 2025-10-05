import type { Metadata } from 'next';
import { DM_Sans, Manrope, Poppins } from 'next/font/google';
import './globals.css';
import { AllProviders } from '@/contexts';
import { Toaster } from 'react-hot-toast';
import { cn } from '@/lib/utils';

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'ZDCRM Hub',
  description: 'Built by Oni Khalid',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        // className={`${dmSans.className} ${poppins.variable} ${manrope.variable}` }
      className={cn(dmSans.className, poppins.variable, manrope.variable, "w-screen h-screen overflow-hidden")}
      >
        <AllProviders>
          {children}
        </AllProviders>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            className: 'z-[20000051]',
            error: {
              style: {
                background: 'red',
                color: 'white',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
