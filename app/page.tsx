import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Header from './components/header'
import Footer from './components/footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-900">欢迎来到中国矿业大学酒店</h1>
            <div className="space-y-6 md:space-y-0 md:space-x-6">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-xl">
                <Link href="/customer">顾客入口</Link>
              </Button>
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full text-xl">
                <Link href="/manager/login">酒店管理员入口</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">为什么选择中国矿业大学酒店？</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">豪华房间</h3>
                <p className="text-gray-600">豪华舒适的房间，尽享极致体验。</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">绝佳位置</h3>
                <p className="text-gray-600">交通便利，轻松畅游城市。</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">贴心服务</h3>
                <p className="text-gray-600">专业团队，为您提供无微不至的关怀。</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

