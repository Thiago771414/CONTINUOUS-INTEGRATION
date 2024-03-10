# Sobre o Projeto
Este projeto é uma aplicação completa que inclui um backend, um frontend e testes automatizados utilizando Cypress. O objetivo é realizar testes de preenchimento automático de formulário, garantindo que todas as funcionalidades estejam funcionando corretamente.

# Componentes do Projeto
Backend: Uma API REST construída com Node.js, express e MongoDB que gerencia usuários.
Frontend: Uma interface de usuário construída com React e React Admin para interação com os dados dos usuários.
Testes: Testes E2E (end-to-end) automatizados com Cypress para validar a funcionalidade de preenchimento automático do formulário.

# Configuração Inicial
Pré-requisitos
Node.js (recomendado: versão 16.x ou superior)
npm (vem com Node.js)
MongoDB local ou remoto
Cypress para execução de testes E2E

#Instalação
Clone o repositório
````javascript
git clone <url-do-repositorio>
````
Instale as dependências do backend
Navegue até o diretório do backend e execute:
````javascript
cd backend
npm install
````
Instale as dependências do frontend
Abra um novo terminal, navegue até o diretório do frontend e execute:
````javascript
cd frontend
npm install
````
# Execução
## Inicializando o Backend
No diretório do backend, execute:
````javascript
npm start
Isso iniciará o servidor na porta definida no arquivo .env ou na porta padrão 3000.
````
# Inicializando o Frontend
No diretório do frontend, execute:
````javascript
npm start
````
Isso iniciará a aplicação React na porta padrão 3001.

# Executando Testes com Cypress
Para executar os testes E2E com Cypress:
![Mobile 1](https://cypress-io.ghost.io/blog/content/images/2020/07/passing-test.gif)
Certifique-se de que o backend e o frontend estejam rodando.
Navegue até o diretório do projeto de testes e execute:
````javascript
npx cypress open
````
Isso abrirá a interface do Cypress, onde você pode selecionar e executar os testes especificados.

# Estrutura do Workflow CI
O projeto inclui workflows de CI configurados com GitHub Actions para realizar análise estática de código, teste de vulnerabilidades e execução de testes automatizados:

Análise Estática: Verifica a qualidade do código e padrões de codificação.
Teste de Vulnerabilidade: Executa npm audit para identificar dependências com vulnerabilidades conhecidas.
Testes de Sistema e Integração: Utiliza Cypress para testes E2E, garantindo que a aplicação como um todo funcione conforme esperado.
Cada workflow é acionado por push ou pull request na branch main.

![Mobile 1](https://user-images.githubusercontent.com/814322/45590890-89e9c800-b8f8-11e8-8c93-620ae51be26a.png)

# Contribuição
Contribuições são muito bem-vindas. Para contribuir:

Faça o fork do projeto.
Crie uma branch para sua funcionalidade (git checkout -b feature/AmazingFeature).
Faça commit de suas mudanças (git commit -m 'Add some AmazingFeature').
Faça push para a branch (git push origin feature/AmazingFeature).
Abra um Pull Request.

# Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.
