<template>
  <section class="sect-wrapper">
    <section class="quest-sect">
      <p class="semi">{{quest}}</p>
      <button>Click to record</button>
    </section>
    <section class="video-sect">Video goes here</section>
  </section>
</template>

<script>
export default {
  props: ["quest"],
  name: "ApplyQuest"
};
</script>

<style scoped lang="scss">
.sect-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: 0.3s;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
  .quest-sect {
    height: 70px;
    button {
      margin: 15px;
    }
  }
  .video-sect {
    border: 1px solid black;
    height: 200px;
    width: 70%;
    margin: 15px;
  }
}

@media (max-width: 720px) {
  .sect-wrapper {
    display: grid;
    width: 90%;
    margin: 20px auto;
    justify-content: center;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 100px 100px;
    .quest-sect {
      grid-row: 1/ 3;
      grid-column: 1/ 2;
      margin-top: 40px;
      align-self: flex-start;
      justify-items: center;
      display: grid;
      gap: 30px;
      button {
        width: 100px;
      }
    }
    .video-sect {
      grid-row: 1/3;
      grid-column: 2/3;
      outline: 1px solid rgb(169, 169, 169);
    }
  }
}
</style>