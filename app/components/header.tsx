import Link from 'next/link'
import { Building2 } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-blue-900">CUMT Hotel</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-gray-600 hover:text-blue-600">首页</Link></li>
            <li><Link href="/customer" className="text-gray-600 hover:text-blue-600">预订</Link></li>
            <li><Link href="/about" className="text-gray-600 hover:text-blue-600">关于我们</Link></li>
            <li><Link href="/contact" className="text-gray-600 hover:text-blue-600">联系我们</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

