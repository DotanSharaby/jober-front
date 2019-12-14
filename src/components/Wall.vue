<template>
  <section class="wall flex column">
    <div class="post-container" ref="wallRef" v-if="copyJob.posts.length">
      <Post
        v-for="(post, idx) in copyJob.posts"
        @updatePost="updatePost"
        :post="post"
        :idx="idx"
        :key="idx"
      ></Post>
    </div>
    <p v-else class="post-container">
      <em>Ask something about the job</em>
    </p>
    <div class="add-post flex column">
      <textarea
        type="text"
        v-model="postToAdd.txt"
        @keydown.enter.exact.prevent
        @keyup.enter.exact="addPost"
      />
      <div class="flex space-between">
        <button @click="addPost">Post</button>
        <label class="center center-self" v-if="userName">
          <input
            type="checkbox"
            v-model="nameOnPost"
            true-value="Anonymous"
            :false-value="userName"
          />
          Post as Anonymous
        </label>
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
      copyJob: null
    };
  },
  methods: {
    onAddPost() {
      if (this.postToAdd.txt.length <= 2) return;
      else if (!this.userName) return this.addPost();
    },
    addPost() {
      const post = this.postToAdd;
      if (post.txt.length <= 2) return;
      post.from = this.nameOnPost;
      const id = this.job._id;
      SocketService.emit("newPost", { post, id });
      this.copyJob.posts.push(post);
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
        usersLiked: []
      };
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
    SocketService.emit("room", job._id);

    SocketService.on("newPost", post => {
      job.posts.push(post);
    });
    SocketService.on("updatePost", post => {
      job.posts.splice(post.postIdx, 1, post.sentPost);
    });
  },
  props: { job: Object }
};
</script>
