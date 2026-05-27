export const events = [
  {
    key: 'drought',
    name: 'Seca Severa',
    icon: '🌵',
    description: 'A seca prolongada reduziu a capacidade das hidrelétricas e prejudicou a produção de biomassa na região.',
    effects: { environmental: -10, economic: -5, energetic: -15 },
    probability: { nordeste: 0.4, sul: 0.1, sudeste: 0.2, norte: 0.15 }
  },
  {
    key: 'heatwave',
    name: 'Onda de Calor',
    icon: '🌡️',
    description: 'O calor intenso elevou o consumo de energia elétrica em 50%, sobrecarregando a rede de distribuição.',
    effects: { environmental: -5, economic: -15, energetic: -10 },
    probability: { nordeste: 0.35, sul: 0.1, sudeste: 0.25, norte: 0.2 }
  },
  {
    key: 'strong_winds',
    name: 'Ventos Fortes',
    icon: '💨',
    description: 'Ventos intensos aumentaram a geração eólica em 50%, superando as metas energéticas da região!',
    effects: { environmental: 5, economic: 10, energetic: 20 },
    probability: { nordeste: 0.3, sul: 0.4, sudeste: 0.2, norte: 0.1 }
  },
  {
    key: 'cloudy_season',
    name: 'Temporada Nublada',
    icon: '☁️',
    description: 'Cobertura intensa de nuvens reduziu a geração fotovoltaica a 40% da capacidade esperada.',
    effects: { environmental: 0, economic: -10, energetic: -15 },
    probability: { nordeste: 0.15, sul: 0.35, sudeste: 0.25, norte: 0.2 }
  },
  {
    key: 'investment',
    name: 'Incentivo Federal',
    icon: '💰',
    description: 'O governo federal anunciou novos incentivos para energia renovável. Sua cidade foi selecionada!',
    effects: { environmental: 10, economic: 20, energetic: 10 },
    probability: { nordeste: 0.2, sul: 0.2, sudeste: 0.2, norte: 0.2 }
  }
];
