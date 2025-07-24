// Controle da página de certificado

document.addEventListener('DOMContentLoaded', () => {
  // Verificar se usuário é aluno
  const user = JSON.parse(localStorage.getItem('fotomaster_user'))
  if (!user || user.type !== 'student') {
    alert('Acesso negado. Apenas alunos podem acessar esta área.')
    window.location.href = 'login.html'
    return
  }

  // Verificar se aluno completou o curso
  const progress = JSON.parse(localStorage.getItem(`progress_${user.id}_photography-master`) || 'null')
  if (!progress || progress.progressPercentage < 100) {
    alert('Você precisa completar o curso para acessar o certificado.')
    window.location.href = 'dashboard-aluno.html'
    return
  }

  // Atualizar display do usuário
  document.getElementById('user-display').textContent = `Olá, ${user.name}`

  // Gerar dados do certificado
  generateCertificate(user, progress)

  // Event listeners
  document.getElementById('btn-download').addEventListener('click', downloadCertificate)
  document.getElementById('btn-print').addEventListener('click', printCertificate)
  
  const logoutBtn = document.getElementById('logout-btn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('fotomaster_user')
      window.location.href = 'index.html'
    })
  }
})

function generateCertificate(user, progress) {
  const completionDate = new Date(progress.lastAccessed).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  
  const issueDate = new Date().toLocaleDateString('pt-BR')
  const certificateId = `FOTO-${Date.now()}`

  // Atualizar dados no certificado
  document.getElementById('student-name').textContent = user.name
  document.getElementById('completion-date').textContent = completionDate
  document.getElementById('certificate-id').textContent = certificateId
  document.getElementById('issue-date').textContent = issueDate

  // Salvar dados do certificado
  const certificateData = {
    studentId: user.id,
    studentName: user.name,
    courseName: 'Domine a Arte da Fotografia',
    completionDate,
    instructor: 'Prof. Marcelo',
    certificateId,
    issueDate
  }

  // Adicionar aos certificados emitidos
  const certificates = JSON.parse(localStorage.getItem('fotomaster_certificates') || '[]')
  const existingCert = certificates.find(cert => cert.studentId === user.id)
  
  if (!existingCert) {
    certificates.push(certificateData)
    localStorage.setItem('fotomaster_certificates', JSON.stringify(certificates))
  }
}

function downloadCertificate() {
  const user = JSON.parse(localStorage.getItem('fotomaster_user'))
  const progress = JSON.parse(localStorage.getItem(`progress_${user.id}_photography-master`))
  
  const completionDate = new Date(progress.lastAccessed).toLocaleDateString('pt-BR')
  const certificateId = document.getElementById('certificate-id').textContent
  
  // Criar conteúdo do certificado em texto
  const certificateText = `
CERTIFICADO DE CONCLUSÃO

Certificamos que ${user.name} concluiu com êxito o curso
"Domine a Arte da Fotografia"

Carga horária: 40 horas
Data de conclusão: ${completionDate}
Instrutor: Prof. Marcelo

Certificado ID: ${certificateId}
Data de emissão: ${new Date().toLocaleDateString('pt-BR')}

FotoMaster - Plataforma de Ensino em Fotografia

Este certificado comprova que o aluno demonstrou competência e dedicação 
no aprendizado das técnicas profissionais de fotografia, desde conceitos 
básicos até pós-produção avançada.
  `
  
  // Criar e baixar arquivo
  const element = document.createElement('a')
  const file = new Blob([certificateText], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = `certificado-fotomaster-${user.name.replace(/\s+/g, '-').toLowerCase()}.txt`
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
  
  alert('Certificado baixado com sucesso!')
}

function printCertificate() {
  // Ocultar controles e elementos não necessários para impressão
  const controls = document.querySelector('.certificate-controls')
  const congratulations = document.querySelector('.congratulations')
  const header = document.querySelector('header')
  
  controls.style.display = 'none'
  congratulations.style.display = 'none'
  header.style.display = 'none'
  
  // Imprimir
  window.print()
  
  // Restaurar elementos após impressão
  setTimeout(() => {
    controls.style.display = 'block'
    congratulations.style.display = 'block'
    header.style.display = 'block'
  }, 1000)
}

// Estilos específicos para impressão
const printStyles = `
  @media print {
    body {
      background: white !important;
      color: black !important;
    }
    
    .certificate-controls,
    .congratulations,
    header {
      display: none !important;
    }
    
    .certificate {
      box-shadow: none !important;
      border: 2px solid #333 !important;
      page-break-inside: avoid;
    }
    
    .certificate-container {
      max-width: none !important;
      margin: 0 !important;
      padding: 20px !important;
    }
  }
`

// Adicionar estilos de impressão
const styleSheet = document.createElement('style')
styleSheet.textContent = printStyles
document.head.appendChild(styleSheet)
