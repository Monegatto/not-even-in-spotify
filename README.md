
# Not Even in Spotify

https://github.com/Monegatto/not-even-in-spotify

Este projeto é uma aplicação web que permite aos usuários buscar músicas usando a API do Spotify e visualizar seu histórico de pesquisas. Os dados de login e buscas são armazenados em um banco de dados para referência futura. A interface é intuitiva, com navegação fluida e um design responsivo. O objetivo é oferecer uma experiência prática para explorar e gerenciar músicas de forma eficiente.

⚠️⚠️⚠️

**Devido à existências de arquivos necessários para o uso do HTTPS, como certificados digitais e chaves, optamos por compactar a pasta do projeto junto com os certificados ao invés de disponibilizá-los publicamente, o projeto também se encontra disponível no Github, entretanto, a versão compactada já conta com os certificados e etc.**

⚠️⚠️⚠️
## Authors

- [Giovani Gabriel Mendes Ohira de Rossi](https://www.github.com/giovaniohira) 2545360
- [João Pedro Botter Monegatto](https://www.github.com/Monegatto) 2454386


## Run Locally

Clone o projeto ou use a versão compactada

```bash
  git clone https://github.com/Monegatto/not-even-in-spotify
```

Vá para a pasta do projeto

```bash
  cd not-even-in-spotify
```

Crie um banco de dados Postgres e chame-o de "spotify-project"

```bash
É possível modificar todas as informações relacionadas ao usuário do Postgres, 
como username, senha e nome do banco no caminho:

  .../backend/config/config.json
```


Execute os seguintes comandos no caminho  '_./not-even-in-spotify/backend_'


```bash
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
```

Na pasta backend, instale as dependências

```bash
  cd .\backend\
  npm install
```

Inicie o servidor

```bash
  npm start
```

Vá para a pasta frontend e instale as dependências

```bash
  cd ..\frontend\
  npm install
```

Inicie o frontend

```bash
  npm run dev
```
