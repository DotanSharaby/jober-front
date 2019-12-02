<template>
  <section class="wall">
    <div class="post-container">
      <Post v-for="post in posts" :post="post" :key="post._id"></Post>
      {{posts}}
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
        likes: 0,
        jobId: null
      }
    };
  },
  computed: {
    currJob() {
      return this.$store.getters.currJob._id;
    }
  },
  methods: {
    async addPost() {
      // dispatch "addPost", send to db (make unique id),
      this.postToAdd.jobId = this.currJob;
      const post = JSON.parse(JSON.stringify(this.postToAdd));
      await this.$store.dispatch({ type: "savePost", post });
      this.postToAdd.txt = "";
    }
  },
  props: ["posts"]
};
</script>

<style>
</style>