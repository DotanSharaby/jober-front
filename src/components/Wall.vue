<template>
  <section class="wall flex column">
    <div class="post-container" v-if="copyJob.posts.length">
      <Post
        v-for="(post, idx) in copyJob.posts"
        @update-post="updatePost"
        :post="post"
        :idx="idx"
        :key="idx"
      ></Post>
    </div>
    <span v-else class="post-container"><em>Ask something about the job</em></span>
    <div class="add-post flex">
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
          <a
            href="#"
            class="cancel-btn"
            @click.prevent="clearPost"
          >x</a>
          <div class="msg-container flex justify-center">
            Message: {{this.postToAdd.txt}}
          </div>
        </div>
      </div>
      <textarea
        type="text"
        v-model="postToAdd.txt"
        v-if="!isModalActive"
      />
      <div class="flex align-center">
        <button v-if="!isModalActive" @click="onAddPost">Post</button>
      </div>
    </div>
  </section>
</template>

<script>
import Post from "./Post";
import SocketService from "@/services/SocketService";

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
      SocketService.emit("post newPost", this.postToAdd);
      this.copyJob.posts.unshift(this.postToAdd);
      this.updateJob();
      this.clearPost();
    },
    updatePost(sentPost, postIdx) {
      SocketService.emit("post update", { sentPost, postIdx });
      this.copyJob.posts.splice(postIdx, 1, sentPost);
      this.updateJob();
    },
    async updateJob() {
      await this.$store.dispatch({ type: "updateJob", job: this.copyJob });
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
    SocketService.emit("join room", this.job._id);
    SocketService.on("post newPost", post => {
      this.copyJob.posts.unshift(post);
    });
    SocketService.on("post update", postData => {
      this.copyJob.posts.splice(postData.postIdx, 1, postData.sentPost);
    });
    this.clearPost();
    this.copyJob = JSON.parse(JSON.stringify(this.job));
    if (!this.copyJob.posts) this.copyJob.posts = [];
    const user = this.$store.getters.loggedinUser;
    if (user) {
      this.nameOnPost = user.username;
      this.userName = user.username;
    } else this.nameOnPost = "Anonymous";
  },
  props: ["job"]
};
</script>

<style>
</style>