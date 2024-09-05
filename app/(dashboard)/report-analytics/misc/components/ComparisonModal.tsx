// import {useState} from 'react';
// import {Button} from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {X} from 'lucide-react';

// export default function ComparisonModal() {
//   const [open, setOpen] = useState(true);
//   const [metric, setMetric] = useState('Net Profit');
//   const [startMonth, setStartMonth] = useState('April');
//   const [endMonth, setEndMonth] = useState('May');

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button>Compare</Button>
//       </DialogTrigger>
//       <DialogContent className='sm:max-w-[600px]'>
//         <DialogHeader>
//           <DialogTitle className='text-xl font-bold'>COMPARISON</DialogTitle>
//           <Button
//             variant='ghost'
//             size='icon'
//             className='absolute right-4 top-4'
//             onClick={() => setOpen(false)}>
//             <X className='h-4 w-4' />
//             <span className='sr-only'>Close</span>
//           </Button>
//         </DialogHeader>
//         <div className='space-y-6 py-4'>
//           <div className='bg-secondary p-4 rounded-lg flex justify-between'>
//             <div className='flex items-center space-x-2'>
//               <span className='bg-background rounded p-1'>
//                 <svg
//                   xmlns='http://www.w3.org/2000/svg'
//                   width='24'
//                   height='24'
//                   viewBox='0 0 24 24'
//                   fill='none'
//                   stroke='currentColor'
//                   strokeWidth='2'
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   className='h-4 w-4'>
//                   <rect width='18' height='18' x='3' y='3' rx='2' />
//                   <path d='M8 12h8' />
//                   <path d='M12 8v8' />
//                 </svg>
//               </span>
//               <span className='font-semibold'>SELECT COMPARISON METRICS</span>
//             </div>
//             <Select value={metric} onValueChange={setMetric}>
//               <SelectTrigger className='w-[180px] mt-2'>
//                 <SelectValue placeholder='Select metric' />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value='Net Profit'>Net Profit</SelectItem>
//                 <SelectItem value='Revenue'>Revenue</SelectItem>
//                 <SelectItem value='Expenses'>Expenses</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className='flex justify-between items-center'>
//             <div>
//               <p className='text-sm text-muted-foreground'>Set Duration</p>
//               <Select value={startMonth} onValueChange={setStartMonth}>
//                 <SelectTrigger className='w-[100px] border-none'>
//                   <SelectValue placeholder='Start' />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value='April'>April</SelectItem>
//                   <SelectItem value='May'>May</SelectItem>
//                   <SelectItem value='June'>June</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className='bg-yellow-400 text-black font-bold px-3 py-1 rounded'>
//               To
//             </div>
//             <div>
//               <p className='text-sm text-muted-foreground'>Set Duration</p>
//               <Select value={endMonth} onValueChange={setEndMonth}>
//                 <SelectTrigger className='w-[100px]'>
//                   <SelectValue placeholder='End' />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value='April'>April</SelectItem>
//                   <SelectItem value='May'>May</SelectItem>
//                   <SelectItem value='June'>June</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div>
//             <h3 className='text-lg font-semibold mb-4'>Overview</h3>
//             <div className='grid grid-cols-2 gap-4'>
//               <div className='border p-4 rounded-lg col-span-1'>
//                 <p className='text-sm text-muted-foreground'>Net Profit</p>
//                 <p className='text-lg font-semibold'>₦1,600,600.00</p>
//               </div>
//               <div className='border p-4 rounded-lg col-span-1'>
//                 <p className='text-sm text-muted-foreground'>Net Profit</p>
//                 <p className='text-lg font-semibold'>₦2,600,600.00</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Button className='w-full' onClick={() => setOpen(false)}>
//           Close
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// }

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {X} from 'lucide-react';

export default function ComparisonModal() {
  const [open, setOpen] = useState(false);
  const [metric, setMetric] = useState('All');
  const [startYear, setStartYear] = useState('2022');
  const [endYear, setEndYear] = useState('2023');

  const comparisonData = [
    {label: 'Net Profit', value1: '₦1,600,600.00', value2: '₦2,600,600.00'},
    {label: 'Total Revenue', value1: '₦2,000,000.00', value2: '₦3,000,000.00'},
    {label: 'Total Orders', value1: '400', value2: '760'},
    {label: 'Processed Order', value1: '400', value2: '760'},
    {label: 'Completed Order', value1: '350', value2: '700'},
    {label: 'Canceled Order', value1: '50', value2: '60'},
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='px-12 py-3'>Compare</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold'>COMPARISON</DialogTitle>
          <Button
            variant='ghost'
            size='icon'
            className='absolute right-4 top-4'
            onClick={() => setOpen(false)}>
            <X className='h-4 w-4' />
            <span className='sr-only'>Close</span>
          </Button>
        </DialogHeader>
        <div className='space-y-6 py-4'>
          <div className='bg-secondary p-4 rounded-lg flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
              <span className='bg-background rounded p-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='h-4 w-4'>
                  <rect width='18' height='18' x='3' y='3' rx='2' />
                  <path d='M8 12h8' />
                  <path d='M12 8v8' />
                </svg>
              </span>
              <span className='font-semibold'>SELECT COMPARISON METRICS</span>
            </div>
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger className='w-[100px]'>
                <SelectValue placeholder='Select metric' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='All'>All</SelectItem>
                <SelectItem value='Net Profit'>Net Profit</SelectItem>
                <SelectItem value='Total Revenue'>Total Revenue</SelectItem>
                <SelectItem value='Total Orders'>Total Orders</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm text-muted-foreground'>Set Duration</p>
              <Select value={startYear} onValueChange={setStartYear}>
                <SelectTrigger className='w-[100px]'>
                  <SelectValue placeholder='Start' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='2022'>2022</SelectItem>
                  <SelectItem value='2023'>2023</SelectItem>
                  <SelectItem value='2024'>2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='bg-yellow-400 text-black font-bold px-3 py-1 rounded'>
              To
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Set Duration</p>
              <Select value={endYear} onValueChange={setEndYear}>
                <SelectTrigger className='w-[100px]'>
                  <SelectValue placeholder='End' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='2022'>2022</SelectItem>
                  <SelectItem value='2023'>2023</SelectItem>
                  <SelectItem value='2024'>2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Overview</h3>
            <div className='border rounded-lg overflow-hidden'>
              <table className='w-full'>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-secondary' : ''}>
                      <td className='p-2 border-r'>{item.label}</td>
                      <td className='p-2 border-r'>{item.value1}</td>
                      <td className='p-2'>{item.value2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Button className='w-full' onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
