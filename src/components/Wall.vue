<template>
  <section class="wall">
    <ul>
      <li>
        <div class="comment flex space-between column">
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
              <font-awesome-icon class="icon-item" :icon="['fa', 'thumbs-up']" />&nbsp;{{comment.likeAmount}}
            </div>
            <div class="btn-wrap">
              <span class="icon-item">Reply</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="comment-wrapper flex column">
      <div class="comment-container flex">
        <textarea type="text" />
      </div>
      <button>Send</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      comment: {
        from: "Anonymous",
        when: "40 minutes ago",
        body: `Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Sunt, iure atque maxime
              harum exercitationem sapiente! Vero maxime ex exercitationem impedit. Quaerat`,
        likeAmount: 50
      }
    };
  }
};
</script>

<style>
</style>