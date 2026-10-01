# Página de vendas — Your First Website with AI

HTML, CSS e JavaScript simples. Sem dependências, sem fontes externas, sem rastreamento, sem formulários.

## Arquivos
- `index.html` — textos da página (em inglês).
- `config.js` — **único arquivo que você precisa editar** para preço, checkout, vendedor, suporte, garantia, demonstrações e links legais.
- `styles.css` — visual (cores no topo, em `:root`).
- `main.js` — aplica as configurações. Não precisa mexer.
- `demos/` — demonstrações com empresas **fictícias** (identificadas como tal na própria página), publicadas junto com a página de vendas.
- `previews/` — capturas reais dessas demonstrações (800×600, JPEG).

Os arquivos que o comprador recebe ficam em outra pasta: `../your-first-website-with-ai-kit/` (e no ZIP `your-first-website-with-ai-kit.zip`). Não publique essa pasta junto com a página de vendas.

## Como editar as configurações
1. Abra `config.js` em um editor de texto.
2. Preencha somente informações confirmadas. Campo vazio (`""`) aparece como pendente, nunca como dado inventado.
3. O botão de compra só funciona quando **todos** estes itens estiverem prontos:
   - `checkout.url` com um link real começando com `https://`;
   - `checkout.internationalExperienceVerified: true` (depois de testar a compra como cliente de fora do Brasil: idioma, moeda, meios de pagamento, e-mail de entrega);
   - `price.confirmed: true`;
   - `product.englishMaterialsReady: true` (modelos, guia, prompts e checklist traduzidos e revisados).
4. Demonstrações: para cada modelo, preencha `demoUrl` (link público da demo em inglês), `previewImage` (ex.: `previews/services.webp`, cerca de 800×600, WebP) e `previewAlt` (descrição da imagem).
5. Na versão final: `testMode: false` e remova a linha `<meta name="robots" content="noindex">` do `index.html`.

## Prévia local
Abra `index.html` no navegador, ou rode um servidor estático na pasta, por exemplo:

```bash
npx serve .
```

Não coloque senhas, tokens ou chaves de API em nenhum arquivo: tudo aqui é público.
