<template>
  <div class="center">
    <div class="index" v-for="location in locations" :key="location.iso_code">
      <img :alt="location.iso_code === 'BRA' ? 'Bandeira do Brasil' : 'Globo terrestre'" class="center-element" width="64" height="64" :src="getPicture(location.iso_code)"/>
      <h1>{{location.total_vaccinations.toLocaleString()}} pessoas</h1>
    </div>
  </div>
  <div class="source center">
    <p>Fonte: <a href="https://ourworldindata.org/covid-vaccinations" target="blank">Our World In Data</a></p>
  </div>
</template>

<script>
export default {
  name: 'VaccinationIndex',

  data() {
    return {
      locations: []
    }
  },
  methods: {
    getPicture: iso_code => {
      return require(`../assets/${iso_code}.png`);
    }
  },
  created() {
    return fetch("/Prod/vaccination").then(response => {
      return response.json();
    }).then(data => this.locations = data);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index {
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
    justify-content: space-between;
    padding: 0.6rem 0 0.6rem 0;
    text-align: left;
  }
  .source {
    text-align: left;
    font-size: 0.8rem;
  }

  @media (max-device-width: 610px ) {
    .center-element {
      position: relative;
      transform: translateY(50%);
      padding: 0 1.0rem 0 0;
    }
  }
</style>
