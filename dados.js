// Dados compartilhados entre a autoavaliação (index.html) e o painel (painel.html).
// Para mudar professores, datas ou horários, edite a lista TEACHERS abaixo.

// Banco de dados (Supabase). A chave abaixo é pública por design: a tabela não
// pode ser lida diretamente; só as funções feedback_integral_enviar (grava uma
// resposta) e feedback_integral_painel (exige a senha) são acessíveis.
const SUPABASE_URL = "https://frsidsdrexolvcfxzroe.supabase.co";
const SUPABASE_KEY = "sb_publishable_xgr6ki59dLrTcdjDlmEtZA_LAF6m1BC";
async function rpc(fn, args){
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method:"POST",
    headers:{"apikey":SUPABASE_KEY, "Authorization":`Bearer ${SUPABASE_KEY}`, "Content-Type":"application/json"},
    body:JSON.stringify(args),
  });
  const body = r.status === 204 ? null : await r.json().catch(() => null);
  if(!r.ok) throw Object.assign(new Error(body && body.message || r.statusText), {status:r.status, code:body && body.code});
  return body;
}

const TEACHERS = [
  ["TESTE","teste@maristabrasil.org","data de teste","horário de teste"],
  ["LÍDIA CAROLINE","lidia.costa@maristabrasil.org","3 de novembro, 3ª feira","10h"],
  ["THAYARA BATISTA","thayara.ribeiro@maristabrasil.org","3 de novembro, 3ª feira","9h"],
  ["GIZÉLIA DA MOTA","gizelia.rodrigues@maristabrasil.org","3 de novembro, 3ª feira","11h"],
  ["BRUNA DE BRITO","bruna.brito@maristabrasil.org","6 de novembro, 6ª feira","15h30"],
  ["CAMILA CARNEIRO","camila.fernandes@maristabrasil.org","5 de novembro, 5ª feira","14h20"],
  ["TATIANE APARECIDA","tatiane.duarte@maristabrasil.org","5 de novembro, 5ª feira","16h30"],
  ["VENINA DIVINO","venina.rocha@maristabrasil.org","3 de novembro, 3ª feira","14h20"],
  ["SELMA MALSCHIK","selma.malschik@maristabrasil.org","5 de novembro, 5ª feira","13h30"],
  ["DANIELA OLIVEIRA","daniela.barbosa@maristabrasil.org","5 de novembro, 5ª feira","15h10"],
  ["JAQUELINE DE CASTRO","jaqueline.miranda@maristabrasil.org","3 de novembro, 3ª feira","16h30"],
  ["ISIS FREITAS","isis.freitas@maristabrasil.org","3 de novembro, 3ª feira","15h10"],
  ["ÉRICA FERREIRA","erica.bezerra@maristabrasil.org","10 de novembro, 3ª feira","17h30"],
  ["HELEN LINHARES","helen.linhares@maristabrasil.org","6 de novembro, 6ª feira","11h20"],
  ["GIOVANNA MELO","giovanna.mendes@maristabrasil.org","6 de novembro, 6ª feira","13h40"],
  ["EDUARDA ANTUNES","eduarda.souza@maristabrasil.org","5 de novembro, 5ª feira","10h30"],
  ["YARA ALBINO","yara.silva@maristabrasil.org","5 de novembro, 5ª feira","11h20"],
  ["ANA PATRÍCIA DA SILVA","ana.veras@maristabrasil.org","6 de novembro, 6ª feira","10h30"],
  ["ANDREA CARLA","andrea.sampaio@maristabrasil.org","17 de novembro, 3ª feira","15h30"],
  ["LUCAS","lucas.azevedo@maristabrasil.org","18 de novembro, 4ª feira","15h10"],
  ["JULIANA DE AZEVEDO","juliana.borges@maristabrasil.org","17 de novembro, 3ª feira","15h"],
  ["LYARA KELLY","lyara.magno@maristabrasil.org","12 de novembro, 5ª feira","11h10"],
  ["LORENA MEDEIROS","lorena.medeiros@maristabrasil.org","4 de novembro, 4ª feira","10h"],
  ["CÁSSIA DE OLIVEIRA","cassia.marra@maristabrasil.org","4 de novembro, 4ª feira","14h"],
  ["DANIELA BASTOS","bastos.daniela@maristabrasil.org","12 de novembro, 5ª feira","16h30"],
  ["AMANDA MACHADO","amanda.tavares@maristabrasil.org","11 de novembro, 4ª feira","16h30"],
  ["ADRIANA BARUFFI","baruffi.adriana@maristabrasil.org","10 de novembro, 3ª feira","16h30"],
  ["MICHELY CRISTINE","michely.santos@maristabrasil.org","11 de novembro, 4ª feira","13h30"],
  ["ANE KAROLINE","ane.pereira@maristabrasil.org","4 de novembro, 4ª feira","15h10"],
  ["LUCIANNA BARBOSA","lucianna.barbosa@maristabrasil.org","4 de novembro, 4ª feira","16h30"],
  ["SUZANA CASTELO BRANCO","suzana.santana@maristabrasil.org","11 de novembro, 4ª feira","17h20"],
  ["NARAYANA DOS SANTOS","narayana.andrade@maristabrasil.org","10 de novembro, 3ª feira","11h20"],
  ["MARTA INACIO","marta.alves@maristabrasil.org","4 de novembro, 4ª feira","11h"],
  ["MARIA TELMA MENESES","maria.telma@maristabrasil.org","10 de novembro, 3ª feira","15h10"],
  ["SABRINA DE SOUZA","sabrina.pessoa@maristabrasil.org","13 de novembro, 6ª feira","15h"],
  ["FERNANDA PANTUZZO","fernanda.pantuzzo@maristabrasil.org","11 de novembro, 4ª feira","15h10"],
  ["GUILHERME AUGUSTO","guilherme.borges@maristabrasil.org","13 de novembro, 6ª feira","17h"],
  ["ARTHUR WILSON","arthur.silva@maristabrasil.org","13 de novembro, 6ª feira","16h"],
  ["BRUNA ARGENTA","bruna.mesquita@maristabrasil.org","12 de novembro, 5ª feira","15h10"],
  ["RENATA DINIZ","renata.ramos@maristabrasil.org","16 de novembro, 2ª feira","9h"],
  ["NATÁLIA DE SOUSA","natalia.nascimento@maristabrasil.org","16 de novembro, 2ª feira","10h30"],
].map(([name,email,date,time]) => ({name,email,date,time}));

