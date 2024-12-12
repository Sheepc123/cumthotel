'use client'

import { useRouter } from 'next/navigation'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRoomContext } from '../../contexts/RoomContext'
import { Suspense } from 'react'

export default function CustomerReservationsPage() {
  const { rooms } = useRoomContext()
  const router = useRouter()

  // Filter rooms to only show those with reservations
  const reservations = rooms.filter(room => room.customer)

  const handleBack = () => {
    router.push('/manager/dashboard')
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Button onClick={handleBack} className="mb-4">
            返回仪表板
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">客户预订信息</CardTitle>
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
                    <TableHead>价格（每晚）</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>{reservation.id}</TableCell>
                      <TableCell>{reservation.customer}</TableCell>
                      <TableCell>{translateType(reservation.type)}</TableCell>
                      <TableCell>{reservation.checkinDate}</TableCell>
                      <TableCell>{reservation.checkoutDate}</TableCell>
                      <TableCell>¥{reservation.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </Suspense>
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

