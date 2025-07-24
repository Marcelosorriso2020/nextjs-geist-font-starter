// Controle simples de cadastro usando localStorage

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('inscricao-form')

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = form.elements['name'].value.trim()
    const email = form.elements['email'].value.trim()
    const password = form.elements['password'].value
    const confirmPassword = form.elements['confirmPassword'].value
    const userType = form.elements['userType'].value

    if (!name || !email || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos')
      return
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem')
      return
    }

    const users = JSON.parse(localStorage.getItem('fotomaster_users') || '[]')
    if (users.find(u => u.email === email)) {
      alert('Este e-mail já está cadastrado')
      return
    }

    const passwords = JSON.parse(localStorage.getItem('fotomaster_passwords') || '{}')

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      type: userType,
      enrolledCourses: userType === 'student' ? [] : undefined,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    passwords[email] = password

    localStorage.setItem('fotomaster_users', JSON.stringify(users))
    localStorage.setItem('fotomaster_passwords', JSON.stringify(passwords))

    alert('Cadastro realizado com sucesso! Você será redirecionado para o login.')
    window.location.href = 'login.html'
  })
})