const QUESTIONS = [
  "Quando surge um desafio inesperado em minha rotina, busco soluções com iniciativa.",
  "Contribuo ativamente para a qualidade dos processos da escola, realizando meu trabalho com responsabilidade, alinhamento institucional e compromisso com a melhoria contínua das práticas educacionais.",
  "Compartilho ideias que contribuem para melhorar o trabalho realizado.",
  "Procuro manter meus planejamentos, registros e materiais organizados.",
  "Estou aberto(a) a feedbacks e utilizo-os para meu crescimento profissional.",
  "Colaboro com meus colegas quando percebo que precisam de ajuda.",
  "Busco construir relações respeitosas e acolhedoras com alunos, famílias e equipe.",
  "Consigo adaptar minhas propostas quando algo não acontece como planejado.",
  "Promovo e fortaleço os Valores Maristas em minhas ações, relações e decisões, contribuindo para que a cultura institucional seja vivenciada de forma coerente e inspiradora por toda a comunidade escolar.",
  "Assumo responsabilidade pelos combinados e compromissos da equipe.",
  "Procuro enxergar o potencial de cada aluno e valorizar seus avanços.",
  "Contribuo para um ambiente que valoriza o diálogo, a criatividade e a experimentação, buscando aperfeiçoar minha prática e colaborar para a evolução contínua da escola.",
  "Tenho iniciativa para aprender coisas novas e aperfeiçoar minha prática.",
  "Contribuo para um ambiente de trabalho positivo e colaborativo.",
  "Persevero diante das dificuldades sem perder o foco nos objetivos.",
];

