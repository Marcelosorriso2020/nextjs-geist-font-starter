// Painel administrativo do Professor Marcelo
// Funcionalidades: gerenciar cursos, alunos, certificados

document.addEventListener('DOMContentLoaded', () => {
  // Verificar se usuário é o professor Marcelo
  const user = JSON.parse(localStorage.getItem('fotomaster_user'))
  if (!user || user.type !== 'teacher' || user.email !== 'marcelo@fotomaster.com') {
    alert('Acesso negado. Apenas o Professor Marcelo pode acessar esta área.')
    window.location.href = 'login.html'
    return
  }

  // Inicializar dados do curso se não existirem
  initializeCourseData()
  
  // Carregar estatísticas
  loadStatistics()
  
  // Carregar lista de cursos
  loadCourses()
  
  // Carregar lista de alunos
  loadStudents()
  
  // Carregar certificados
  loadCertificates()

  // Event listeners
  document.getElementById('btn-novo-curso').addEventListener('click', showNewCourseForm)
})

function initializeCourseData() {
  const courses = JSON.parse(localStorage.getItem('fotomaster_courses') || '[]')
  
  if (courses.length === 0) {
    // Criar curso padrão de fotografia
    const defaultCourse = {
      id: 'photography-master',
      title: 'Domine a Arte da Fotografia',
      description: 'Aprenda técnicas profissionais de fotografia, desde o básico até a pós-produção.',
      instructor: 'Prof. Marcelo',
      duration: '40 horas',
      totalLessons: 14,
      active: true,
      modules: [
        {
          id: 'module-1',
          title: 'Introdução à Fotografia',
          description: 'História da Fotografia e Suas Evoluções',
          order: 1,
          lessons: [
            {
              id: 'lesson-1',
              title: 'História da Fotografia e Suas Evoluções',
              description: 'Aula 1 do Módulo 1',
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              duration: 20,
              materials: ['PDF: História da Fotografia', 'Checklist: Evoluções']
            },
            {
              id: 'lesson-2',
              title: 'Fundamentos Básicos da Fotografia',
              description: 'Aula 2 do Módulo 1',
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              duration: 18,
              materials: ['PDF: Fundamentos', 'Exercícios Básicos']
            },
            {
              id: 'lesson-3',
              title: 'Introdução aos Equipamentos Fotográficos',
              description: 'Aula 3 do Módulo 1',
              videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
              duration: 22,
              materials: ['PDF: Equipamentos', 'Guia de Uso']
            }
          ]
        }
      ]
    }
    
    localStorage.setItem('fotomaster_courses', JSON.stringify([defaultCourse]))
  }
}

function loadStatistics() {
  const users = JSON.parse(localStorage.getItem('fotomaster_users') || '[]')
  const students = users.filter(u => u.type === 'student')
  
  let completedStudents = 0
  let totalStudyTime = 0
  
  students.forEach(student => {
    const progress = JSON.parse(localStorage.getItem(`progress_${student.id}_photography-master`) || 'null')
    if (progress && progress.progressPercentage >= 100) {
      completedStudents++
    }
    if (progress) {
      totalStudyTime += progress.progressPercentage * 0.4 // Simular tempo baseado no progresso
    }
  })
  
  const completionRate = students.length > 0 ? (completedStudents / students.length * 100).toFixed(1) : 0
  const averageStudyTime = students.length > 0 ? (totalStudyTime / students.length).toFixed(1) : 0
  
  document.getElementById('total-alunos').textContent = students.length
  document.getElementById('taxa-conclusao').textContent = completionRate + '%'
  document.getElementById('tempo-estudo').textContent = averageStudyTime + 'h'
  document.getElementById('aulas-populares').textContent = 'História da Fotografia, Fundamentos Básicos'
  document.getElementById('feedback-alunos').textContent = 'Curso excelente! Muito didático.'
}

