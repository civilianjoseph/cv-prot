export const decisions = [
    {
        question:
        "Você recebeu R$15 milhões. Como investir?",
        options: [
            {
                text: "Construir hidrelétrica em área urbana",
                effects: { sustentabilidade: -20, economia: +20, popularidade: +10 }
            },
            
            {
                text: "Construir Fazenda solar",
                effects: { sustentabilidade: +20, economia: +10, popularidade: +5 }
            },

            {
                text: "Construir Parque Eólico no Nordeste",
                effects: { sustentabilidade: +15, economia: +5, popularidade: +15 }
            },
        ]
    },

    {
        question:
        "Sua cidade sofre com poluição industrial.",
        options: [
            {
                text: "Multar as indústrias poluentes",
                effects: { sustentabilidade: +20, economia: -20, popularidade: +5 }
            },
            
            {
                text: "Ignorar a situação",
                effects: { sustentabilidade: -20, economia: +10, popularidade: -10 }
            },

            {
                text: "Criar um programa ambiental",
                effects: { sustentabilidade: +15, economia: -5, popularidade: +15 }
            },
        ]
    },
];