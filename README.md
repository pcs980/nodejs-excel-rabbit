# Proz Alunos

## Objetivo do produto a ser entregue

### Criar uma API REST que:
- Receberá uma planilha de alunos (segue em anexo) que deve ser processada em background.
- Ter um endpoint que informe se a planilha foi processada com sucesso ou não.
- Seja possível visualizar, editar e apagar os alunos (só é possível criar novos alunos via planilha).

#### Exemplo de conteúdo da planilha

| Nome do Aluno | Estado Civil | Email | CPF | RG | Data de Nascimento | Sexo |
|---------------|:------------:|-------|-----|----|:------------------:|:----:|
| Ana Júlia     |CASADO(A)  |anajulia@gmail.com   |888.888.888-88|22.222.222-2|08/29/2021|Feminino|
| João Bezerra  |SOLTEIRO(A)|joaobezerra@gmail.com|999.999.999-99|11.111.111-1|05/27/1946|Masculino|
| Val Silva     |CASADO(A)  |valsilva@gmail.com   |777.777.777-77|33.333.333-3|12/10/1984|Feminino|

### O que vamos avaliar no teste
- Se você atingiu o objetivo do produto a ser desenvolvido.
- Identificar seu conhecimento em testes automatizados (pirâmide de testes).
- Avaliar seu conhecimento sobre APIs.
- Avaliar a arquitetura e organização do código criado.
- Se a sua solução foi simples de entender na visão de outro desenvolvedor.

### Requisitos técnicos

- NodeJS
- Utilizar Docker
- Testes automatizados
- Git/Gitlab/Github/Bitbucket
- Utilizar Fila
- REST
- JSON

## Executando o projeto

Para testar o projeto localmente é preciso:

### Iniciar RabbitMQ

Inicie um serviço do RabbitMQ para permitir ao Proz Alunos publicar e consumir mensagens via fila MQ.

```sh
docker run -d -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3.10.7-management
```

Ou usando um script preparado:

```sh
npm run docker:queue
```

### Iniciar o servidor

Execute o script abaixo para subir o servidor.

```sh
npm run dev
```

### Construir imagem

Para iniciar o servidor como um container Docker use os scripts para construir a imagem:

```sh
npm run docker:build
```

E subir o container

```sh
npm run docker:start
```

> Note que neste script é esperado que o RabbitMQ também esteja em execução via container e usando a rede padrão do Docker, [*bridge*](https://docs.docker.com/network/network-tutorial-standalone/).

## Testando a API

Uma coleção [Postman](https://www.postman.com/downloads/) está disponível na pasta raíz deste projeto:

- [proz-alunos.postman_collection.json](./proz-alunos.postman_collection.json)

E pode ser usada para testar os *endpoints* do servidor.

### Serviço para Estudantes

#### `POST /students/upload`

Envia uma planilha para cadastro de novos alunos.\
A requisição não aguarda o processamento do arquivo, então um **ticket** é retornado para acompanhar o processamento do arquivo.

#### `GET /students`

Recupera todos os estudantes cadastrados.
Retorna uma lista (*array*) de objetos com o seguinte layout:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id         | `string` | Código identificaor (UUIDv4)
| name       | `string` | Nome do aluno
| email      | `string` | E-mail do aluno
| maritalStatus  | `string` | Estado civil: **CASADO(A)** ou **SOLTEIRO(A)**
| taxpayerNumber | `string` | Número do CPF
| identity   | `string` | RG
| birthDate  | `string` | Data de nascimento
| gender     | `string` | Sexo: **FEMININO** ou **MASCULINO**
| ticket     | `string` | Código do ticket vinculado ao processamento do arquivo.

#### `GET /students/:id`

Recupera um estudante pelo seu código informado no *url parameter* `id`.

#### `PUT /students/:id`

Atualiza um estudante pelo seu código informado no *url parameter* `id`.\
É permitida a alteração de qualquer campo no cadastro do aluno.

#### `DELETE /students/:id`

Exclui um estudante pelo seu código informado no *url parameter* `id`.

### Serviço para Tickets

#### `GET /tickets`

Recupera todos os tickets cadastrados.\
Retorna uma lista de objetos com o seguinte layout:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| code     | `string` | Código do ticket
| filename | `string` | Nome do arquivo recebido
| status   | `string` | Situação do processamento do arquivo: **STATUS_CREATED**, **STATUS_DONE** e **STATUS_ERROR**.
| error    | `string` | Erro no processamento, se houver.

#### `GET /tickets/:code`

Recupera um ticket pelo seu código informado no *url parameter* `code`.
