# Site com checkout

Publique todo o conteúdo desta pasta na raiz do repositório, preservando assets/, demos/ e previews/.

Checkout: https://pay.kiwify.com/LqFRPfo
Preço: US$19,90. Entrega: ZIP na área de membros Kiwify após aprovação do pagamento. Reembolso: 7 dias corridos pelo portal Kiwify, conforme confirmação fornecida pelo usuário.

Botões ativados a pedido do usuário. Foi verificada a interface do checkout com seleção de Estados Unidos; não foi realizado pagamento. O usuário confirmou que o download abre; não há declaração de teste completo com iniciantes. Os indicadores históricos de teste permanecem falsos para não registrar verificações não feitas.

## Alterações de 01/10/2026 (v2)
- Faixa: "No video lessons required" → "Written step-by-step guide".
- Card do guia e FAQ atualizados para o guia v0.2 (logo/fotos, contato por e-mail, exemplo de publicação). Nova pergunta: "Can I add my logo and photos?".
- Textos de entrega e reembolso escritos direto no HTML (antes, sem JavaScript, apareciam "Sales are not open yet" e "Refund terms will be published…").
- config.js, checkout e preço US$ 19,90 inalterados.
- Kit correspondente: guia v0.2 em `../kit/`. Suba o novo ZIP do kit na Kiwify junto com esta página, para que a página não prometa algo que o arquivo entregue ainda não tem.

## Alterações v3 (demonstração interativa)
- Novo `playground/index.html`: escolhe uma das 3 demos de `demos/`, altera nome, título (h1) e cor principal (`--accent`), mostra a prévia ao vivo, avisa sobre contraste baixo e restaura o original. Não salva nada, não envia nada, não usa serviços externos.
- A página avisa que o editor é só uma demonstração e não faz parte do kit.
- Link "Try the templates" no menu e na seção escura "From sample to your business".
- O playground precisa ser aberto pelo endereço do site (http/https), não como arquivo local, porque lê as demos por um iframe da mesma origem.
- config.js, checkout e preço US$ 19,90 inalterados.
