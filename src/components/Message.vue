<template>
	<v-row class="mx-md-4 align-center" no-gutters>
		<avatar source="headicon.svg" />
		<text-question :text="textIn"/>
	</v-row>
</template>

<script>
import Avatar from "./../components/Avatar.vue";
import TextQuestion from "./../components/TextQuestion.vue";

export default {
	props: ['textIn' , 'map'],
	components: { Avatar, TextQuestion },
};
</script>
<style scoped>
</style>