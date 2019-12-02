<template>
  <section class="wall">
    <div class="post-container">
      <Post
        v-for="(post, idx) in copyJob.posts"
        @update-post="updatePost"
        :post="post"
        :idx="idx"
        :key="idx"
      ></Post>
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
      postToAdd: null,
      copyJob: null
    };
  },
  methods: {
    addPost() {
      if (this.postToAdd.txt.length <= 2) return;
      this.copyJob.posts.unshift(this.postToAdd);
      this.updateJob();
      this.clearPost();
    },
    updatePost(sentPost, postIdx) {
      this.copyJob.posts.splice(postIdx, 1, sentPost);
      this.updateJob();
    },
    async updateJob() {
      await this.$store.dispatch({ type: "saveJob", job: this.copyJob });
    },
    clearPost() {
      this.postToAdd = {
        from: "Anonymous",
        txt: "",
        createdAt: Date.now(),
        likes: 0
      };
    }
  },
  created() {
    this.clearPost();
    this.copyJob = JSON.parse(JSON.stringify(this.job));
  },
  props: ["job"]
};
</script>

<style>
</style>