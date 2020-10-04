export default{
    questionary:{
        part:0,
        askIndex:0, 
        questions: [
            {   id:'base', 
                askIndex: 0,
                answare: ['nao', 'sim'], 
                ask: [  'Sente-se nervoso(a), tenso(a) ou preocupado(a)?', 'Assusta-se com facilidade?', 'Tem se sentido triste ultimamente?', 
                        'Tem chorado mais do que de costume?', 'Tem dores de cabeça frequentes?', 'Dorme mal?', "Tem sensações desagradáveis no estômago?",
                        'Tem má-digestão?', 'Tem falta de apetite?', 'Tem tremores nas mãos?', 'Cansa-se com facilidade?', 'Tem dificuldade em tomar decisões?',
                        'Tem dificuldades para realizar com satisfação suas atividades diárias?', 'Tem dificuldades no serviço (o trabalho é penoso e causa sofrimento)?',
                        'Sente-se cansado o tempo todo?', 'Tem dificuldade de pensar com clareza?', 'fim']
            },

            {   id:'g4',
                classifcationG4: false, 
                answare: ['nao', 'sim'],
                ask: ['Sente que é incapaz de desempenhar um papel útil em sua vida?', 'Você tem perdido o interesse pelas coisas? ', 
                'Tem tido a ideia de acabar com a vida? ', 'Sente que é uma pessoa inútil, sem préstimo?' ,'fim']
            },

            {   id:'work', 
                answare: ['Nunca', 'Poucas vezes', 'Poucas vezes ao mês', '1 x por semana', 'Poucas vezes por semana', 'Sempre'], 
                ask: ['Sente que o trabalho está te desgastando?', 'Quando termina a jornada de trabalho sinte-se esgotado(a)?', 
                'Quando se levanta pela manhã e depara com outra jornada de trabalho, já se sente esgotado?', 'Sinte que esta trabalhando demais?',
                'Sente-se frustrado(a) com o trabalho?', 'Sinte-se como se estivesse no limite das suas possibilidades?', 
                'Sente-se emocionalmente decepcionado(a) com o trabalho?', 'Sinte que trabalhar todo o dia com pessoas te cansa?',
                'Sente-se que trabalhar em contato direto com pessoas, todo o dia, te estressa?', 'fim']
            },
    ]},

    healthTips:{
        active: false, 
        tips: [`Durma bem`, `Coma bem`, `Não se irrite`,
                `Pratique esporte`]
    },

    lastQuestion: 'fim',
}

//Partes retiradas do formulario do trabalho
/* , 'Sinto que estou exercendo influência positiva na vida de pessoas através do meu trabalho.',
                'Creio que consigo muitas coisas valiosas nesse trabalho.', 'Sinto que posso criar, com facilidade, um clima agradável em meu trabalho',
                'Sinto que, no meu trabalho, os problemas emocionais são tratados de forma adequada.', 'Sinto-me estimulado depois de haver trabalhado diretamente com quem tenho que atender',
                'Sinto-me com muita energia no meu trabalho.', 'Sinto que trato com muita eficiência os problemas das pessoas as quais tenho que atender.', 
                'Sinto que posso entender facilmente as pessoas que tenho que atender.', 'Sinto que me tornei mais duro(a) com as pessoas, desde que comecei este trabalho.',
                'Fico preocupado(a) que este trabalho esteja me enrijecendo emocionalmente.', 'Sinto que realmente não me importa o que ocorra com as pessoas as quais tenho que atender profissionalmente.', 
                'Sinto que estou tratando algumas pessoas com as quais me relaciono no meu trabalho como se fossem objetos impessoais', 
                'Parece-me que os beneficiados com meu trabalho culpam-me por alguns de seus problemas.' */