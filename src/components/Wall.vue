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
    <div
      v-if="isModalActive"
      class="name-modal flex justify-center align-center"
    >
      <div>
        Post as
        <select v-model="nameOnPost">
          <option>{{userName}}</option>
          <option>Anonymous</option>
        </select>&nbsp;
        <button @click="addPost">Post</button>
      </div>
      <a
        href="#"
        class="cancel-btn"
        @click.prevent="clearPost"
      >x</a>
    </div>
    <div class="add-post flex">
      <textarea
        type="text"
        v-model="postToAdd.txt"
      />
      <div class="flex align-center">
        <button v-if="!isModalActive" @click="onAddPost">Post</button>
      </div>
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
      nameOnPost: null,
      userName: null,
      postToAdd: null,
      copyJob: null,
      isModalActive: false
    };
  },
  methods: {
    onAddPost() {
      if (this.postToAdd.txt.length <= 2) return;
      else if (!this.userName) return this.addPost();
      this.isModalActive = true;
    },
    addPost() {
      if (this.postToAdd.txt.length <= 2) return;
      this.postToAdd.from = this.nameOnPost;
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
        txt: "",
        createdAt: Date.now(),
        likes: 0
      };
      this.isModalActive = false;
    }
  },
  created() {
    this.clearPost();
    this.copyJob = JSON.parse(JSON.stringify(this.job));
    const user = this.$store.getters.loggedinUser;
    if(user) {
      this.nameOnPost = user.username;
      this.userName = user.username;
    } else this.nameOnPost = 'Anonymous';
  },
  props: ["job"]
};
</script>

<style>
</style>