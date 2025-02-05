**Postlee** é um projeto desenvolvido para o processo seletivo da [Arte Arena](https://artearena.com.br). É uma aplicação full stack que utiliza Next.js para renderização do webapp, permitindo que os usuários pesquisem ou adicionem posts por meio de um campo com funcionalidade de autocomplete.

O projeto implementa otimizações no processo de pesquisa, como o uso de cache com Redis, armazenamento de dados não voláteis em MySQL e sincronizações diárias com uma API externa para manter os dados atualizados.

#### Requisitos

Ambos os projetos estão configurados para rodar somente utilizando o Docker. Portanto, somente é necessário ter o Docker instalado no computador.
#### Como rodar o projeto

1. Primeiramente, clone o projeto:
```
git clone git@github.com:pyurips/arte-arena-selection-process.git
```

2.  Entre no diretório clonado e suba os containers que estão nas subpastas:
```
cd web-api && ./vendor/bin/sail up
```

```
cd web-app && docker build -t web-app . && docker run -p 3000:3000 web-app
```

3. (Opcional) Caso queira realizar a sincronização dos dados da API externa antes das 24h percorridas:
```
cd web-api && ./vendor/bin/sail artisan tinker && \App\Jobs\SyncItemsJob::dispatchSync();
```

> [!NOTE]
> Durante o desenvolvimento no front-end (web-app), você pode executar o comando abaixo para formatar todo o código automaticamente.
```
npm run fmt
```

#### Considerações e observações sobre o projeto

* Neste projeto, não foram implementados métodos de segurança de APIs, como: rate limiter, autenticação, autorização, anti XSS, anti CSRF, política de CORS e entre outros.
* Na tabela `items`, para haver uma separação de dados sincronizados com a API externa e dados inseridos pelos usuários da aplicação, foi necessário adicionar uma coluna chamada `external_id` que representa o `id` de cada post da API externa. O objetivo é conseguir uma alta manutenibilidade, desde que, a cada sincronização (24h ou manual) todas as linhas que contém valor na coluna `external_id` sofrerão um *flush* de dados. É uma estratégia que, apesar de ser um pouco mais custosa em aspectos computacionais, é assertiva na sincronização dos dados. Como, neste caso, a sincronização precisa ser feita todos os dias, as deleções, atualizações e inserções da API externa precisam conter no nosso banco de dados. Em caso de sincronizações maiores, como milhões de linhas, seria recomendado realizar um *streaming* de sincronização.
* O autocomplete chamará a API a cada vez que o usuário digita, utilizando do cache (Redis) para obter menores custos e maior desempenho. O limite de títulos semelhantes que aparecerão no input é 20. Portanto, enquanto o usuário continuar digitando o título, a API vai ser encarregada de trazer os dados que sejam coesos com que o usuário está digitando, diminuindo os custos para cada chamada ao banco de dados/cache.
* Também não foi aprofundado o tratamento de exceptions, erros da aplicação back-end e feedback de erros para os usuários no front-end.
