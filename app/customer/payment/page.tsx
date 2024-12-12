'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRoomContext } from '../../contexts/RoomContext'
import { WechatIcon, AlipayIcon } from './PaymentIcons'

interface Room {
  id: number;
  type: string;
  price: number;
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}

function PaymentContent() {
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { rooms } = useRoomContext()

  const roomId = searchParams.get('roomId')
  const checkin = searchParams.get('checkin')
  const checkout = searchParams.get('checkout')

  const [room, setRoom] = useState<Room | null>(null)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [nights, setNights] = useState<number>(0)

  useEffect(() => {
    if (!roomId || !checkin || !checkout) {
      setError('预订详情无效。请返回重新选择房间。')
      setIsLoading(false)
      return
    }

    const selectedRoom = rooms.find(r => r.id.toString() === roomId)
    if (!selectedRoom) {
      setError('未找到所选房间。请返回重新选择房间。')
      setIsLoading(false)
      return
    }

    if (!['Single', 'Double', 'Suite'].includes(selectedRoom.type)) {
      setError('无效的房间类型')
      setIsLoading(false)
      return
    }

    const checkInDate = new Date(checkin)
    const checkOutDate = new Date(checkout)
    const nightsCount = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24))

    if (nightsCount <= 0) {
      setError('入住日期和退房日期无效。请返回重新选择日期。')
      setIsLoading(false)
      return
    }

    setRoom(selectedRoom as Room)
    setNights(nightsCount)
    setTotalPrice(selectedRoom.price * nightsCount)
    setIsLoading(false)
  }, [roomId, checkin, checkout, rooms])

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('请选择支付方式')
      return
    }
    // Here you would typically integrate with a payment gateway
    // For this example, we'll just show an alert
    alert(`使用${paymentMethod}支付¥${totalPrice}`)
    router.push('/') // Redirect to the home page
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">正在加载预订详情...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader className="bg-red-500">
              <CardTitle className="text-2xl font-bold text-white">错误</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push('/customer')} className="w-full">
                返回选择房间
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          预订支付
        </h1>
        <Card className="max-w-md mx-auto">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500">
            <CardTitle className="text-2xl font-bold text-white">订单详情</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {room && (
              <div className="space-y-4">
                <p><strong>房间号:</strong> {room.id}</p>
                <p><strong>房间类型:</strong> {room.type === 'Single' ? '单人间' : room.type === 'Double' ? '双人间' : '套房'}</p>
                <p><strong>入住日期:</strong> {checkin}</p>
                <p><strong>退房日期:</strong> {checkout}</p>
                <p><strong>住宿天数:</strong> {nights}晚</p>
                <p><strong>总价:</strong> ¥{totalPrice}</p>
              </div>
            )}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">选择支付方式</h3>
              <RadioGroup onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="微信支付" id="wechat" />
                  <Label htmlFor="wechat" className="flex items-center">
                    <WechatIcon className="w-6 h-6 mr-2" />
                    微信支付
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="支付宝" id="alipay" />
                  <Label htmlFor="alipay" className="flex items-center">
                    <AlipayIcon className="w-6 h-6 mr-2" />
                    支付宝
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handlePayment} className="w-full">
              确认支付
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

