<template>
  <v-col class="border col-6 col-sm-5 col-md-4 col-lg-3">
    <v-item v-slot:default="{ active, toggle }" :value='cardValue'>
      <v-card :color="active ? `${colorCard}` : ''" class="display-3 text-center rounded-lg pt-2" height="208" min-width="100" max-width="300" @click="toggle">
        <div class="mx-auto" style="width: 128px; height: 128px">
          <v-img height="98" width="98" class="mx-auto my-2 rounded-lg" :src="require(`@/assets/${imageSource}`)" />
        </div>
        <v-card-title v-if="!active" class="justify-center font-weight-bold">{{ gender }}</v-card-title>
        <v-card-title v-else-if="active" class="white--text justify-center font-weight-bold">{{ gender }}</v-card-title>
      </v-card>
    </v-item>
  </v-col>
</template>

<script>
export default {
  props: ['colorCard', 'gender', 'imageSource', 'cardValue']
}
</script>
