// Controle da página individual de aula

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

  // Obter ID da aula da URL
  const urlParams = new URLSearchParams(window.location.search)
  const lessonId = urlParams.get('lesson')
  
  if (!lessonId) {
    alert('Aula não encontrada.')
    window.location.href = 'dashboard-aluno.html'
    return
  }

  // Carregar dados da aula
  loadLesson(lessonId)

  // Event listeners
  document.getElementById('btn-mark-complete').addEventListener('click', () => markLessonComplete(lessonId))
  document.getElementById('btn-next-lesson').addEventListener('click', goToNextLesson)
  
  const logoutBtn = document.getElementById('logout-btn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('fotomaster_user')
      window.location.href = 'index.html'
    })
  }
})

const lessons = {
  'lesson-1': {
    title: 'História da Fotografia e Suas Evoluções',
    description: 'Nesta aula, você conhecerá a fascinante história da fotografia e suas principais evoluções ao longo do tempo.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: História da Fotografia', 'Checklist: Evoluções Tecnológicas', 'Timeline: Marcos da Fotografia'],
    module: 'Módulo 1: Introdução à Fotografia'
  },
  'lesson-2': {
    title: 'Fundamentos Básicos da Fotografia',
    description: 'Aprenda os conceitos fundamentais que todo fotógrafo precisa dominar.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Fundamentos', 'Exercícios Básicos', 'Glossário Fotográfico'],
    module: 'Módulo 1: Introdução à Fotografia'
  },
  'lesson-3': {
    title: 'Introdução aos Equipamentos Fotográficos',
    description: 'Conheça os principais equipamentos utilizados na fotografia profissional.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Equipamentos', 'Guia de Uso', 'Lista de Compras'],
    module: 'Módulo 1: Introdução à Fotografia'
  },
  'lesson-4': {
    title: 'Entendendo o Funcionamento da Câmera',
    description: 'Domine o funcionamento interno da câmera fotográfica.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Funcionamento da Câmera', 'Exercícios Práticos', 'Diagrama Técnico'],
    module: 'Módulo 2: Domínio da Câmera'
  },
  'lesson-5': {
    title: 'Composição e Técnicas Básicas',
    description: 'Aprenda as principais técnicas de composição fotográfica.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Composição', 'Exercícios de Composição', 'Exemplos Práticos'],
    module: 'Módulo 2: Domínio da Câmera'
  },
  'lesson-6': {
    title: 'Prática: Fotografando em Diversos Ambientes',
    description: 'Coloque em prática o que aprendeu fotografando em diferentes ambientes.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Prática', 'Checklist de Ambientes', 'Desafios Fotográficos'],
    module: 'Módulo 2: Domínio da Câmera'
  },
  'lesson-7': {
    title: 'Técnicas Avançadas de Composição',
    description: 'Domine técnicas avançadas para criar composições impactantes.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Técnicas Avançadas', 'Exercícios Avançados', 'Galeria de Exemplos'],
    module: 'Módulo 3: Composição Avançada'
  },
  'lesson-8': {
    title: 'Fotografia de Retrato e Estúdios',
    description: 'Aprenda as técnicas específicas para fotografia de retrato.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Retrato', 'Guia de Estúdio', 'Poses e Iluminação'],
    module: 'Módulo 3: Composição Avançada'
  },
  'lesson-9': {
    title: 'Fotografia de Paisagens e Arquitetura',
    description: 'Domine a arte de fotografar paisagens e arquitetura.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Paisagens', 'Exemplos de Arquitetura', 'Técnicas de Campo'],
    module: 'Módulo 3: Composição Avançada'
  },
  'lesson-10': {
    title: 'Fundamentos da Edição de Imagem',
    description: 'Introdução aos conceitos básicos de edição e pós-produção.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Edição', 'Tutoriais Básicos', 'Software Recomendado'],
    module: 'Módulo 4: Pós-Produção'
  },
  'lesson-11': {
    title: 'Retoques e Efeitos Criativos',
    description: 'Aprenda técnicas de retoque e criação de efeitos especiais.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Retoques', 'Exercícios Criativos', 'Presets e Actions'],
    module: 'Módulo 4: Pós-Produção'
  },
  'lesson-12': {
    title: 'Como Organizar e Exportar Suas Imagens',
    description: 'Organize seu workflow e aprenda a exportar imagens profissionalmente.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Organização', 'Checklist de Exportação', 'Templates de Workflow'],
    module: 'Módulo 4: Pós-Produção'
  },
  'lesson-13': {
    title: 'Desenvolvimento de Projeto Fotográfico',
    description: 'Desenvolva seu primeiro projeto fotográfico completo.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Projeto', 'Guia de Desenvolvimento', 'Exemplos de Projetos'],
    module: 'Módulo 5: Projeto Final'
  },
  'lesson-14': {
    title: 'Crítica de Portfólio e Feedback',
    description: 'Aprenda a analisar e melhorar seu portfólio fotográfico.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    materials: ['PDF: Feedback', 'Exemplos de Portfólio', 'Critérios de Avaliação'],
    module: 'Módulo 5: Projeto Final'
  }
}

