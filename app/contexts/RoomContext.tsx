'use client'

import React, { createContext, useState, useContext } from 'react'

export type Room = {
  id: number
  type: string
  price: number
  status: string
  customer: string | null
  checkinDate: string | null
  checkoutDate: string | null
}

type RoomContextType = {
  rooms: Room[]
  updateRoom: (updatedRoom: Room) => void
}

const initialRooms = [
  { id: 101, type: "Single", price: 100, status: "Available", customer: null, checkinDate: null, checkoutDate: null },
  { id: 102, type: "Double", price: 150, status: "Occupied", customer: "John Doe", checkinDate: "2023-06-01", checkoutDate: "2023-06-05" },
  { id: 103, type: "Suite", price: 250, status: "Cleaning", customer: null, checkinDate: null, checkoutDate: null },
  { id: 104, type: "Single", price: 100, status: "Available", customer: null, checkinDate: null, checkoutDate: null },
  { id: 105, type: "Double", price: 150, status: "Available", customer: null, checkinDate: null, checkoutDate: null },
  { id: 106, type: "Suite", price: 250, status: "Occupied", customer: "Jane Smith", checkinDate: "2023-06-02", checkoutDate: "2023-06-07" },
  { id: 201, type: "Single", price: 110, status: "Available", customer: null, checkinDate: null, checkoutDate: null },
  { id: 202, type: "Double", price: 160, status: "Occupied", customer: "Bob Johnson", checkinDate: "2023-06-03", checkoutDate: "2023-06-06" },
  { id: 203, type: "Suite", price: 260, status: "Available", customer: null, checkinDate: null, checkoutDate: null },
  { id: 204, type: "Single", price: 110, status: "Cleaning", customer: null, checkinDate: null, checkoutDate: null },
  { id: 205, type: "Double", price: 160, status: "Available", customer: null, checkinDate: null, checkoutDate: null },
  { id: 206, type: "Suite", price: 260, status: "Occupied", customer: "Alice Brown", checkinDate: "2023-06-04", checkoutDate: "2023-06-08" },
]

const RoomContext = createContext<RoomContextType | undefined>(undefined)

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms)

  const updateRoom = (updatedRoom: Room) => {
    setRooms(rooms.map(room => room.id === updatedRoom.id ? updatedRoom : room))
  }

  return (
    <RoomContext.Provider value={{ rooms, updateRoom }}>
      {children}
    </RoomContext.Provider>
  )
}

export const useRoomContext = () => {
  const context = useContext(RoomContext)
  if (context === undefined) {
    throw new Error('useRoomContext must be used within a RoomProvider')
  }
  return context
}

