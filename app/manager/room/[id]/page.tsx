'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRoomContext } from '../../../contexts/RoomContext'

function getGradientColor(id: number) {
  const gradients = [
    'from-blue-500 to-purple-500',
    'from-green-500 to-teal-500',
    'from-yellow-500 to-orange-500',
    'from-pink-500 to-red-500',
    'from-indigo-500 to-blue-500',
    'from-purple-500 to-pink-500'
  ]
  return gradients[id % gradients.length]
}

export default function RoomDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { rooms, updateRoom } = useRoomContext()
  const { id } = use(params)
  const room = rooms.find(r => r.id === parseInt(id))

  if (!room) {
    notFound()
  }

  const handleBack = () => {
    router.push('/manager/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button onClick={handleBack} className="mb-4">
          返回仪表板
        </Button>
        <Card className="overflow-hidden">
          <CardHeader className={`bg-gradient-to-r ${getGradientColor(room.id)}`}>
            <CardTitle className="text-3xl font-bold text-white">房间 {room.id} 详情</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div><strong>类型:</strong> {translateType(room.type)}</div>
              <div><strong>价格:</strong> ¥{room.price}/晚</div>
              <div><strong>状态:</strong> {translateStatus(room.status)}</div>
              <div><strong>客户:</strong> {room.customer || '无'}</div>
              <div><strong>入住日期:</strong> {room.checkinDate || '无'}</div>
              <div><strong>退房日期:</strong> {room.checkoutDate || '无'}</div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">修改</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>编辑房间详情</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const updatedRoom = {
                    ...room,
                    type: formData.get('type') as string,
                    price: Number(formData.get('price')),
                    status: formData.get('status') as string,
                    customer: formData.get('customer') as string,
                    checkinDate: formData.get('checkinDate') as string,
                    checkoutDate: formData.get('checkoutDate') as string
                  }
                  updateRoom(updatedRoom)
                }}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        类型
                      </Label>
                      <Select name="type" defaultValue={room.type}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="选择房间类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">单人间</SelectItem>
                          <SelectItem value="Double">双人间</SelectItem>
                          <SelectItem value="Suite">套房</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        价格
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        defaultValue={room.price}
                        type="number"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        状态
                      </Label>
                      <Select name="status" defaultValue={room.status}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="选择状态" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Available">可用</SelectItem>
                          <SelectItem value="Occupied">已占用</SelectItem>
                          <SelectItem value="Cleaning">清洁中</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="customer" className="text-right">
                        客户
                      </Label>
                      <Input
                        id="customer"
                        name="customer"
                        defaultValue={room.customer || ''}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="checkinDate" className="text-right">
                        入住日期
                      </Label>
                      <Input
                        id="checkinDate"
                        name="checkinDate"
                        type="date"
                        defaultValue={room.checkinDate || ''}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="checkoutDate" className="text-right">
                        退房日期
                      </Label>
                      <Input
                        id="checkoutDate"
                        name="checkoutDate"
                        type="date"
                        defaultValue={room.checkoutDate || ''}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">保存更改</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

function translateType(type: string) {
  switch (type) {
    case 'Single':
      return '单人间'
    case 'Double':
      return '双人间'
    case 'Suite':
      return '套房'
    default:
      return type
  }
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

