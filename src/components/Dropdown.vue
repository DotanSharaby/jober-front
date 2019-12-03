<template>
  <section>
    <el-select
      v-model="value"
      multiple
      collapse-tags
      :multiple-limit="3"
      placeholder="Tell us about yourself and..."
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </section>
</template>

<script>
export default {
  props: { quests: Array },
  data() {
    return {
      options: [
        {
          value: "Why should we hire you?",
          label: "Why should we hire you?"
        },
        {
          value: "Your expectations",
          label: "Your expectations"
        },
        {
          value: "Your biggest weakness",
          label: "Your biggest weakness"
        },
        {
          value: "Your biggest strength",
          label: "Your biggest strength"
        },
        {
          value: "Your dream job",
          label: "Your dream job"
        },
        {
          value: "Where do you see yourself in five years?",
          label: "Where do you see yourself in five years?"
        },
        {
          value: "Why you left your last job?",
          label: "Why you left your last job?"
        },
        {
          value: "What we can expect after 3 months?",
          label: "What we can expect after 3 months?"
        },
        {
          value: "What do you like to do after work?",
          label: "What do you like to do after work?"
        }
      ],
      value: []
    };
  },
  watch: {
    value() {
      this.$emit("setVal", this.value);
    },
    quests() {
      this.value = this.quests;
    }
  }
};
</script>