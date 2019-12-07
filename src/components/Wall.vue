<template>
  <section class="wall flex column">
    <div class="post-container" v-if="copyJob.posts.length">
      <Post
        v-for="(post, idx) in copyJob.posts"
        @updatePost="updatePost"
        :post="post"
        :idx="idx"
        :key="idx"
      ></Post>
    </div>
    <span v-else class="post-container">
      <em>Ask something about the job</em>
    </span>
    <div class="add-post flex">
      <div v-if="isModalActive" class="name-modal flex justify-center align-center">
        <div>
          Post as
          <select v-model="nameOnPost">
            <option>{{userName}}</option>
            <option>Anonymous</option>
          </select>&nbsp;
          <button @click="addPost">Post</button>
          <button class="cancel-btn" @click="clearPost">x</button>
          <div class="msg-container flex justify-center">Message: {{this.postToAdd.txt}}</div>
        </div>
      </div>
      <textarea type="text" v-if="!isModalActive" v-model="postToAdd.txt" />
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
      const post = this.postToAdd;
      if (post.txt.length <= 2) return;
      post.from = this.nameOnPost;
      const id = this.job._id;
      SocketService.emit("newPost", { post, id });
      this.copyJob.posts.unshift(post);
      this.updateJob();
      this.clearPost();
    },
    updatePost(sentPost, postIdx) {
      const id = this.job._id;
      SocketService.emit("updatePost", { sentPost, postIdx, id });
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
    this.copyJob = JSON.parse(JSON.stringify(this.job));
    if (!this.copyJob.posts) this.copyJob.posts = [];
    const user = this.$store.getters.loggedinUser;
    if (user) {
      this.nameOnPost = user.username;
      this.userName = user.username;
    } else this.nameOnPost = "Anonymous";

    this.clearPost();
  },
  mounted() {
    var job = this.copyJob;
    SocketService.emit('room',job._id)

    SocketService.on("newPost", post => {
      job.posts.unshift(post);
    });
    SocketService.on("updatePost", post => {
      job.posts.splice(post.postIdx, 1, post.sentPost);
    });
  },
  props: { job: Object }
};
</script>
