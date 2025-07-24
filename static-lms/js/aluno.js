// Dashboard do aluno - controle de progresso e inscrições

document.addEventListener('DOMContentLoaded', () => {
  // Verificar se usuário é aluno
  const user = JSON.parse(localStorage.getItem('fotomaster_user'))
  if (!user || user.type !== 'student') {
    alert('Acesso negado. Apenas alunos podem acessar esta área.')
    window.location.href = 'login.html'
    return
  }

  // Atualizar display do usuário
  document.getElementById('user-display').textContent = `Olá, ${user.name}`

  // Verificar se aluno está inscrito
  checkEnrollment()

  // Event listeners
  const btnEnroll = document.getElementById('btn-enroll')
  if (btnEnroll) {
    btnEnroll.addEventListener('click', enrollInCourse)
  }

  const logoutBtn = document.getElementById('logout-btn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('fotomaster_user')
      window.location.href = 'index.html'
    })
  }
})

function checkEnrollment() {
  const user = JSON.parse(localStorage.getItem('fotomaster_user'))
  const progress = JSON.parse(localStorage.getItem(`progress_${user.id}_photography-master`) || 'null')

  if (progress) {
    // Aluno já está inscrito
    document.getElementById('enrollment-section').style.display = 'none'
    document.getElementById('progress-section').style.display = 'block'
    document.getElementById('lessons-section').style.display = 'block'
    document.getElementById('materials-section').style.display = 'block'
    
    updateProgress(progress)
    loadLessons(progress)
    
    // Mostrar certificado se curso completo
    if (progress.progressPercentage >= 100) {
      document.getElementById('certificate-section').style.display = 'block'
    }
  }
}

function enrollInCourse() {
  const user = JSON.parse(localStorage.getItem('fotomaster_user'))
  
  const newProgress = {
    userId: user.id,
    courseId: 'photography-master',
    completedLessons: [],
    currentLesson: 'lesson-1',
    progressPercentage: 0,
    enrolledAt: new Date().toISOString(),
    lastAccessed: new Date().toISOString()
  }

  localStorage.setItem(`progress_${user.id}_photography-master`, JSON.stringify(newProgress))
  
  alert('Inscrição realizada com sucesso!')
  checkEnrollment()
}

function updateProgress(progress) {
  const progressPercentage = Math.round(progress.progressPercentage)
  const completedLessons = progress.completedLessons.length
  const totalLessons = 14

  document.getElementById('progress-percentage').textContent = progressPercentage + '%'
  document.getElementById('progress-fill').style.width = progressPercentage + '%'
  document.getElementById('completed-lessons').textContent = completedLessons
  document.getElementById('total-lessons').textContent = totalLessons
}

function loadLessons(progress) {
  const lessons = [
    { id: 'lesson-1', title: 'História da Fotografia e Suas Evoluções', module: 'Módulo 1' },
    { id: 'lesson-2', title: 'Fundamentos Básicos da Fotografia', module: 'Módulo 1' },
    { id: 'lesson-3', title: 'Introdução aos Equipamentos Fotográficos', module: 'Módulo 1' },
    { id: 'lesson-4', title: 'Entendendo o Funcionamento da Câmera', module: 'Módulo 2' },
    { id: 'lesson-5', title: 'Composição e Técnicas Básicas', module: 'Módulo 2' },
    { id: 'lesson-6', title: 'Prática: Fotografando em Diversos Ambientes', module: 'Módulo 2' },
    { id: 'lesson-7', title: 'Técnicas Avançadas de Composição', module: 'Módulo 3' },
    { id: 'lesson-8', title: 'Fotografia de Retrato e Estúdios', module: 'Módulo 3' },
    { id: 'lesson-9', title: 'Fotografia de Paisagens e Arquitetura', module: 'Módulo 3' },
    { id: 'lesson-10', title: 'Fundamentos da Edição de Imagem', module: 'Módulo 4' },
    { id: 'lesson-11', title: 'Retoques e Efeitos Criativos', module: 'Módulo 4' },
    { id: 'lesson-12', title: 'Como Organizar e Exportar Suas Imagens', module: 'Módulo 4' },
    { id: 'lesson-13', title: 'Desenvolvimento de Projeto Fotográfico', module: 'Módulo 5' },
    { id: 'lesson-14', title: 'Crítica de Portfólio e Feedback', module: 'Módulo 5' }
  ]

  const lessonsList = document.getElementById('lessons-list')
  lessonsList.innerHTML = ''

  lessons.forEach((lesson, index) => {
    const isCompleted = progress.completedLessons.includes(lesson.id)
    const isCurrent = progress.currentLesson === lesson.id
    
    const lessonDiv = document.createElement('div')
    lessonDiv.className = `lesson-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`
    lessonDiv.innerHTML = `
      <h4>${lesson.module}: ${lesson.title}</h4>
      <p>Status: ${isCompleted ? '✓ Concluída' : isCurrent ? '▶ Atual' : '○ Pendente'}</p>
      <button onclick="watchLesson('${lesson.id}')" ${!isCurrent && !isCompleted ? 'disabled' : ''}>
        ${isCompleted ? 'Revisar' : 'Assistir'}
      </button>
    `
    lessonsList.appendChild(lessonDiv)
  })
}

function watchLesson(lessonId) {
  // Redirecionar para página da aula
  window.location.href = `aula.html?lesson=${lessonId}`
}
