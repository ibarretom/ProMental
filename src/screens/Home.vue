<template>
	<v-container fill-height fluid primary>
		<v-layout row wrap 
			justify-center align-center  
			class="mx-auto white--text flex-row-reverse">
			
			<v-flex class="border" xs8 sm4 >
				<v-img contain min-height="150px" max-height="360px" class="" src="./../assets/head.svg" />
			</v-flex>
			
			<v-flex class="mx-4" xs12 sm12 md6> 
				<p class="border mb-md-10 text-h5 text-sm-h3 text-md-h3 font-weight-bold" style="text-align:center">
					{{headLine}}
				</p>
				<p class="border mx-2 text-body-1 text-sm-h5 font-weight-regular" style="text-align:center">{{startText}} <br> {{startText2}}</p>
			</v-flex>

			<v-flex class="border mx-4 mb-2" xs12 sm12 md6>
					<v-btn 
						block
						dark 
						height="56px"
						outlined 
						rounded 
						class="button"
						router :to="startFormPage" >
						Clique aqui para começar
					</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
 
</template>

<script>

export default {
	components: {},

	data: () => ({
		menu: 'mdi-menu',
		teste: [],
		startFormPage: '/formScreenData',
		startText: "Cansaço, irritabilidade, insônia. Podem ser sintomas de stress.",
		startText2: "Visando o seu bem estar, nós preparamos um questionario de saúde mental, que tal começarmos? Não tomará muito tempo.",
		headLine: "Bem Vindo ao ProMental",
		drawer: true,
	}),

	methods: {},

	created(){
		this.$firebase.firestore().collection('boas-vindas').get().then((snapshot) =>{
            snapshot.docs.forEach( doc => {
            console.log(doc.data())
				this.headLine = doc.data().titulo;
				this.startText = doc.data().text1;
				this.startText2 = doc.data().text2;
			});
		});

	},

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.border {
    /* border: 1px solid black; */
}
.father-container2 {
  align-content: space-around;
}
.father-container {
  display: flex;
  flex-flow: wrap;
  
}
</style>
