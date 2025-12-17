import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuth } from '@/contexts/auth'

interface SidebarLinkProps {
  icon: React.ReactNode
  link: string
  text: string
  isCollapsed: boolean
  requiredPermissions?: string[]
}

export function SidebarLink({ icon, link, text, isCollapsed, requiredPermissions = [] }: SidebarLinkProps) {
  const pathname = usePathname()
  const isSelected = pathname === link || pathname.startsWith(link)
  const { user } = useAuth()

  const hasPermission = requiredPermissions.length === 0 || requiredPermissions.some(permission => user?.permissions.includes(permission))

  if (!hasPermission) return null

  const linkContent = (
    <span className={cn("flex items-center gap-2 text-[#8B909A]", isSelected && 'text-white')}>
      <span className="h-5 w-5 shrink-0">
        {icon}
      </span>
      {!isCollapsed && <span>{text}</span>}
    </span>
  )

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            className={cn(
              'flex grow items-center justify-between gap-1 p-3 font-dm-sans text-[0.9375rem] transition duration-500 ease-in-out hover:bg-sidebar-link-active hover:bg-opacity-60 md:py-2',
              isSelected && 'bg-[#194A7A] text-white font-semibold',
            )}
            href={link}
          >
            {linkContent}
          </Link>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{text}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  )
}


interface SidebarActionButtonProps {
  icon: React.ReactNode
  action: ()=>void
  text: string
  isCollapsed: boolean
  requiredPermissions?: string[]
}

export function SidebarActionButton({ icon, action, text, isCollapsed, requiredPermissions = [] }: SidebarActionButtonProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  const hasPermission = requiredPermissions.length === 0 || requiredPermissions.some(permission => user?.permissions.includes(permission))

  if (!hasPermission) return null

  const linkContent = (
    <span className={cn("flex items-center gap-2 text-[#8B909A]",)}>
      <span className="h-5 w-5 shrink-0">
        {icon}
      </span>
      {!isCollapsed && <span>{text}</span>}
    </span>
  )

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              'flex grow items-center justify-between gap-1 p-3 font-dm-sans text-[0.9375rem] transition duration-500 ease-in-out hover:bg-sidebar-link-active hover:bg-opacity-60 md:py-2',
            )}
            onClick={action}
          >
            {linkContent}
          </button>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{text}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  )
}