const OPTIONS = [
  {label:"Acima do esperado", pts:4, color:"#3d7fd1", hex:"#3d7fd1",
   desc:"Superou expectativas com alta qualidade, demonstrando autonomia e contribuindo significativamente para os resultados."},
  {label:"Dentro do esperado", pts:3, color:"#5f9a3c", hex:"#5f9a3c",
   desc:"O conhecimento e as habilidades são adequados, garantindo qualidade e consistência na função. O desempenho atende às expectativas."},
  {label:"Mínimo esperado", pts:2, color:"#d99a16", hex:"#d99a16",
   desc:"Atendeu parcialmente ao esperado. As entregas foram realizadas, mas com limitações que afetam a consistência e a qualidade do trabalho. Há oportunidades de melhoria."},
  {label:"Abaixo do esperado", pts:1, color:"#de6450", hex:"#de6450",
   desc:"O conhecimento e as habilidades ainda não atendem ao necessário, impactando a atuação e a qualidade das entregas. É necessário desenvolvimento para melhorar o desempenho."},
];

// Material icons (simple inline SVG drawings)
const ICONS = {
  borracha:`<svg viewBox="0 0 64 64"><g transform="rotate(-20 32 32)"><rect x="10" y="22" width="44" height="20" rx="5" fill="#ff8fab"/><rect x="34" y="22" width="20" height="20" rx="5" fill="#4d96ff"/><rect x="34" y="22" width="6" height="20" fill="#4d96ff"/></g></svg>`,
  grampeador:`<svg viewBox="0 0 64 64"><rect x="8" y="42" width="48" height="8" rx="4" fill="#555"/><path d="M10 40 Q10 26 24 26 H52 a4 4 0 0 1 4 4 v6 a4 4 0 0 1 -4 4 Z" fill="#ff6b6b"/><circle cx="14" cy="42" r="4" fill="#333"/></svg>`,
  lapisdecor:`<svg viewBox="0 0 64 64"><g transform="rotate(-35 32 32)"><rect x="12" y="14" width="10" height="34" fill="#ff6b6b"/><path d="M12 14 L17 4 L22 14Z" fill="#ff6b6b"/><rect x="27" y="14" width="10" height="34" fill="#ffc93c"/><path d="M27 14 L32 4 L37 14Z" fill="#ffc93c"/><rect x="42" y="14" width="10" height="34" fill="#3bb273"/><path d="M42 14 L47 4 L52 14Z" fill="#3bb273"/></g></svg>`,
  lapiseira:`<svg viewBox="0 0 64 64"><g transform="rotate(45 32 32)"><rect x="27" y="6" width="10" height="38" rx="3" fill="#9b5de5"/><rect x="27" y="10" width="10" height="4" fill="#ccc"/><path d="M27 44 h10 l-3 8 h-4z" fill="#bbb"/><rect x="31" y="52" width="2" height="6" fill="#333"/><rect x="36" y="14" width="3" height="16" rx="1" fill="#777"/></g></svg>`,
  tinta:`<svg viewBox="0 0 64 64"><rect x="10" y="30" width="44" height="24" rx="6" fill="#e8e1d3"/><circle cx="20" cy="38" r="5" fill="#ff6b6b"/><circle cx="32" cy="38" r="5" fill="#ffc93c"/><circle cx="44" cy="38" r="5" fill="#4d96ff"/><circle cx="26" cy="47" r="5" fill="#3bb273"/><circle cx="38" cy="47" r="5" fill="#9b5de5"/><g transform="rotate(30 46 14)"><rect x="43" y="2" width="6" height="22" rx="2" fill="#a0522d"/><path d="M43 24 h6 l-1 8 h-4z" fill="#333"/></g></svg>`,
};

// Faixas de pontuação definidas pela coordenação.
// Obs.: com 15 perguntas o máximo é 60 pts; a tabela original vai até 56,
// então 57–60 também abrem a mensagem da TINTA.
const RANGES = [
  {max:24, key:"borracha", name:"BORRACHA", article:"da"},
  {max:32, key:"grampeador", name:"GRAMPEADOR", article:"do"},
  {max:40, key:"lapisdecor", name:"LÁPIS DE COR", article:"do"},
  {max:48, key:"lapiseira", name:"LAPISEIRA", article:"da"},
  {max:Infinity, key:"tinta", name:"TINTA", article:"da"},
];
const materialFor = s => RANGES.find(r => s <= r.max);
