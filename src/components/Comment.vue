<template>
  <section v-if="comment">
    <div class="comment-header">
      <p>
        <span class="semi">{{comment.from}}</span>
        {{comment.when}}
      </p>
    </div>
    <div class="comment-main flex column">
      <p>{{comment.body}}</p>
    </div>
    <div class="comment-options flex">
      <div class="btn-wrap">
        <font-awesome-icon class="icon-item" @click="addLike" :icon="['fa', 'thumbs-up']" />
      </div>
      <span v-if="comment.likeAmount > 0">&nbsp;{{comment.likeAmount}}</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "Comment",
  props: ["comment"],
  data() {
    return {
      isLiked: false
    };
  },
  methods: {
    addLike(ev) {
      this.isLiked = !this.isLiked;
      this.isLiked
        ? (this.comment.likeAmount += 1)
        : (this.comment.likeAmount -= 1);
      var target = ev.target;
      if (target.localName === "path") target = target.farthestViewportElement;
      target.classList.toggle("active");
    }
  }
};
</script>

<style>
</style>