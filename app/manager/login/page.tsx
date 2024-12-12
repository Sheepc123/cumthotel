import Header from '../../components/header'
import Footer from '../../components/footer'
import LoginForm from './login-form'

export default function ManagerLoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Hotel Manager Login</h1>
        <div className="max-w-md mx-auto">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}

