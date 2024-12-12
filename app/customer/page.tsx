'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/header'
import Footer from '../components/footer'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRoomContext } from '../contexts/RoomContext'
import { Calendar, Bed } from 'lucide-react'

interface Room {
  id: number;
  status: string;
  type: 'Single' | 'Double' | 'Suite';
  price: number;
  customer: string | null;
  checkinDate: string | null;
  checkoutDate: string | null;
}

export default function CustomerPage() {
  const [入住日期, set入住日期] = useState('')
  const [退房日期, set退房日期] = useState('')
  const [房间类型, set房间类型] = useState('')
  const { rooms } = useRoomContext()
  const router = useRouter()

  const 搜索房间 = () => {
    const 可用 = rooms.filter(room => {
      const 是否可用 = room.status === "Available" &&
        (!room.checkinDate || new Date(room.checkinDate) >= new Date(退房日期)) &&
        (!room.checkoutDate || new Date(room.checkoutDate) <= new Date(入住日期))
    
      const 类型匹配 = !房间类型 || room.type === 房间类型

      return 是否可用 && 类型匹配
    })
    const 可用房间数组: Room[] = 可用.map(room => ({
      ...room,
      type: room.type as 'Single' | 'Double' | 'Suite'
    }))
    set可用房间(可用房间数组)
  }

  const 获取渐变颜色 = (index: number) => {
    const 渐变 = [
      'from-blue-500 to-purple-500',
      'from-green-500 to-teal-500',
      'from-yellow-500 to-orange-500',
      'from-pink-500 to-red-500',
      'from-indigo-500 to-blue-500',
      'from-purple-500 to-pink-500'
    ]
    return 渐变[index % 渐变.length]
  }

  const [可用房间, set可用房间] = useState<Room[]>([])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">寻找您的理想房间</h1>
        <Card className="mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardTitle className="text-2xl">搜索可用房间</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="checkin" className="text-lg font-semibold">入住日期</Label>
                <div className="flex items-center mt-2">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                  <Input 
                    id="checkin" 
                    type="date" 
                    value={入住日期} 
                    onChange={(e) => set入住日期(e.target.value)}
                    className="flex-grow"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="checkout" className="text-lg font-semibold">退房日期</Label>
                <div className="flex items-center mt-2">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                  <Input 
                    id="checkout" 
                    type="date" 
                    value={退房日期} 
                    onChange={(e) => set退房日期(e.target.value)}
                    className="flex-grow"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="roomType" className="text-lg font-semibold">房间类型</Label>
                <Select onValueChange={set房间类型}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="选择房间类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">单人间</SelectItem>
                    <SelectItem value="Double">双人间</SelectItem>
                    <SelectItem value="Suite">套房</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50">
            <Button className="w-full text-lg py-6" onClick={搜索房间}>
              搜索可用房间
            </Button>
          </CardFooter>
        </Card>

        {可用房间.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">可用房间</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {可用房间.map((room, index) => (
                <Card key={room.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className={`bg-gradient-to-r ${获取渐变颜色(index)} text-white`}>
                    <CardTitle className="text-xl">房间 {room.id}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Bed className="mr-2 h-5 w-5 text-gray-500" />
                      <p className="text-lg"><strong>类型:</strong> {room.type === 'Single' ? '单人间' : room.type === 'Double' ? '双人间' : '套房'}</p>
                    </div>
                    <div className="flex items-center mb-4">
                      <p className="text-lg"><strong>价格:</strong> ¥{room.price}/晚</p>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50">
                    <Button 
                      className="w-full" 
                      onClick={() => router.push(`/customer/payment?roomId=${room.id}&checkin=${入住日期}&checkout=${退房日期}`)}
                    >
                      立即预订
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

