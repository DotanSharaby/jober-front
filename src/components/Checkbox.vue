<template>
  <section>
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >Check all</el-checkbox>
    <el-checkbox-group v-model="checkedSkills" @change="handleCheckedSkillsChange">
      <el-checkbox
        style="margin-right:10px"
        v-for="skill in skills"
        :label="skill"
        :key="skill"
      >{{skill}}</el-checkbox>
    </el-checkbox-group>
  </section>
</template>
<script>
const skillOptions = ["Developer", "Gardener", "Doctor", "Driver"];

export default {
  data() {
    return {
      checkAll: false,
      checkedSkills: ["Developer", "Driver"],
      skills: skillOptions,
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedSkills = val ? skillOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedSkillsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.skills.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.skills.length;
    }
  }
};
</script>