function loadCourses() {
  const courses = JSON.parse(localStorage.getItem('fotomaster_courses') || '[]')
  const listaCursos = document.getElementById('lista-cursos')
  
  listaCursos.innerHTML = ''
  
  courses.forEach(course => {
    const courseDiv = document.createElement('div')
    courseDiv.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <p>Status: ${course.active ? 'Ativo' : 'Inativo'}</p>
      <p>Total de aulas: ${course.totalLessons}</p>
      <button onclick="editCourse('${course.id}')">Editar</button>
      <button onclick="toggleCourseStatus('${course.id}')">${course.active ? 'Desativar' : 'Ativar'}</button>
    `
    listaCursos.appendChild(courseDiv)
  })
}

function loadStudents() {
  const users = JSON.parse(localStorage.getItem('fotomaster_users') || '[]')
  const students = users.filter(u => u.type === 'student')
  const listaAlunos = document.getElementById('lista-alunos')
  
  listaAlunos.innerHTML = ''
  
  if (students.length === 0) {
    listaAlunos.innerHTML = '<p>Nenhum aluno inscrito ainda.</p>'
    return
  }
  
  students.forEach(student => {
    const progress = JSON.parse(localStorage.getItem(`progress_${student.id}_photography-master`) || 'null')
    const progressPercentage = progress ? progress.progressPercentage : 0
    
    const studentDiv = document.createElement('div')
    studentDiv.innerHTML = `
      <h4>${student.name}</h4>
      <p>E-mail: ${student.email}</p>
      <p>Progresso: ${progressPercentage.toFixed(1)}%</p>
      <p>Inscrito em: ${new Date(student.createdAt).toLocaleDateString('pt-BR')}</p>
      ${progressPercentage >= 100 ? '<button onclick="generateCertificate(\'' + student.id + '\', \'' + student.name + '\')">Gerar Certificado</button>' : ''}
    `
    listaAlunos.appendChild(studentDiv)
  })
}

function loadCertificates() {
  const certificates = JSON.parse(localStorage.getItem('fotomaster_certificates') || '[]')
  const listaCertificados = document.getElementById('lista-certificados')
  
  listaCertificados.innerHTML = ''
  
  if (certificates.length === 0) {
    listaCertificados.innerHTML = '<p>Nenhum certificado emitido ainda.</p>'
    return
  }
  
  certificates.forEach(cert => {
    const certDiv = document.createElement('div')
    certDiv.innerHTML = `
      <h4>Certificado para ${cert.studentName}</h4>
      <p>Curso: ${cert.courseName}</p>
      <p>Data de conclusão: ${cert.completionDate}</p>
      <p>ID do certificado: ${cert.certificateId}</p>
    `
    listaCertificados.appendChild(certDiv)
  })
}

function showNewCourseForm() {
  const title = prompt('Título do novo curso:')
  const description = prompt('Descrição do curso:')
  
  if (title && description) {
    const courses = JSON.parse(localStorage.getItem('fotomaster_courses') || '[]')
    const newCourse = {
      id: 'course-' + Date.now(),
      title,
      description,
      instructor: 'Prof. Marcelo',
      duration: '0 horas',
      totalLessons: 0,
      active: true,
      modules: []
    }
    
    courses.push(newCourse)
    localStorage.setItem('fotomaster_courses', JSON.stringify(courses))
    loadCourses()
    alert('Curso criado com sucesso!')
  }
}

function editCourse(courseId) {
  alert('Funcionalidade de edição será implementada em breve.')
}

function toggleCourseStatus(courseId) {
  const courses = JSON.parse(localStorage.getItem('fotomaster_courses') || '[]')
  const course = courses.find(c => c.id === courseId)
  
  if (course) {
    course.active = !course.active
    localStorage.setItem('fotomaster_courses', JSON.stringify(courses))
    loadCourses()
    alert(`Curso ${course.active ? 'ativado' : 'desativado'} com sucesso!`)
  }
}

function generateCertificate(studentId, studentName) {
  const certificateData = {
    studentId,
    studentName,
    courseName: 'Domine a Arte da Fotografia',
    completionDate: new Date().toLocaleDateString('pt-BR'),
    instructor: 'Prof. Marcelo',
    certificateId: `FOTO-${Date.now()}`
  }
  
  const certificates = JSON.parse(localStorage.getItem('fotomaster_certificates') || '[]')
  certificates.push(certificateData)
  localStorage.setItem('fotomaster_certificates', JSON.stringify(certificates))
  
  loadCertificates()
  alert(`Certificado gerado para ${studentName}!\nID: ${certificateData.certificateId}`)
}
