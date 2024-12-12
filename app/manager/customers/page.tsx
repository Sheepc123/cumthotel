'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRoomContext } from '../../contexts/RoomContext'

// Room 类型声明
type Room = {
  id: number;
  customer: string | null;
  type: 'Single' | 'Double' | 'Suite';
  checkinDate: string;
  checkoutDate: string;
};

export default function CustomerInfoPage() {
  const router = useRouter()
  const { rooms } = useRoomContext() as { rooms: Room[] } // 确保 rooms 类型正确
  const [searchTerm, setSearchTerm] = useState('')

  // 将 rooms 过滤成 customers 列表，并确保类型正确
  const customers = rooms
    .filter(room => room.customer)  // 过滤掉没有客户的房间
    .map(room => ({
      id: room.id,
      name: room.customer!,
      roomType: room.type,
      checkinDate: room.checkinDate,
      checkoutDate: room.checkoutDate
    }))
    .filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toString().includes(searchTerm)
    )

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
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">客户信息管理</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>搜索客户</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Label htmlFor="search" className="sr-only">
                搜索
              </Label>
              <Input
                id="search"
                placeholder="输入客户姓名或房间号"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>客户列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>房间号</TableHead>
                  <TableHead>客户姓名</TableHead>
                  <TableHead>房间类型</TableHead>
                  <TableHead>入住日期</TableHead>
                  <TableHead>退房日期</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.roomType === 'Single' ? '单人间' : customer.roomType === 'Double' ? '双人间' : '套房'}</TableCell>
                    <TableCell>{customer.checkinDate}</TableCell>
                    <TableCell>{customer.checkoutDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
