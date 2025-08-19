import React from 'react'
import { MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarItem } from './ui'
import { Check, Circle } from 'lucide-react';
import { Suitcase } from '@phosphor-icons/react';
import { ZONES_OPTIONS } from '@/constants';
import { Location, User } from 'iconsax-react';
import { useGetAllUsers } from '@/app/(dashboard)/admin/employees-role/misc/api';

interface Props {
    selectedBusiness: string | null;
    selectedRep: number | null;
    selectedDeliveryZone: string | null;
    setSelectedBusiness: (business: string | null) => void;
    setSelectedRep: (rep: number | null) => void;
    setSelectedDeliveryZone: (zone: string | null) => void;
}

const UniversalFilters = ({ selectedBusiness, selectedRep, selectedDeliveryZone,
    setSelectedBusiness, setSelectedRep, setSelectedDeliveryZone

}: Props) => {
    const businesses = [
        { id: 1, name: 'Business 1' },
        { id: 2, name: 'Business 2' },
        { id: 3, name: 'Business 3' },
    ]
    const { data: employees, isLoading: isLoadingEmployees } = useGetAllUsers();

    return (
        <>
            <MenubarSub>
                <MenubarSubTrigger className="relative py-3 flex items-center gap-2"><Suitcase size={18} />
                    Business
                    {
                        selectedBusiness && <Circle size={6} className='absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full' />
                    }
                </MenubarSubTrigger>
                <MenubarSubContent>
                    {
                        businesses?.map((business) => (
                            <MenubarItem key={business.id} onClick={() => setSelectedBusiness(business.name)}>
                                {
                                    selectedBusiness === business.name && <Check className='mr-2 h-4 w-4' />
                                }
                                {business.name}
                            </MenubarItem>
                        ))
                    }
                </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
                <MenubarSubTrigger className="relative py-3 flex items-center gap-2"><Location size={18} />
                    Delivery Zone
                    {
                        selectedDeliveryZone && <Circle size={6} className='absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full' />
                    }
                </MenubarSubTrigger>
                <MenubarSubContent>
                    {
                        ZONES_OPTIONS?.map((zone) => (
                            <MenubarItem key={zone.value} onClick={() => setSelectedDeliveryZone(zone.value)}>
                                {
                                    selectedDeliveryZone === zone.value && <Check className='mr-2 h-4 w-4' />
                                }
                                {zone.label}
                            </MenubarItem>
                        ))
                    }
                </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
                <MenubarSubTrigger className="relative py-3 flex items-center gap-2"><User size={18} />
                    Customer Rep
                    {
                        selectedRep && <Circle size={6} className='absolute top-0 right-0 text-[#FF4D4F] bg-[#FF4D4F] rounded-full' />
                    }
                </MenubarSubTrigger>
                <MenubarSubContent>
                    {
                        employees?.data?.map((employee) => (
                            <MenubarItem key={employee.id} onClick={() => setSelectedRep(employee.id)}>
                                {
                                    selectedRep === employee.id && <Check className='mr-2 h-4 w-4' />
                                }
                                {employee.name}
                            </MenubarItem>
                        ))
                    }
                </MenubarSubContent>
            </MenubarSub>
        </>
    )
}

export default UniversalFilters