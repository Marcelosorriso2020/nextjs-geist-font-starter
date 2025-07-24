'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos')
      return
    }

    setIsLoading(true)

    try {
      const success = await login(email, password)
      
      if (success) {
        toast.success('Login realizado com sucesso!')
        
        // Verificar tipo de usuário para redirecionar
        const users = JSON.parse(localStorage.getItem('fotomaster_users') || '[]')
        const user = users.find((u: any) => u.email === email)
        
        if (user) {
          router.push(user.type === 'student' ? '/dashboard/aluno' : '/dashboard/professor')
        }
      } else {
        toast.error('E-mail ou senha incorretos')
      }
    } catch (error) {
      toast.error('Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  // Função para login do Professor Marcelo
  const handleProfessorMarceloLogin = async () => {
    setEmail('marcelo@fotomaster.com')
    setPassword('5711')
    
    setIsLoading(true)
    
    try {
      const success = await login('marcelo@fotomaster.com', '5711')
      
      if (success) {
        toast.success('Login do Prof. Marcelo realizado!')
        router.push('/dashboard/professor')
      } else {
        toast.error('Erro no login do Professor Marcelo')
      }
    } catch (error) {
      toast.error('Erro no login')
    } finally {
      setIsLoading(false)
    }
  }

  // Função para login de demonstração
  const handleDemoLogin = async (type: 'student' | 'teacher') => {
    const demoCredentials = {
      student: { email: 'aluno@demo.com', password: 'demo123' },
      teacher: { email: 'professor@demo.com', password: 'demo123' }
    }

    setEmail(demoCredentials[type].email)
    setPassword(demoCredentials[type].password)
    
    setIsLoading(true)
    
    try {
      const success = await login(demoCredentials[type].email, demoCredentials[type].password)
      
      if (success) {
        toast.success('Login de demonstração realizado!')
        router.push(type === 'student' ? '/dashboard/aluno' : '/dashboard/professor')
      } else {
        // Criar usuário demo se não existir
        const { register } = useAuth()
        const registerSuccess = await register(
          type === 'student' ? 'Aluno Demo' : 'Professor Demo',
          demoCredentials[type].email,
          demoCredentials[type].password,
          type
        )
        
        if (registerSuccess) {
          toast.success('Conta demo criada e login realizado!')
          router.push(type === 'student' ? '/dashboard/aluno' : '/dashboard/professor')
        }
      }
    } catch (error) {
      toast.error('Erro no login de demonstração')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">📷</span>
            </div>
            <span className="text-white font-bold text-xl">FotoMaster</span>
          </Link>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Entrar
            </CardTitle>
            <CardDescription className="text-slate-300">
              Acesse sua conta FotoMaster
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>

              {/* Botão de login */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>

              {/* Link para cadastro */}
              <div className="text-center">
                <p className="text-slate-300">
                  Não tem uma conta?{' '}
                  <Link href="/cadastro" className="text-orange-400 hover:text-orange-300 font-semibold">
                    Criar conta
                  </Link>
                </p>
              </div>
            </form>

            {/* Seção de demonstração */}
            <div className="mt-8 pt-6 border-t border-slate-600">
              <p className="text-center text-slate-300 mb-4 text-sm">
                Ou experimente com contas de demonstração:
              </p>
              
              <div className="space-y-3">
                <Button
                  onClick={() => handleDemoLogin('student')}
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  disabled={isLoading}
                >
                  🎓 Entrar como Aluno Demo
                </Button>
                
                <Button
                  onClick={() => handleProfessorMarceloLogin()}
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  disabled={isLoading}
                >
                  👨‍🏫 Entrar como Prof. Marcelo
                </Button>
                
                <Button
                  onClick={() => handleDemoLogin('teacher')}
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50"
                  disabled={isLoading}
                >
                  👨‍🏫 Entrar como Professor Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voltar para home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  )
}
