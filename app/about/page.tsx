import Header from '../components/header'
import Footer from '../components/footer'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const teamMembers = [
    { name: "刘越洋", task: "项目负责人，前后端开发设计", class: "计算机科学 5 班" },
    { name: "王万齐", task: "前端开发与用户界面", class: "计算机科学 5 班" },
    { name: "孙昊",  task: "后端架构与数据库设计", class: "计算机科学 5 班" },
    { name: "吴士博", task: "UI/UX 设计与用户体验优化", class: "计算机科学 5 班" },
    { name: "欧阳华", task: "系统测试与质量保证", class: "计算机科学 5 班" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          关于我们
        </h1>
        <div className="mb-12">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              <CardTitle className="text-2xl font-bold text-white">中国矿业大学酒店管理系统</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-lg text-gray-700">
                我们的酒店管理系统是由中国矿业大学计算机科学与技术学院的学生团队开发的。
                这个项目旨在提供一个现代化、用户友好的界面，以便于酒店管理人员和客户使用。
                我们致力于创造一个高效、可靠的系统，以提升酒店的运营效率和客户满意度。
              </p>
            </CardContent>
          </Card>
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-transparent bg-clip-text">
          项目团队
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
              <CardHeader className={`bg-gradient-to-r ${getGradientColor(index)}`}>
                <CardTitle className="text-xl font-bold text-white">{member.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-600 mb-2"><strong>任务:</strong> {member.task}</p>
                <p className="text-gray-600"><strong>班级:</strong> {member.class}</p>
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
    'from-purple-500 to-pink-500',
    'from-pink-500 to-red-500',
    'from-red-500 to-yellow-500',
    'from-yellow-500 to-green-500',
    'from-green-500 to-teal-500',
    'from-teal-500 to-blue-500',
  ]
  return gradients[index % gradients.length]
}

