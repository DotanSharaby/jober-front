<template>
  <section class="apply-form-wrapper flex column">
    <a href="#">Back</a>
    <h2 class="bold">Your application to Frontend Developer at Googooloo</h2>
    <h3 class="semi">Please record your answers for the following questions!</h3>
    <div class="quest-container flex">
      <ApplyQuest v-for="quest in questions" :quest="quest" :key="quest"></ApplyQuest>
    </div>
    <textarea placeholder="Leave a message?"></textarea>
    <div class="btn-sect flex align-center justify-center">
      <button>Submit</button>
      <a href="#" class="not-now">Another time</a>
    </div>
  </section>
</template>

<script>
import ApplyQuest from "@/components/ApplyQuest";

export default {
  data() {
    return {
      questions: ["Why do you think we should hire you?", "Explain Closures", "Explain Hoisting in javascript"]
    };
  },
  components: {
    ApplyQuest
  }
};
</script>

<style scoped lang="scss">
.apply-form-wrapper {
  width: 100%;
  margin: 0 auto;
  .quest-container {
    justify-content: space-evenly
  }
  h2 {
    align-self: center;
    margin-bottom: 20px;
  }
  h3 {
    align-self: center;
    margin-bottom: 30px;
  }
  textarea {
    width: 400px;
    height: 100px;
    margin: 0 auto;
    resize: none;
  }
  .btn-sect {
      margin: 15px;
  }
  button {
    width: 150px;
    height: 40px;
    margin-right: 10px;
  }
}

@media(max-width: 720px) {
    .quest-container {
        flex-direction: column;
    }
}
</style>