import React from 'react'
import { DateRange } from 'react-day-picker'
import { Controller, useForm } from 'react-hook-form'
import { subMonths } from 'date-fns'

import { useGetAllBranches } from '@/app/(dashboard)/admin/businesses/misc/api';
import SelectSingleSimple from '@/components/ui/selectSingleSimple'

import { useGetFinancialReportStats, useGetOrderStats } from '../../api'
import OrderStatsCard from './FinancialStatsCard'
import OrderStatsCardSkeleton from './OrderStatsSkeleton'
import { RangeAndCustomDatePicker, Spinner } from '@/components/ui'


const today = new Date();
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
const monthsAgo = subMonths(new Date(), 20);


const FinancialStatsHeaderSection = () => {
    const { data: allBranches, isLoading: isFetchingBranch } = useGetAllBranches()

    const { control, register, watch, setValue } = useForm<{
        branch?: string;
        date: DateRange;
        period: "today" | "week" | "month" | "year" | "custom";
    }>({
        defaultValues: {
            branch: undefined,
            date: {
                from: monthsAgo,
                to: tomorrow,
            },
            period: 'today',
        },
    });
    const { data: financial_stats, isLoading: isLoadingStats, isFetching: isFetchingStats } = useGetFinancialReportStats({
        branch: watch('branch') == "all" ? undefined : watch('branch'),
        date_from: watch('date').from?.toISOString().split('T')[0],
        date_to: watch('date').to?.toISOString().split('T')[0],
        period: watch('period'),

    })


    return (
        <div>
            <header className='flex justify-between items-center mb-6'>
                <h1 className='flex items-center gap-2 text-2xl md:text-[1.7rem] font-medium text-[#17181C] '>
                    Financial Report
                    {
                        isFetchingStats && <Spinner />
                    }
                </h1>
                <div className="flex items-center gap-4 flex-wrap max-w-max">
                    <Controller
                        name='branch'
                        control={control}
                        render={({ field }) => (
                            <SelectSingleSimple
                                {...field}
                                onChange={(new_value) => setValue('branch', new_value)}
                                value={watch('branch')}
                                isLoadingOptions={isFetchingBranch}
                                options={[{ label: "All Branches", value: "all" }, ...(allBranches?.data.map(branch => ({ label: branch.name, value: branch.id.toString() })) || [])]}
                                labelKey="label"
                                valueKey="value"
                                placeholder='Filter Branch'
                                variant="light"
                                size="thin"
                            />
                        )}
                    />
                    <RangeAndCustomDatePicker
                        className="max-w-max"
                        variant="light"
                        size="thin"
                        onChange={(value) => {
                            if (value.dateType === 'custom' && value.from && value.to) {
                                setValue('date', { from: value.from, to: value.to });
                                setValue('period', 'custom');
                            } else {
                                setValue('period', value.dateType as "today" | "week" | "month" | "year" | "custom");
                            }
                        }}
                        value={{
                            dateType: watch('period'),
                            from: watch('date').from,
                            to: watch('date').to
                        }}
                    />
                </div>
            </header>
            <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4'>
                {
                    isLoadingStats &&
                    Array.from({ length: 8 }).map((_, index) => <OrderStatsCardSkeleton key={index} />)
                }
                {
                    Object.entries(financial_stats?.data || {}).map(([key, value], index) =>
                        <OrderStatsCard
                        key={index}
                            key_text={key}
                            value={value}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default FinancialStatsHeaderSection