# Julia Aguiar — Portfólio pessoal

Site estático em português, feito em HTML, CSS e JavaScript. Sem instalação, build ou dependências de rede para fontes e imagens.

## Visualizar

Abra `index.html` no navegador ou, nesta pasta, execute:

```sh
python3 -m http.server 8000
```

Acesse http://localhost:8000. O servidor é apenas uma opção de visualização; o site também funciona aberto diretamente.

## Publicar no GitHub Pages

1. Envie os arquivos deste diretório para o repositório `portfolio-julia-aguiar`.
2. No GitHub, acesse **Settings → Pages → Build and deployment**.
3. Escolha **Deploy from a branch**, selecione a branch que contém estes arquivos e a pasta **/ (root)**, e salve.
4. Após a publicação, o endereço esperado é https://jujuaguiard12-cell.github.io/portfolio-julia-aguiar/.

Todos os caminhos são relativos e funcionam no subdiretório do GitHub Pages. Nenhuma publicação é feita automaticamente por este projeto.

## Editar o conteúdo

- `index.html`: textos, navegação, trajetória, projetos, galeria e links.
- `css/style.css`: cores em `:root`, estilos, responsividade e animações.
- `js/main.js`: menu móvel, revelação na rolagem, seção ativa e controle de animação.
- `assets/fonts/`: fontes DM Sans locais da referência.
- `assets/images/`: favicon e futuras fotos.

### Foto principal

Salve a foto em `assets/images/julia.jpg`. Em `index.html`, substitua o bloco completo `<div class="photo-placeholder">…</div>` por:

```html
<img src="assets/images/julia.jpg" alt="Julia Aguiar" width="800" height="1000">
```

Mantenha o `<figure class="portrait">` e seu `<figcaption>`.

### Galeria

Em cada `<figure class="gallery-placeholder">`, remova `.gallery-symbol` e `.reserved` e acrescente uma imagem com descrição real do registro:

```html
<img src="assets/images/minha-foto.jpg" alt="Descrição da minha foto" loading="lazy" width="800" height="1000">
```

Atualize as legendas. Nenhuma fotografia de outra pessoa foi usada como foto de Julia.

### Novos projetos e contato

Substitua um `<article class="future-project">` na seção `#projetos` por título, descrição e links reais quando um novo projeto estiver pronto. Os cartões atuais são apenas espaços reservados, sem projetos ou links fictícios. Em `#contato`, troque os textos “A adicionar” e “Em breve” por links reais quando desejar. Não há formulário nem coleta de dados.

## Referência

O arquivo `forma-ai.aura.build (1).zip` foi preservado integralmente. A direção visual foi inspirada nessa referência; os textos e a estrutura foram adaptados ao portfólio solicitado.

## Acessibilidade e movimento

Menu com teclado e Escape, link para pular ao conteúdo, foco visível, textos alternativos e navegação por âncoras. O site respeita `prefers-reduced-motion` e oferece um botão fixo para pausar animações. Sem JavaScript, o conteúdo continua visível e os links e a linha do tempo continuam funcionais.

## Verificação desta versão

- JavaScript validado com `node --check`.
- Âncoras internas, IDs únicos e caminhos de imagens, fontes, CSS e JavaScript conferidos.
- ZIP comparado com a versão original do Git: sem alterações.
- A seção Portfólio contém somente dois espaços reservados para projetos futuros, sem links de projetos.
- A prévia gerenciada não conectou ao navegador (timeout do relay). Portanto, a verificação visual em desktop e celular e a execução das animações no navegador permanecem pendentes.
