<template>
  <section v-if="post" class="post">
    <div class="post-header">
      <p>
        <span class="semi">{{post.from}}</span>
        {{timeToShow}}
      </p>
    </div>
    <div class="post-main flex column">
      <p>{{post.txt}}</p>
    </div>
    <div class="post-options flex">
      <div class="btn-wrap">
        <font-awesome-icon
          :class="{active:isLike}"
          class="icon-item"
          @click="addLike"
          :icon="['fa', 'thumbs-up']"
        />
      </div>
      <span v-if="post.usersLiked.length">&nbsp;{{post.usersLiked.length}}</span>
    </div>
  </section>
</template>

<script>
import moment from "moment";

export default {
  name: "Post",
  props: { post: Object, idx: Number },
  data() {
    return {
      userId: null
    };
  },
  methods: {
    addLike(ev) {
      const self = this;
      let postToEdit = JSON.parse(JSON.stringify(this.post));
      if (this.isLike) {
        postToEdit.usersLiked = postToEdit.usersLiked.filter(id => {
          return id !== self.userId;
        });
      } else {
        postToEdit.usersLiked.push(this.userId);
      }
      this.$emit("updatePost", postToEdit, this.idx);
      var target = ev.target;
      if (target.localName === "path") target = target.farthestViewportElement;
      target.classList.toggle("active");
    }
  },
  computed: {
    timeToShow() {
      return this.postCreationTime.fromNow();
    },
    postCreationTime() {
      return moment(this.post.createdAt);
    },
    isLike() {
      const res = this.post.usersLiked.filter(id => id === this.userId);
      return res.length;
    }
  },
  created() {
    const user = this.$store.getters.loggedinUser;
    this.userId = user._id;
  }
};
</script>