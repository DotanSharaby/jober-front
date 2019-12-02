<template>
  <section>
    <el-select
      v-model="value"
      multiple
      collapse-tags
      :multiple-limit="3"
      style="margin-left: 20px;"
      placeholder="Tell us about yourself and..."
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </section>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "why should we hire you?",
          label: "why should we hire you?"
        },
        {
          value: "your expectations",
          label: "your expectations"
        },
        {
          value: "your biggest weakness",
          label: "your biggest weakness"
        },
        {
          value: "your biggest strength",
          label: "your biggest strength"
        },
        {
          value: "your dream job",
          label: "your dream job"
        },
        {
          value: "where do you see yourself in five years?",
          label: "where do you see yourself in five years?"
        },
        {
          value: "why you left your last job?",
          label: "why you left your last job?"
        },
        {
          value: "what we can expect after 3 months?",
          label: "what we can expect after 3 months?"
        },
        {
          value: "what do you like to do after work?",
          label: "what do you like to do after work?"
        }
      ],
      value: []
    };
  }
};
</script>