# 📦 Sistema de Inventário de TI

![GitHub last commit](https://img.shields.io/github/last-commit/samuelalbuquerque01/ProjetoEdn)
![GitHub repo size](https://img.shields.io/github/repo-size/samuelalbuquerque01/ProjetoEdn)
![GitHub license](https://img.shields.io/github/license/samuelalbuquerque01/ProjetoEdn)

Sistema completo para gerenciamento de inventário de TI, com cadastro de equipamentos, softwares, usuários e relacionamentos entre eles.

---

## ✨ Demonstração

[![Acessar Demonstração](https://img.shields.io/badge/-Acessar%20Demo-brightgreen)](https://samuelalbuquerque01.github.io/ProjetoEdn/)

---

## 🚀 Funcionalidades Principais

### 🔐 Autenticação
- Sistema de login seguro
- Controle de acesso por perfis
- Armazenamento de token JWT

### 🖥️ Cadastros
- Máquinas (hardware completo com especificações técnicas)
- Softwares (com controle de licenças)
- Usuários e departamentos
- PIP (Patrimônio de Informática Permanente)
- Relacionamentos entre entidades

### 📊 Dashboard
- Gráficos interativos com Chart.js
  - Distribuição de hardware
  - Itens por departamento
- Estatísticas em tempo real
  - Total de itens cadastrados
  - Últimos cadastros
  - Tipos de hardware

### 📋 Inventário Completo
- Tabela com todos os relacionamentos
- Visualização detalhada de cada item
- Filtros e busca
- Exportação para CSV

### 🎨 Interface
- Tema claro/escuro
- Design responsivo
- Animações e feedback visual
- Notificações com Toast

---

## 🛠️ Tecnologias Utilizadas

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chart.js&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?logo=font-awesome&logoColor=white)

### Backend 
- Endpoints RESTful
- Autenticação JWT
- Java 

---

## 📁 Estrutura do Projeto

```
ProjetoEdn/
├── index.html                  # Página principal
├── login.html                  # Página de login
├── css/
│   ├── base.css
│   ├── components.css
│   ├── dashboard.css
│   ├── login.css
│   ├── responsive.css
│   └── variables.css
├── script/
│   ├── auth.js
│   ├── charts.js
│   ├── departamento.js
│   ├── inventory.js
│   ├── maquina.js
│   ├── pip.js
│   ├── relacionamento.js
│   ├── software.js
│   ├── ui.js
│   └── usuario.js
└── README.md
```

---

## ⚙️ Como Executar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/samuelalbuquerque01/ProjetoEdn.git
cd ProjetoEdn
```

2. Execute um servidor local (exemplo com Python):

```bash
python -m http.server 8000
```

3. Acesse no navegador:

```
http://localhost:8000
```

---

## 🔑 Credenciais de Teste

### Administrador
- **Usuário**: `admin`  
- **Senha**: `Admin@123`

### Usuário Comum
- **Usuário**: `user`  
- **Senha**: `User@123`

---

## 📌 Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge)
- Servidor backend configurado (para operação completa)
- Conexão com API local em: `http://localhost:8080`

---

## 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 🤝 Como Contribuir

1. Faça um fork do projeto  
2. Crie uma branch para sua feature:

```bash
git checkout -b feature/nova-feature
```

3. Commit suas mudanças:

```bash
git commit -m 'Adiciona nova funcionalidade'
```

4. Push para a branch:

```bash
git push origin feature/nova-feature
```

5. Abra um Pull Request

---

## 📌 Roadmap

- Integração com banco de dados
- Sistema de backup/restauração
- Relatórios personalizados
- Controle de versão de software
- Monitoramento de garantias

---

## ✉️ Contato

**Samuel Albuquerque**  
📧 samuel_albuquerque_f@hotmail.com  
[![GitHub](https://img.shields.io/badge/GitHub-100000?logo=github&logoColor=white)](https://github.com/samuelalbuquerque01)

---

## 👨‍💻 Contribuidores

Agradecimentos especiais a todos que estão contribuindo para este projeto.

- **[Alexsandro (O-Alexsandro)](https://github.com/O-Alexsandro)** - Contribuindo com o desenvolvimento do backend

