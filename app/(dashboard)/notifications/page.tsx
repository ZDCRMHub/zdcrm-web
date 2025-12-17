"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: "Status Update",
    title: "Status Update",
    message: 'Order ZD/6765 status has been updated to "Sent to Dispatch" by Tola Ademola',
    time: "01:44 PM",
    date: "Today, 14th Aug, 2025",
    avatar: "ZD",
    avatarColor: "bg-blue-600",
    isRead: false,
  },
  {
    id: 2,
    type: "Dispatch Time",
    title: "Dispatch Time",
    message: "Order PF/6765 time is delayed by 00:50 min",
    time: "04:32 PM",
    date: "Today, 14th Aug, 2025",
    avatar: "PF",
    avatarColor: "bg-blue-600",
    isRead: false,
    isDelayed: true,
  },
  {
    id: 3,
    type: "Status Update",
    title: "Status Update",
    message: "Order ZD/6765 status has been put on hold by Tola Ademola",
    time: "12:00 PM",
    date: "Today, 14th Aug, 2025",
    avatar: "ZD",
    avatarColor: "bg-blue-600",
    isRead: true,
  },
  {
    id: 4,
    type: "Status Update",
    title: "Status Update",
    message: 'Order ZD/6765 status has been updated to "Sent to Dispatch" by Tola Ademola',
    time: "1:44 PM",
    date: "Yesterday 13th Aug, 2025",
    avatar: "ZD",
    avatarColor: "bg-blue-600",
    isRead: true,
  },
  {
    id: 5,
    type: "Status Update",
    title: "Status Update",
    message: "Order PF/6765 status has been put on hold by Tola Ademola",
    time: "12:00 PM",
    date: "Yesterday 13th Aug, 2025",
    avatar: "PF",
    avatarColor: "bg-blue-600",
    isRead: true,
  },
  {
    id: 6,
    type: "Dispatch Time",
    title: "Dispatch Time",
    message: "Order ZD/6765 time is delayed by 00:50 min",
    time: "04:32 PM",
    date: "Yesterday 13th Aug, 2025",
    avatar: "ZD",
    avatarColor: "bg-blue-600",
    isRead: true,
    isDelayed: true,
  },
]

const notificationSettings = [
  {
    id: "status-alerts",
    title: "Status Update Alerts",
    description: "Get notified when an order product status has been updated.",
    inApp: true,
    email: false,
  },
  {
    id: "dispatch-alerts",
    title: "Dispatch Alerts",
    description: "Get notified instantly when order to be dispatched is delayed.",
    inApp: true,
    email: false,
  },
  {
    id: "low-stock",
    title: "Low Stock Warnings",
    description: "Know when any product variant is running low.",
    inApp: true,
    email: false,
  },
  {
    id: "product-published",
    title: "Product Published Confirmation",
    description: "Get a heads-up once a product goes live.",
    inApp: true,
    email: false,
  },
  {
    id: "system-notifications",
    title: "System Notifications",
    description: "Important platform changes, terms updates, or security alerts.",
    inApp: true,
    email: false,
  },
]

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState(notificationSettings)

  const filteredNotifications = mockNotifications.filter((notification) => {
    if (activeFilter === "all") return true
    if (activeFilter === "read") return notification.isRead
    if (activeFilter === "unread") return !notification.isRead
    return true
  })

  const groupedNotifications = filteredNotifications.reduce((groups: any, notification) => {
    const date = notification.date
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(notification)
    return groups
  }, {})

  const updateSetting = (id: string, field: "inApp" | "email", value: boolean) => {
    setSettings(settings.map((setting) => (setting.id === id ? { ...setting, [field]: value } : setting)))
  }

  if (showSettings) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
     
        <Card className="max-w-4xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">My Notifications</h2>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(false)}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  All Notifications
                </Button>
                <Button variant="ghost" className="text-gray-600">
                  Read
                </Button>
                <Button variant="ghost" className="text-gray-600">
                  Unread
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              {settings.map((setting) => (
                <div key={setting.id} className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{setting.title}</h3>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">None</span>
                      <Switch
                        checked={setting.inApp}
                        onCheckedChange={(checked) => updateSetting(setting.id, "inApp", checked)}
                      />
                      <span className="text-sm font-medium text-gray-900">In-app</span>
                      <Switch
                        checked={setting.email}
                        onCheckedChange={(checked) => updateSetting(setting.id, "email", checked)}
                      />
                      <span className="text-sm text-gray-600">Email</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                CANCEL
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">SAVE</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
    

      <Card className="max-w-4xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">My Notifications</h2>
            <div className="flex items-center gap-4">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
                className={
                  activeFilter === "all"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "text-blue-600 border-blue-200 hover:bg-blue-50"
                }
              >
                All Notifications
              </Button>
              <Button
                variant={activeFilter === "read" ? "default" : "ghost"}
                onClick={() => setActiveFilter("read")}
                className={activeFilter === "read" ? "bg-blue-600 hover:bg-blue-700" : "text-gray-600"}
              >
                Read
              </Button>
              <Button
                variant={activeFilter === "unread" ? "default" : "ghost"}
                onClick={() => setActiveFilter("unread")}
                className={activeFilter === "unread" ? "bg-blue-600 hover:bg-blue-700" : "text-gray-600"}
              >
                Unread
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {Object.entries(groupedNotifications).map(([date, notifications]: [string, any]) => (
              <div key={date} className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">{date}</h3>
                <div className="space-y-4">
                  {notifications.map((notification: any) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div
                        className={`w-10 h-10 ${notification.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-white font-medium text-sm">{notification.avatar}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{notification.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {notification.message}
                              {notification.isDelayed && <span className="text-red-600 font-medium"> 00:50</span>}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 whitespace-nowrap">{notification.time}</span>
                            {!notification.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
