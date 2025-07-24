# FotoMaster - LMS de Fotografia 📷

Sistema de Gestão de Aprendizagem (LMS) 100% estático para cursos de fotografia, desenvolvido com HTML, CSS e JavaScript puro.

## 🎯 Características Principais

- **100% Estático**: Funciona sem backend, usando apenas localStorage
- **Professor Único**: Prof. Marcelo (login oculto/privado)
- **Hospedagem Gratuita**: Compatível com GitHub Pages
- **Responsivo**: Funciona em desktop e mobile
- **Certificados**: Geração automática de certificados
- **Progresso**: Sistema completo de acompanhamento

## 🚀 Como Usar

### 1. Hospedagem no GitHub Pages

1. Faça upload de todos os arquivos da pasta `static-lms/` para um repositório GitHub
2. Vá em Settings > Pages
3. Selecione Branch: main, Folder: / (root)
4. Seu LMS estará disponível em: `https://seu-usuario.github.io/nome-do-repositorio/`

### 2. Credenciais de Acesso

#### Professor Marcelo (Único)
- **E-mail**: `marcelo@fotomaster.com`
- **Senha**: `5711`
- **Acesso**: Login oculto/privado para gerenciar o curso

#### Alunos
- Podem se cadastrar livremente através da página de inscrição
- Login normal após cadastro

## 📁 Estrutura do Projeto

```
static-lms/
├── index.html              # Landing Page
├── login.html              # Login de aluno/professor
├── inscricao.html          # Cadastro de alunos
├── dashboard-aluno.html    # Painel do aluno
├── dashboard-professor.html # Painel do professor
├── aula.html               # Player de aula individual
├── certificado.html        # Página de certificado
├── css/
│   └── estilo.css          # Estilos principais
└── js/
    ├── app.js              # Login e navegação
    ├── inscricao.js        # Cadastro de usuários
    ├── admin.js            # Painel do professor
    ├── aluno.js            # Painel do aluno
    ├── lesson.js           # Controle de aulas
    └── certificado.js      # Geração de certificados
```

## 🎓 Funcionalidades Implementadas

### Para o Professor Marcelo
- ✅ Dashboard com estatísticas de alunos
- ✅ Visualização de progresso dos alunos
- ✅ Geração de certificados
- ✅ Gerenciamento básico de cursos
- ✅ Lista de alunos inscritos

### Para os Alunos
- ✅ Cadastro e login
- ✅ Inscrição gratuita no curso
- ✅ Acompanhamento de progresso (0% a 100%)
- ✅ Acesso a 14 aulas organizadas em 5 módulos
- ✅ Player de vídeo integrado (YouTube)
- ✅ Materiais complementares
- ✅ Certificado automático ao completar o curso
- ✅ Download e impressão do certificado

## 📚 Estrutura do Curso

### Módulo 1: Introdução à Fotografia
1. História da Fotografia e Suas Evoluções
2. Fundamentos Básicos da Fotografia
3. Introdução aos Equipamentos Fotográficos

### Módulo 2: Domínio da Câmera e Técnicas Básicas
4. Entendendo o Funcionamento da Câmera
5. Composição e Técnicas Básicas
6. Prática: Fotografando em Diversos Ambientes

### Módulo 3: Composição Avançada e Técnicas Fotográficas
7. Técnicas Avançadas de Composição
8. Fotografia de Retrato e Estúdios
9. Fotografia de Paisagens e Arquitetura

### Módulo 4: Introdução à Pós-Produção
10. Fundamentos da Edição de Imagem
11. Retoques e Efeitos Criativos
12. Como Organizar e Exportar Suas Imagens

### Módulo 5: Projeto Final e Discussão de Portfólio
13. Desenvolvimento de Projeto Fotográfico
14. Crítica de Portfólio e Feedback

## 🔧 Personalização

### Alterar Vídeos das Aulas
1. Abra `js/lesson.js`
2. Localize o objeto `lessons`
3. Substitua as URLs do YouTube pelos seus vídeos
4. Recomendação: Use vídeos "Não listados" no YouTube

### Adicionar Materiais
1. Hospede PDFs no Google Drive ou Dropbox
2. Atualize os arrays `materials` em `js/lesson.js`
3. Configure links de download nos materiais

### Modificar Informações do Curso
1. Edite `js/admin.js` para alterar dados do curso padrão
2. Modifique `js/aluno.js` para ajustar informações exibidas
3. Atualize textos em todas as páginas HTML

## 💾 Armazenamento de Dados

O sistema usa `localStorage` do navegador para armazenar:
- Dados de usuários cadastrados
- Senhas (em produção, use hash)
- Progresso dos alunos
- Certificados emitidos
- Configurações do curso

## 🎨 Personalização Visual

### Cores Principais
- Laranja: `#ff4500`
- Laranja Claro: `#ffa500`
- Roxo: `#4b0082`
- Fundo: Gradiente roxo para laranja

### Modificar Cores
Edite `css/estilo.css` e altere as variáveis de cor conforme necessário.

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🖨️ Certificados

### Características
- Design profissional
- Dados automáticos do aluno
- ID único do certificado
- Download em TXT
- Impressão otimizada
- Armazenamento local

### Personalizar Certificado
1. Edite `certificado.html` para alterar o layout
2. Modifique `js/certificado.js` para ajustar dados
3. Atualize estilos em `css/estilo.css`

## 🔒 Segurança

### Limitações (Ambiente de Desenvolvimento)
- Senhas armazenadas em texto simples no localStorage
- Dados apenas no navegador local
- Sem validação server-side

### Para Produção
- Considere usar Firebase para dados
- Implemente hash de senhas
- Adicione validações extras

## 🚀 Deploy e Hospedagem

### GitHub Pages (Gratuito)
1. Crie repositório no GitHub
2. Upload dos arquivos
3. Ative GitHub Pages
4. Acesse via URL fornecida

### Outras Opções Gratuitas
- Netlify
- Vercel
- Firebase Hosting

## 📞 Suporte

Para dúvidas sobre o sistema:
1. Verifique este README
2. Analise o código JavaScript
3. Teste as funcionalidades localmente

## 📄 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

---

**FotoMaster LMS** - Sistema completo de ensino de fotografia
Desenvolvido com ❤️ para professores independentes