function loadLesson(lessonId) {
  const lesson = lessons[lessonId]
  if (!lesson) {
    alert('Aula não encontrada.')
    window.location.href = 'dashboard-aluno.html'
    return
  }

  // Atualizar informações da aula
  document.getElementById('lesson-title').textContent = lesson.title
  document.getElementById('lesson-description').textContent = lesson.description
  document.getElementById('video-player').src = lesson.videoUrl

  // Carregar materiais
  loadMaterials(lesson.materials)

  // Carregar navegação
  loadNavigation(lessonId)

  // Atualizar progresso
  updateProgress()

  // Verificar se aula já foi concluída
  const user = JSON.parse(localStorage.getItem('fotomaster_user'))
  const progress = JSON.parse(localStorage.getItem(`progress_${user.id}_photography-master`) || 'null')
  
  if (progress && progress.completedLessons.includes(lessonId)) {
    document.getElementById('btn-mark-complete').textContent = 'Aula Concluída ✓'
    document.getElementById('btn-mark-complete').disabled = true
    showNextLessonButton(lessonId)
  }
}

function loadMaterials(materials) {
  const materialsList = document.getElementById('materials-list')
  materialsList.innerHTML = ''

  materials.forEach(material => {
    const materialDiv = document.createElement('div')
    materialDiv.innerHTML = `
      <p>📄 ${material}</p>
      <button onclick="downloadMaterial('${material}')">Download</button>
    `
    materialsList.appendChild(materialDiv)
  })
}

function loadNavigation(currentLessonId) {
  const navigation = document.getElementById('course-navigation')
  navigation.innerHTML = ''

  const user = JSON.parse(localStorage.getItem('fotomaster_user'))
  const progress = JSON.parse(localStorage.getItem(`progress_${user.id}_photography-master`) || 'null')

  Object.keys(lessons).forEach(lessonId => {
    const lesson = lessons[lessonId]
    const isCompleted = progress && progress.completedLessons.includes(lessonId)
    const isCurrent = lessonId === currentLessonId

    const navItem = document.createElement('div')
    navItem.className = `nav-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`
    navItem.innerHTML = `
      <p>${isCompleted ? '✓' : isCurrent ? '▶' : '○'} ${lesson.title}</p>
      ${!isCurrent ? `<button onclick="goToLesson('${lessonId}')" ${!isCompleted && lessonId !== currentLessonId ? 'disabled' : ''}>Ir para aula</button>` : ''}
    `
    navigation.appendChild(navItem)
  })
}

function updateProgress() {
  const user = JSON.parse(localStorage.getItem('fotomaster_user'))
  const progress = JSON.parse(localStorage.getItem(`progress_${user.id}_photography-master`) || 'null')

  if (progress) {
    const progressPercentage = Math.round(progress.progressPercentage)
    document.getElementById('course-progress').textContent = progressPercentage + '%'
    document.getElementById('progress-fill').style.width = progressPercentage + '%'
  }
}

function markLessonComplete(lessonId) {
  const user = JSON.parse(localStorage.getItem('fotomaster_user'))
  const progress = JSON.parse(localStorage.getItem(`progress_${user.id}_photography-master`) || 'null')

  if (progress && !progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId)
    progress.progressPercentage = (progress.completedLessons.length / 14) * 100
    progress.lastAccessed = new Date().toISOString()

    // Definir próxima aula
    const lessonKeys = Object.keys(lessons)
    const currentIndex = lessonKeys.indexOf(lessonId)
    if (currentIndex < lessonKeys.length - 1) {
      progress.currentLesson = lessonKeys[currentIndex + 1]
    }

    localStorage.setItem(`progress_${user.id}_photography-master`, JSON.stringify(progress))

    document.getElementById('btn-mark-complete').textContent = 'Aula Concluída ✓'
    document.getElementById('btn-mark-complete').disabled = true
    
    updateProgress()
    showNextLessonButton(lessonId)
    
    alert('Aula marcada como concluída!')
    
    // Se completou o curso
    if (progress.progressPercentage >= 100) {
      alert('🎉 Parabéns! Você concluiu todo o curso! Seu certificado está disponível.')
    }
  }
}

function showNextLessonButton(currentLessonId) {
  const lessonKeys = Object.keys(lessons)
  const currentIndex = lessonKeys.indexOf(currentLessonId)
  
  if (currentIndex < lessonKeys.length - 1) {
    const nextLessonId = lessonKeys[currentIndex + 1]
    document.getElementById('btn-next-lesson').style.display = 'inline-block'
    document.getElementById('btn-next-lesson').onclick = () => goToLesson(nextLessonId)
  }
}

function goToLesson(lessonId) {
  window.location.href = `aula.html?lesson=${lessonId}`
}

function goToNextLesson() {
  const urlParams = new URLSearchParams(window.location.search)
  const currentLessonId = urlParams.get('lesson')
  const lessonKeys = Object.keys(lessons)
  const currentIndex = lessonKeys.indexOf(currentLessonId)
  
  if (currentIndex < lessonKeys.length - 1) {
    const nextLessonId = lessonKeys[currentIndex + 1]
    goToLesson(nextLessonId)
  }
}

function downloadMaterial(materialName) {
  alert(`Download iniciado: ${materialName}`)
  // Aqui seria implementada a lógica real de download
}
