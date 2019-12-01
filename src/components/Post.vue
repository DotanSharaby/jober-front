<template>
  <section v-if="post">
    <div class="post-header">
      <p>
        <span class="semi">{{post.from}}</span>
        {{post.createdAt}}
      </p>
    </div>
    <div class="post-main flex column">
      <p>{{post.txt}}</p>
    </div>
    <div class="post-options flex">
      <div class="btn-wrap">
        <font-awesome-icon class="icon-item" @click="addLike" :icon="['fa', 'thumbs-up']" />
      </div>
      <span v-if="post.likes > 0">&nbsp;{{post.likes}}</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "Post",
  props: ["post"],
  data() {
    return {
      isLiked: false
    };
  },
  methods: {
    addLike(ev) {
      this.isLiked = !this.isLiked;
      this.isLiked ? (this.post.likes += 1) : (this.post.likes -= 1);
      var target = ev.target;
      if (target.localName === "path") target = target.farthestViewportElement;
      target.classList.toggle("active");
    }
  }
};
</script>

<style>
</style>