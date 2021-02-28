<template>
  <div class="footer center">
    <div class="content center">
      <p>Developed by Flávio Omar Losada</p>
      <div class="socialmedia">
          <a href="https://github.com/folosada" target="blank"><img class="icons" src="../assets/github.svg"/></a>
          <a href="https://www.linkedin.com/in/folosada/" target="blank"><img class="icons" src="../assets/linkedin.svg"/></a>
          <a href="https://twitter.com/flavio_losada" target="blank"><img class="icons" src="../assets/twitter.svg"/></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
  .footer {
    position: relative;
    bottom:0;
    width: 100%;
  }

  .content {
    padding: 0.13em 0 0.13em 0;
    font-size: 0.8rem;
  }

  .icons {
      width: 1.6rem;
      height: 1.6rem;
      padding: 0 0.2rem 0 0.2rem;
  }

  .socialmedia {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 0 0.6rem 0;
  }
</style>