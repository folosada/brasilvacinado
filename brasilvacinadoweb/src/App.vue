<template>
  <header class="logo">
    <img alt="Brasil Vacinado Logo" src="./assets/logo.png">
  </header>
  <VaccinationIndex/>
  <Chart/>
  <Footer/>
</template>

<script>
import VaccinationIndex from './components/VaccinationIndex.vue';
import Footer from './components/Footer.vue';
import Chart from './components/Chart.vue';

export default {
  title: 'Brasil Vacinado',
  name: 'App',
  components: {
    VaccinationIndex,
    Footer,
    Chart
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 4rem;
    width: 100%;
  }

  .logo {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 4000px ) {
    .center {
      width: 45%;
      margin: 0 auto;
    }
  }

  @media (max-device-width: 610px ) {
    .center {
      width: 80%;
      margin: 0 auto;
    }
  }

</style>
