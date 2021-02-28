<template>
  <div class="center chart">
    <h3>Pessoas vacinadas - Brasil</h3>
    <line-chart v-if="loaded" :data="vaccination"/>
  </div>
</template>
<script>

export default {
  name: 'LineChartContainer',
  data: () => ({
    loaded: false,
    vaccination: {},
  }),
  created() {
    this.loaded = false;
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setDate(currentDate.getDate() - 15);
    const initialDate = pastDate.toISOString().split('T')[0];
    const finalDate = currentDate.toISOString().split('T')[0];
    return fetch(`/Prod/graphic?initialDate=${initialDate}&finalDate=${finalDate}`, {'Access-Control-Allow-Origin': '*'}).then(response => {
      return response.json();
    }).then(data => {
      data.forEach(element => this.vaccination[element.date] = element.total_vaccinations);
      this.loaded = true;
    });
  }
}
</script>
<style scoped>
  .chart {
    padding: 0.5rem 0 0.5rem 0
  }
</style>