export const boardSquares = [
  {
    index: 0,
    type: 'start',
    label: 'Início',
    icon: '🏁'
  },
  {
    index: 1,
    type: 'decision',
    label: 'Energia Solar',
    icon: '☀️',
    scenario: 'A cidade recebeu R$20 milhões para investir em energia renovável. Qual a sua prioridade?',
    options: [
      {
        text: '☀️ Painéis solares em prédios públicos',
        effects: { environmental: 15, economic: 10, energetic: 20 },
        consequence: 'Excelente! Painéis solares em prédios públicos reduzem 30% da conta de luz e inspiram a iniciativa privada a fazer o mesmo.'
      },
      {
        text: '⚡ Ampliar a rede de distribuição',
        effects: { environmental: 5, economic: 20, energetic: 10 },
        consequence: 'Razoável. Melhor distribuição reduz desperdício, mas não aumenta a geração de energia limpa na cidade.'
      }
    ]
  },
  {
    index: 2,
    type: 'info',
    label: 'Baterias de Lítio',
    icon: '🔋',
    title: '🔋 Baterias de Lítio',
    content: 'As baterias de lítio armazenam energia elétrica de forma eficiente e são fundamentais para a transição energética. Usadas em celulares, carros elétricos e sistemas solares, permitem usar energia renovável mesmo quando o sol não brilha. O desafio atual é o custo da extração do lítio e o descarte responsável das baterias.'
  },
  {
    index: 3,
    type: 'decision',
    label: 'Energia Eólica',
    icon: '💨',
    scenario: 'Empresas querem instalar turbinas eólicas na costa. Comunidades pesqueiras estão preocupadas com o impacto.',
    options: [
      {
        text: '🤝 Aprovar com compensação às comunidades',
        effects: { environmental: 10, economic: 15, energetic: 20 },
        consequence: 'Parques eólicos no Nordeste já geram energia para mais de 500 mil famílias. As compensações ajudam a reduzir conflitos sociais.'
      },
      {
        text: '📋 Exigir estudo environmental completo antes',
        effects: { environmental: 20, economic: -5, energetic: 5 },
        consequence: 'Decisão responsável! Estudos ambientais protegem ecossistemas costeiros e garantem projetos mais sustentáveis a longo prazo.'
      }
    ]
  },
  {
    index: 4,
    type: 'event',
    label: 'Evento!',
    icon: '⚡'
  },
  {
    index: 5,
    type: 'decision',
    label: 'Biomassa',
    icon: '🌱',
    scenario: 'Há proposta de usina de biomassa usando resíduos agrícolas da região. O que decidir?',
    options: [
      {
        text: '🏭 Incentivar com isenção fiscal',
        effects: { environmental: 10, economic: -5, energetic: 15 },
        consequence: 'A biomassa aproveita resíduos que iriam para aterros sanitários! Você gerou energia, reduziu emissões e criou empregos locais.'
      },
      {
        text: '🔬 Exigir tratamento de efluentes antes',
        effects: { environmental: 20, economic: 5, energetic: 10 },
        consequence: 'Decisão responsável! Exigir tratamento de efluentes evita poluição de rios locais e garante um projeto mais limpo e duradouro.'
      }
    ]
  },
  {
    index: 6,
    type: 'bonus',
    label: 'Incentivo Federal',
    icon: '🎉',
    title: '💰 Incentivo Federal!',
    description: 'O governo federal selecionou sua cidade para receber R$10 milhões em incentivos por boas práticas em energia renovável.',
    effects: { environmental: 5, economic: 15, energetic: 5 }
  },
  {
    index: 7,
    type: 'decision',
    label: 'Hidrelétrica',
    icon: '💧',
    scenario: 'Uma nova hidrelétrica pode gerar 200 MW, mas inundará 50 km² de floresta nativa. O que fazer?',
    options: [
      {
        text: '✅ Aprovar com compensação environmental',
        effects: { environmental: -15, economic: 20, energetic: 20 },
        consequence: 'Hidrelétricas são essenciais para o Brasil, mas o impacto nos biomas é real. A compensação environmental é indispensável.'
      },
      {
        text: '🔄 Recusar e diversificar fontes menores',
        effects: { environmental: 15, economic: -10, energetic: 10 },
        consequence: 'Diversificar fontes renováveis reduz dependência e distribui o impacto environmental. Uma abordagem mais resiliente!'
      }
    ]
  },
  {
    index: 8,
    type: 'info',
    label: 'Rio Pinheiros',
    icon: '🌊',
    title: '🌊 Rio Pinheiros e Energia Reversa',
    content: 'O sistema Pinheiros-Billings é único no Brasil. Bombas reversíveis bombeiam água do Rio Pinheiros para a Represa Billings — e quando o fluxo é revertido, as turbinas geram eletricidade. Com a revitalização do rio, antes um dos mais poluídos do país, este sistema une saneamento environmental com geração de energia limpa.'
  },
  {
    index: 9,
    type: 'event',
    label: 'Evento!',
    icon: '⚡'
  },
  {
    index: 10,
    type: 'decision',
    label: 'Indústria',
    icon: '🏭',
    scenario: 'Fábricas da cidade lançam CO₂ 40% acima do limite legal. Como agir?',
    options: [
      {
        text: '⚖️ Multas e prazo de 6 meses para adequação',
        effects: { environmental: 20, economic: -10, energetic: 5 },
        consequence: 'Regulação environmental é fundamental! As indústrias passaram a investir em tecnologias mais limpas para evitar as multas.'
      },
      {
        text: '♻️ Criar mercado voluntário de créditos de carbono',
        effects: { environmental: 10, economic: 10, energetic: 5 },
        consequence: 'Interessante! Créditos de carbono incentivam empresas a reduzir emissões voluntariamente, gerando benefícios econômicos e ambientais.'
      }
    ]
  },
  {
    index: 11,
    type: 'penalty',
    label: 'Crise Energética',
    icon: '⚠️',
    title: '⚠️ Crise de Combustíveis Fósseis',
    description: 'A alta dependência de combustíveis fósseis deixou a cidade vulnerável. Com o aumento dos preços internacionais, os custos de energia dispararam e a população está insatisfeita.',
    effects: { environmental: -10, economic: -15, energetic: -10 }
  },
  {
    index: 12,
    type: 'decision',
    label: 'Armazenamento',
    icon: '🔋',
    scenario: 'A cidade quer instalar baterias de lítio para armazenar energia solar excedente. Qual o plano?',
    options: [
      {
        text: '⚡ Adquirir baterias importadas de alta capacidade agora',
        effects: { environmental: 5, economic: -20, energetic: 25 },
        consequence: 'Baterias de lítio permitem usar energia solar mesmo à noite! O custo é alto, mas a independência energética traz retorno a longo prazo.'
      },
      {
        text: '🔬 Pesquisar alternativas nacionais antes de importar',
        effects: { environmental: 10, economic: -5, energetic: 10 },
        consequence: 'Desenvolver tecnologia nacional reduz dependência de importações e gera empregos em pesquisa e desenvolvimento no Brasil.'
      }
    ]
  },
  {
    index: 13,
    type: 'info',
    label: 'Represa Billings',
    icon: '💧',
    title: '💧 Represa Billings',
    content: 'A Billings é o maior reservatório da Grande São Paulo, abastecendo 1,3 milhão de pessoas. Integrada ao sistema de energia reversa com o Rio Pinheiros, pode ser usada tanto para abastecimento quanto para geração de eletricidade. A recuperação da qualidade da água é essencial para sua sustentabilidade como recurso hídrico e energético.'
  },
  {
    index: 14,
    type: 'event',
    label: 'Evento!',
    icon: '⚡'
  },
  {
    index: 15,
    type: 'decision',
    label: 'Transporte Urbano',
    icon: '🚌',
    scenario: 'A cidade vai renovar 200 ônibus da frota pública. Qual tecnologia adotar para o transporte?',
    options: [
      {
        text: '🚌 Ônibus elétricos com recarga solar',
        effects: { environmental: 20, economic: -15, energetic: 15 },
        consequence: 'Transporte elétrico reduz emissões em 80% comparado ao diesel. A cidade ficou mais limpa, silenciosa e moderna!'
      },
      {
        text: '🌱 Ônibus a biogás de resíduos orgânicos',
        effects: { environmental: 15, economic: -5, energetic: 10 },
        consequence: 'Biogás aproveita resíduos orgânicos da cidade como combustível. Uma solução inteligente, mais barata e de baixa emissão!'
      }
    ]
  },
  {
    index: 16,
    type: 'bonus',
    label: 'Créditos de Carbono',
    icon: '🌳',
    title: '🌳 Créditos de Carbono!',
    description: 'As iniciativas ambientais da cidade geraram créditos de carbono que foram vendidos no mercado internacional. Nova fonte de receita para a cidade!',
    effects: { environmental: 10, economic: 20, energetic: 5 }
  },
  {
    index: 17,
    type: 'decision',
    label: 'Energia Reversa',
    icon: '🔄',
    scenario: 'O Rio local pode gerar energia pelo fluxo reverso das águas tratadas, como no projeto Pinheiros-Billings. O que priorizar?',
    options: [
      {
        text: '🌊 Investir no projeto de revitalização + energia reversa',
        effects: { environmental: 25, economic: -20, energetic: 15 },
        consequence: 'Incrível! O sistema de energia reversa une revitalização environmental com geração de energia limpa — um modelo para o Brasil inteiro.'
      },
      {
        text: '💧 Priorizar ampliação do tratamento de esgotos',
        effects: { environmental: 20, economic: -10, energetic: 5 },
        consequence: 'Ótima base! Tratamento de esgotos melhora qualidade da água e é o pré-requisito para qualquer projeto de energia reversa.'
      }
    ]
  },
  {
    index: 18,
    type: 'info',
    label: 'Matriz Energética',
    icon: '⚡',
    title: '⚡ Matriz Energética do Brasil',
    content: 'O Brasil tem uma das matrizes elétricas mais limpas do mundo: mais de 83% da eletricidade vem de fontes renováveis. Hidrelétricas lideram (~65%), seguidas por eólica (12%), biomassa (9%) e solar (4%). Porém ainda dependemos de combustíveis fósseis nos transportes e na indústria. A meta é ampliar solar e eólica para reduzir a dependência hídrica e aumentar a resiliência do sistema.'
  },
  {
    index: 19,
    type: 'event',
    label: 'Evento!',
    icon: '⚡'
  },
  {
    index: 20,
    type: 'decision',
    label: 'Eficiência Energética',
    icon: '💡',
    scenario: 'Pesquisa mostra que 40% da energia da cidade é desperdiçada. Como agir para mudar isso?',
    options: [
      {
        text: '🏭 Programa de eficiência para indústrias',
        effects: { environmental: 15, economic: 10, energetic: 20 },
        consequence: 'Eficiência energética é a "fonte" mais barata de nova energia! As indústrias reduziram custos operacionais e emissões ao mesmo tempo.'
      },
      {
        text: '📢 Campanhas de conscientização popular',
        effects: { environmental: 10, economic: 5, energetic: 10 },
        consequence: 'Mudança de comportamento pode reduzir consumo em até 20%! A população engajada é o maior ativo sustentável de uma cidade.'
      }
    ]
  },
  {
    index: 21,
    type: 'penalty',
    label: 'Desastre Ambiental',
    icon: '💀',
    title: '💀 Desastre Industrial',
    description: 'Um vazamento em fábrica local contaminou o lençol freático da cidade. A remediação custará R$50 milhões e a população está em protesto nas ruas.',
    effects: { environmental: -20, economic: -10, energetic: -5 }
  },
  {
    index: 22,
    type: 'decision',
    label: 'Futuro da Cidade',
    icon: '🌟',
    scenario: 'Última grande decisão: como garantir o futuro energético sustentável da sua cidade para as próximas gerações?',
    options: [
      {
        text: '🏦 Criar fundo soberano de energia renovável',
        effects: { environmental: 20, economic: -15, energetic: 25 },
        consequence: 'Visão de longo prazo! Fundos soberanos garantem investimento contínuo em energia limpa, independente de mudanças de governo.'
      },
      {
        text: '🤝 Parcerias público-privadas para solar e eólica',
        effects: { environmental: 15, economic: 10, energetic: 20 },
        consequence: 'As PPPs reduzem o custo para o governo mantendo a expansão das renováveis. Uma abordagem equilibrada e politicamente sustentável!'
      }
    ]
  },
  {
    index: 23,
    type: 'end',
    label: 'Chegou!',
    icon: '🏆'
  }
];
