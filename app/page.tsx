// import React from 'react';

// const page = () => {
//   return (
//     <div>
//       <h1>Hello World</h1>
//     </div>
//   );
// };

// export default page;
'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/signup');
  }, [router]);

  return <div>Home</div>;
}
