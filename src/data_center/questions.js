export default{
    questionary:{
        part:0,
        askIndex:0, 
        questions: [
            {   id:'base', 
                askIndex: 0,
                answare: ['nao', 'sim'], 
                ask: null,
            },
            {   id:'work', 
                answare: null,
                ask: null,
            },
            
    ]},

    healthTips:{
        active: false, 
        tips: null
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