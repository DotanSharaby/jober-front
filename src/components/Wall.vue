<template>
  <section class="wall">
    <div class="post-container">
      <Post v-for="(post, idx) in copyJob.posts" @update-post="updatePost" :post="post" :idx="idx" :key="idx"></Post>
    </div>

    <div class="add-post flex">
      <textarea type="text" v-model="postToAdd.txt" />
      <button @click="addPost">Post</button>
    </div>
  </section>
</template>

<script>
import Post from "./Post";
export default {
  components: {
    Post
  },
  data() {
    return {
      postToAdd: {
        from: "Anonymous",
        txt: "",
        createdAt: Date.now(),
        likes: 0
      },
      copyJob: null
    };
  },
  methods: {
    addPost() {
      if (this.postToAdd.txt.length <= 2) return;
      this.copyJob.posts.unshift(this.postToAdd);
      this.updateJob();
      this.postToAdd.txt = "";
    },
    updatePost(sentPost, postIdx) {
      this.copyJob.posts.splice(postIdx, 1, sentPost);
      this.updateJob();
    },
    updateJob() {
      this.$store.dispatch({type: 'saveJob', job: this.copyJob});
    }
  },
  created() {
    this.copyJob = JSON.parse(JSON.stringify(this.job));
  },
  props: ["job"]
};
</script>

<style>
</style>