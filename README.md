# Estojo de Talentos — Feedback Integral

Autoavaliação interativa e gamificada das professoras e professores do Integral.

- Página única e estática (`index.html`), sem servidor nem instalação: abra o arquivo no navegador ou publique pelo GitHub Pages.
- A pessoa entra com o e-mail institucional, responde às 15 afirmações (Sempre = 4 · Frequentemente = 3 · Às vezes = 2 · Raramente = 1) e, no final, vê a pontuação, o material escolar correspondente e a data e o horário do feedback.
- Faixas: até 24 Borracha · 25–32 Grampeador · 33–40 Lápis de cor · 41–48 Lapiseira · 49+ Tinta.
- **Impressão:** o botão "Imprimir / salvar PDF" gera uma folha A4 com resultado, mensagem final, agendamento e todas as respostas. Na tela inicial também tem a "versão em branco" para responder no papel.
- O progresso fica salvo no navegador: se fechar a página no meio, é só entrar de novo com o mesmo e-mail.

## Painel da coordenação

Acesse `/painel.html` (ex.: `https://SEU-SITE.vercel.app/painel.html`) com a senha combinada. Mostra quem já respondeu e quem está pendente, a média de pontos, quantas pessoas abriram cada material, a média de cada afirmação e as respostas individuais. Dá para exportar em planilha (CSV) e imprimir.

As respostas são gravadas no Supabase (tabela `feedback_integral_respostas`) assim que a professora termina. A tabela não pode ser lida diretamente pela internet: só pela função do painel, que confere a senha no servidor. Para trocar a senha, altere `M@rista` na função `feedback_integral_painel` no Supabase.

## Easter egg

Balance o celular em qualquer tela (ou, no computador, digite `marista`) para ver uma mensagem surpresa com chuva de materiais. No iPhone o navegador pede permissão de movimento no primeiro toque.

## Editar dados

Professores, datas, horários e perguntas ficam em `dados.js`.
