<template>
    <v-container class="align-content-space-between" fluid fill-height>
        <tool-bar 
            :active='false' 
            :flat='true'
            :backTo='homeRouter' 
            color='white' 
            icon='mdi-arrow-left' />
        <v-container class="px-auto py-0" fluid>
            <v-row>
                <v-col class=" pa-0" cols="12">
                    <Message :textIn='botQuestion[0]'/>
                </v-col>
                </v-row>

            <v-row class=" mt-2 justify-end "> <!-- Resposta do usuario-->
                <TextAnsware :text="userAnsware[answareIndex]"/>
                </v-row>

            <v-row class=" mt-2 "> <!--Opcoes de Formuario-->
                <v-col cols="12">
                        <v-item-group v-if="steps === null" 
                        active-class="justify-space-around" v-model="cardSelection" >  
                            <v-row class="justify-space-around">
                                <CardItemGender v-for="(cardInfo, index) in cardGender" :key='index'
                                :colorCard='cardInfo.cardColor'
                                :gender="cardInfo.label"
                                :imageSource="cardInfo.imageSource"/>
                                </v-row>
                            </v-item-group>
                        
                        <v-radio-group v-else-if="steps === 'genderOk'"
                        v-model="radio"
                        row required>
                            <template  v-for="(option, index) in workOptions" >
                                <v-radio :key='index' color="primary" :label="option.label" :value="option.value" class="mx-auto"></v-radio>
                            </template>
                            </v-radio-group>

                        <v-form ref="ageForm" v-else-if="steps === 'workOk'" v-on:submit.prevent="confirmar('ageOk')">
                            <v-text-field
                            outlined
                            color="light-blue"
                            type="number"
                            v-model="ageField"
                            :counter="maxTextAgeInput"
                            :rules="ageRule"
                            label="Digte sua idade"
                            required>
                            </v-text-field>
                            </v-form>
                    </v-col>
                </v-row>

        </v-container>
        
        <v-container>
            <v-row class="justify-center">
                <v-col class="col-12 col-sm-8">  
                    <v-btn v-if="cardSelection !== null && steps === null" block 
                        color="primary" 
                        dark large rounded
                        @click="confirmar('genderOk')"> 
                        confirmar
                        </v-btn>

                    <v-btn v-else-if="radio !== null && steps === 'genderOk'" 
                        color="primary"
                        block 
                        dark large rounded
                        @click="confirmar('workOk')"> 
                            confirmar 
                        </v-btn>

                    <v-btn v-else-if="steps === 'workOk' && ageField !== ''"
                        color="primary" 
                        block 
                        dark large rounded
                        @click="confirmar('ageOk')"> 
                            confirmar 
                        </v-btn>
                </v-col>
            </v-row>
            </v-container>
    </v-container>

</template>

<script>
import CardItemGender from './../components/CardItemGender.vue'
import Message from './../components/Message.vue'
import TextAnsware from './../components/TextAnsware.vue'
import ToolBar from './../components/ToolBar'

export default {
    components: {ToolBar, Message, TextAnsware, CardItemGender},
    data: () => {
        return {
        cardSelection: null,
        steps: null,
        user: {
                gender: null,
                age: null,
                isWorking: null,
                score: null,
                burnout: null
        },
        
        ageField: '',
        maxTextAgeInput: 3,
        
        radio: null,
        answareIndex: 0,
        
        botQuestion: ['Olá seja bem vindo ao questionário, antes de começar, que tal contar um pouco sobre você?'],
        userAnsware: ['Eu sou', 'No momento eu', 'Eu tenho'],
        
        ageRule: [
                ageRules => ageRules.length < 4 || 'Excedido quantidade de caracteres',
                ageRules => ageRules !== '' || 'Campo Invalido',
        ],
        homeRouter: '/home',

        cardGender: [
            {imageSource: 'avatar-men.png', label: 'Homem', cardColor: 'primary'}, 
            {imageSource: 'avatar-women2.png', label: 'Mulher', cardColor: 'pink'}
        ],
        
        workOptions: [
            {label: 'Trabalho', value: true},
            {label: 'Não Trabalho', value: false}
        ]
        
        }
    },
    methods: {
        confirmar(step){
            if(step === 'genderOk'){
                this.steps = step;
                this.user.gender = this.cardSelecion ? 'female':'male';
                this.answareIndex++;
            }else if(step === 'workOk'){
                this.steps = step;
                this.user.isWorking = this.radio;
                this.answareIndex++; 
            
            }else if(step === 'ageOk'){ 
                if(this.$refs.ageForm.validate()){
                    this.steps = step;
                    this.user.age = this.ageField;
                    this.$router.push({name:'QuizScreen', params:{user:this.user}})
                    this.answareIndex++;
                }
            }
            

        },

    }
};
</script>

<style scoped>

</style>

