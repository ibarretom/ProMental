<template>
  <v-dialog persistent v-model="dialogActive" max-width="290">
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <strong>
          OBS: os dados fornecidos por você são apenas para uma avaliação global de sua
          saúde, são anônimos e sigilosos. Ou seja, não sabemos quem é você.
        </strong>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="clickButton(false)"> Rejeitar </v-btn>

        <v-btn color="green darken-1" text @click="clickButton(true)"> OK </v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialogActive: true,
  }),
  methods: {
    clickButton(option) {
      if (!option) {
        localStorage.setItem("respondeu", "true");
      }

      this.dialogActive = false;
    },
  },
  created() {
    if (localStorage.getItem("respondeu") == "true") {
      this.dialogActive = false;
    }
  },
};
</script>

<style scoped>
::v-deep .v-btn {
  text-transform: none;
}
</style>
