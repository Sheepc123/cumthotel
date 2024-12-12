'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRoomContext } from '../../contexts/RoomContext'

interface ReservationDetails {
  id: number;
  type: 'Single' | 'Double' | 'Suite';
  price: number;
  customer: string;
  checkinDate: string;
  checkoutDate: string;
}

export default function ReservationCheckPage() {
  const [reservationId, setReservationId] = useState('')
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails | null>(null)
  const { rooms } = useRoomContext()
  const router = useRouter()

  const handleCheck = () => {
    // In a real application, this would make an API call to fetch reservation details
    // For this example, we'll simulate it by checking against our rooms context
    const reservation = rooms.find(room => 
      room.customer && room.id.toString() === reservationId
    )

    if (reservation && ['Single', 'Double', 'Suite'].includes(reservation.type)) {
      setReservationDetails({
        ...reservation,
        type: reservation.type as 'Single' | 'Double' | 'Suite'
      } as ReservationDetails)
    } else {
      setReservationDetails(null)
      alert('未找到预订信息，请检查预订号是否正确。')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-900">查看预订信息</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>输入预订号</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="请输入预订号"
                value={reservationId}
                onChange={(e) => setReservationId(e.target.value)}
              />
              <Button onClick={handleCheck}>查询</Button>
            </div>
          </CardContent>
        </Card>

        {reservationDetails && (
          <Card>
            <CardHeader>
              <CardTitle>预订详情</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div><strong>房间号:</strong> {reservationDetails.id}</div>
                <div><strong>类型:</strong> {reservationDetails.type === 'Single' ? '单人间' : reservationDetails.type === 'Double' ? '双人间' : '套房'}</div>
                <div><strong>价格:</strong> ¥{reservationDetails.price}/晚</div>
                <div><strong>客户姓名:</strong> {reservationDetails.customer}</div>
                <div><strong>入住日期:</strong> {reservationDetails.checkinDate}</div>
                <div><strong>退房日期:</strong> {reservationDetails.checkoutDate}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push('/')}>返回首页</Button>
            </CardFooter>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  )
}

