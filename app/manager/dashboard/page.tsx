'use client'

import Link from 'next/link'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRoomContext } from '../../contexts/RoomContext'

export default function ManagerDashboardPage() {
  const { rooms } = useRoomContext()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900">酒店房间管理</h1>
          <Button asChild>
            <Link href="/manager/reservations">查看所有预订</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room, index) => (
            <Card key={room.id} className={`overflow-hidden transition-all hover:shadow-lg`}>
              <CardHeader className={`bg-gradient-to-r ${getGradientColor(index)}`}>
                <CardTitle className="text-white">
                  <Link href={`/manager/room/${room.id}`} className="hover:underline">
                    房间 {room.id}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p><strong>状态:</strong> {translateStatus(room.status)}</p>
                {room.customer && (
                  <p><strong>客户:</strong> {room.customer}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function getGradientColor(index: number) {
  const gradients = [
    'from-blue-500 to-purple-500',
    'from-green-500 to-teal-500',
    'from-yellow-500 to-orange-500',
    'from-pink-500 to-red-500',
    'from-indigo-500 to-blue-500',
    'from-purple-500 to-pink-500'
  ]
  return gradients[index % gradients.length]
}

function translateStatus(status: string) {
  switch (status) {
    case 'Available':
      return '可用'
    case 'Occupied':
      return '已占用'
    case 'Cleaning':
      return '清洁中'
    default:
      return status
  }
}

