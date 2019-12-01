<template>
  <section class="wall">
    <div class="comment-container">
      <Comment v-for="comment in comments" :comment="comment" :key="comment.id"></Comment>
    </div>
    <div class="add-comment flex">
      <textarea type="text" />
      <button>Post</button>
    </div>
  </section>
</template>

<script>
import Comment from "./Comment";
export default {
  components: {
    Comment
  },
  data() {
    return {
      comments: [
        {
          id: "124",
          from: "Anonymous",
          when: "40 minutes ago",
          body: `Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Sunt, iure atque maxime
              harum exercitationem sapiente! Vero maxime ex exercitationem impedit. Quaerat`,
          likeAmount: 0
        },
        {
          id: "123",
          from: "Anonymous",
          when: "40 minutes ago",
          body: `Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Sunt, iure atque maxime
              harum exercitationem sapiente! Vero maxime ex exercitationem impedit. Quaerat`,
          likeAmount: 0
        }
      ]
    };
  }
};
</script>

<style>
</style>