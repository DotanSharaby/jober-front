<template>
  <section class="sect-wrapper flex column align-center med-container center">
    <section class="quest-sect">
      <p class="semi">{{quest}}</p>
      <button>Click to record</button>
    </section>

  </section>
</template>

<script>
export default {
  props: ["quest"],
  name: "ApplyQuest"
};
</script>