// import React from 'react';
// import {Progress} from '@/components/ui/progress';

// export default function TopProductsTable() {
//   const products = [
//     {
//       id: '01',
//       name: 'Adeline Faultline Cake',
//       popularity: 90,
//       orders: 55,
//       color: 'bg-blue-500',
//     },
//     {
//       id: '02',
//       name: 'Isabella White Roses Box',
//       popularity: 85,
//       orders: 40,
//       color: 'bg-green-500',
//     },
//     {
//       id: '03',
//       name: 'Adelya - Red Roses Bouquets',
//       popularity: 75,
//       orders: 34,
//       color: 'bg-purple-500',
//     },
//     {
//       id: '04',
//       name: 'Large size teddy',
//       popularity: 60,
//       orders: 25,
//       color: 'bg-orange-500',
//     },
//     {
//       id: '05',
//       name: 'Large size teddy',
//       popularity: 40,
//       orders: 15,
//       color: 'bg-sky-500',
//     },
//   ];

//   return (
//     <div className='w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6'>
//       <h2 className='text-3xl font-bold mb-6'>Top Products</h2>
//       <div className='overflow-x-auto'>
//         <table className='w-full'>
//           <thead>
//             <tr className='border-b'>
//               <th className='py-2 px-4 text-left text-gray-500'>#</th>
//               <th className='py-2 px-4 text-left text-gray-500'>Name</th>
//               <th className='py-2 px-4 text-left text-gray-500'>Popularity</th>
//               <th className='py-2 px-4 text-left text-gray-500'>Sales</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(product => (
//               <tr key={product.id} className='border-b last:border-b-0'>
//                 <td className='py-4 px-4 text-gray-600'>{product.id}</td>
//                 <td className='py-4 px-4 text-deep-black'>{product.name}</td>
//                 <td className='py-4 px-4 w-1/3'>
//                   <Progress
//                     value={product.popularity}
//                     className={`h-2 ${product.color}`}
//                   />
//                 </td>
//                 <td className='py-4 px-4'>
//                   <span
//                     className={`px-3 py-1 border rounded-full text-sm border-${
//                       product.color.split('-')[1]
//                     }-500 ${product.color} bg-opacity-20 text-${
//                       product.color.split('-')[1]
//                     }-700 flex text-nowrap`}>
//                     {product.orders} Orders
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React from 'react';

const products = [
  {
    id: 1,
    name: 'Adeline Faultline Cake',
    popularity: 70,
    orders: 55,
    color: 'blue',
  },
  {
    id: 2,
    name: 'Isabella White Roses Box',
    popularity: 60,
    orders: 40,
    color: 'green',
  },
  {
    id: 3,
    name: 'Adelya – Red Roses Bouquets',
    popularity: 50,
    orders: 34,
    color: 'purple',
  },
  {
    id: 4,
    name: 'Large size teddy',
    popularity: 40,
    orders: 25,
    color: 'orange',
  },
  {id: 5, name: 'Large size teddy', popularity: 20, orders: 15, color: 'sky'},
];

const TopProductsTable = () => {
  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden w-[50%]'>
      <div className='px-6 py-4'>
        <h2 className='text-xl font-normal text-gray-800'>Top Products</h2>
      </div>
      <table className='w-full text-left'>
        <thead>
          <tr className='bg-gray-100 text-gray-600 uppercase text-sm leading-normal'>
            <th className='py-3 px-6'>#</th>
            <th className='py-3 px-6'>Name</th>
            <th className='py-3 px-6'>Popularity</th>
            <th className='py-3 px-6'>Sales</th>
          </tr>
        </thead>
        <tbody className='text-gray-600 text-sm font-light'>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className='border-b border-gray-200 hover:bg-gray-100'>
              <td className='py-3 px-6 text-center'>{`0${index + 1}`}</td>
              <td className='py-3 px-6'>{product.name}</td>
              <td className='py-3 px-6'>
                <div className='flex items-center'>
                  <div
                    className={`w-full bg-${product.color}-500 bg-opacity-20 rounded-full h-1`}>
                    <div
                      className={`h-1 rounded-full bg-${product.color}-500`}
                      style={{width: `${product.popularity}%`}}></div>
                  </div>
                </div>
              </td>
              <td className={`py-3 px-6`}>
                <div
                  className={`text-${product.color}-500 bg-${product.color}-500 bg-opacity-20 text-center rounded-md border border-${product.color}-800`}
                  style={{borderColor: product.color}}>
                  {product.orders} Orders
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsTable;
