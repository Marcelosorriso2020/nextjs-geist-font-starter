document.addEventListener('DOMContentLoaded', () => {
  // Inicializar professor Marcelo se não existir
  initializeProfessorMarcelo()

  const loginForm = document.getElementById('login-form')
  const logoutBtn = document.getElementById('logout-btn')
  const userDisplay = document.getElementById('user-display')

  function initializeProfessorMarcelo() {
    const users = JSON.parse(localStorage.getItem('fotomaster_users') || '[]')
    const passwords = JSON.parse(localStorage.getItem('fotomaster_passwords') || '{}')
    
    // Verificar se professor Marcelo já existe
    const professorExists = users.find(u => u.email === 'marcelo@fotomaster.com')
    
    if (!professorExists) {
      // Criar professor Marcelo
      const professorMarcelo = {
        id: 'prof-marcelo',
        name: 'Marcelo',
        email: 'marcelo@fotomaster.com',
        type: 'teacher',
        createdAt: new Date().toISOString()
      }
      
      users.push(professorMarcelo)
      passwords['marcelo@fotomaster.com'] = '5711'
      
      localStorage.setItem('fotomaster_users', JSON.stringify(users))
      localStorage.setItem('fotomaster_passwords', JSON.stringify(passwords))
    }
  }

  function updateUI() {
    const user = JSON.parse(localStorage.getItem('fotomaster_user'))
    if (user) {
      if (userDisplay) {
        userDisplay.textContent = 'Olá, ' + user.name
      }
      if (logoutBtn) {
        logoutBtn.style.display = 'inline-block'
      }
      if (loginForm) {
        loginForm.style.display = 'none'
      }
    } else {
      if (userDisplay) {
        userDisplay.textContent = ''
      }
      if (logoutBtn) {
        logoutBtn.style.display = 'none'
      }
      if (loginForm) {
        loginForm.style.display = 'block'
      }
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('fotomaster_user')
      updateUI()
      window.location.href = 'index.html'
    })
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const email = loginForm.elements['email'].value
      const password = loginForm.elements['password'].value

      // Login especial para Professor Marcelo (oculto)
      if (email === 'marcelo@fotomaster.com' && password === '5711') {
        const professorMarcelo = {
          id: 'prof-marcelo',
          name: 'Marcelo',
          email: 'marcelo@fotomaster.com',
          type: 'teacher'
        }
        localStorage.setItem('fotomaster_user', JSON.stringify(professorMarcelo))
        alert('Bem-vindo, Prof. Marcelo!')
        window.location.href = 'dashboard-professor.html'
        return
      }

      // Login para alunos
      const users = JSON.parse(localStorage.getItem('fotomaster_users') || '[]')
      const passwords = JSON.parse(localStorage.getItem('fotomaster_passwords') || '{}')

      const user = users.find(u => u.email === email && u.type === 'student')
      if (user && passwords[email] === password) {
        localStorage.setItem('fotomaster_user', JSON.stringify(user))
        alert('Login realizado com sucesso!')
        window.location.href = 'dashboard-aluno.html'
      } else {
        alert('E-mail ou senha incorretos')
      }
    })
  }

  updateUI()
})
