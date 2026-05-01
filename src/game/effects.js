export const spaceTypes = {
    solar:{
        label: "Painel Solar",
        description: "Gera energia limpa, mas pode ser afetado por condições climáticas adversas.",
        effect: (state) => { state.player.scoreGood += 2; return state; }
    },
    wind: {
        label: "Ventania",
        description: "Ventania forte que pode gerar energia",
        effect: (state) => { state.player.scoreGood += 1; return state; }},
    pollution: {
        label: "Fábrica Poluente",
        description: "Gera energia, mas causa poluição e afeta a saúde dos habitantes.",
        effect: (state) => { state.player.scoreGood += 5; state.player.scoreBad += 5;return state; }},
    cloudy: {
        label: "Nuvens",
        description: "Nuvens densas que reduzem a eficiência dos painéis solares.",
        effect: (state) => { state.player.scoreBad += 3; return state; }},
    rain: {
        label: "Chuva",
        description: "Chuva forte, traz nuvens que afetam negativamente a geração de energia solar, mas produz ventos",
        effect: (state) => { state.player.scoreGood += 3; state.player.scoreBad += 3; return state; }},  
    

}