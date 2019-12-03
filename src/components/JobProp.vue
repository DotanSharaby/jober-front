<template>
  <div class="item-wrapper" v-if="item">
    <font-awesome-icon class="icon" :icon="iconToShow" />&nbsp;
    <span v-if="item">{{iconDescription}}</span>&nbsp;
    <font-awesome-icon class="check" :icon="['fas', 'check']"></font-awesome-icon>
  </div>
</template>

<script>
export default {
  name: "JobProp",
  props: ["item"],
  computed: {
    iconToShow() {
      return ["fas", this.item];
    },
    iconDescription() {
      switch (this.item) {
        case "paw":
          return "Dog friendly";
        case "utensils":
          return "Restaurants";
        case "mug-hot":
          return "Coffee shops";
        case "parking":
          return "Parking";
        case "bus":
          return "Public Transportation";
        default: return "No props";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.item-wrapper {
  padding: 7px 0;
  .check {
    font-size: 0.8em;
    margin-left: 5px;
  }
  .icon {
    margin-right: 5px;
    width: 16px;
    height: 16px;
  }
}
</style>