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
  props: ["post", "idx"],
  data() {
    return {
      isLiked: false
    };
  },
  methods: {
    addLike(ev) {
      this.isLiked = !this.isLiked;
      var diff = this.isLiked ? 1 : -1;
      let postToEdit = JSON.parse(JSON.stringify(this.post));
      postToEdit.likes += diff;
      this.$emit("update-post", postToEdit, this.idx);
      // todo : make it computed (if likes is true, make active else unactive)
      var target = ev.target;
      if (target.localName === "path") target = target.farthestViewportElement;
      target.classList.toggle("active");
    }
  }
};
</script>

<style>
</style>