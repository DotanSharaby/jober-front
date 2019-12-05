<template>
  <section class="job-edit container flex justify-center">

    <form
      @submit.prevent="saveJob"
      class="flex"
    >
      <section class="flex column flex-grow">
        <h1
          class="bold"
          v-if="!editedJob._id"
        >Add Job</h1>
        <h1
          class="bold"
          v-else
        >Edit Job</h1>
        <label>Job Title:</label>
        <input type="text" v-model="editedJob.title" placeholder="Designer" />
        <label>Address:</label>
        <input type="text" v-model="editedJob.address" placeholder="Tel Aviv" />
        <label>Description:</label>
        <textarea
          placeholder="Describe the position, working place etc.."
          v-model="editedJob.desc"
          rows="5"
        ></textarea>
      </section>

      <section class="flex column flex-grow">
        <label>Choose up to 3 questions:</label>
        <drop-down @setVal="setQuests" :quests="editedJob.quests" />
        <section class="req-container flex column">
          Skill requirements:
          <div class="skill" v-for="(skill, idx) in skills" :key="idx">
            <input type="checkbox" :id="skill" :value="skill" v-model="editedJob.reqSkills" />
            <label :for="skill">{{skill}}</label>
          </div>
          <ul class="clean-list">
            <li v-for="(skill, idx) in addedSkills" :key="idx">{{skill}}</li>
          </ul>
          <label>
            Other:
            <input type="text" ref="addSkillInput" v-model="skillToAdd" />
            <button @click.prevent="addSkillReq">+</button>
          </label>
        </section>
      </section>

      <section class="flex column flex-grow">
        <label>Perks:</label>
        <div class="icons-container flex column">
          <div class="flex align-center icon-container">
            <font-awesome-icon
              @click="addProp"
              class="icon-item"
              data-desc="Dog friendly"
              title="Dog friendly"
              :icon="['fas', 'paw']"
            /> <span class="icon-desc">Dog Friendly</span>
          </div>

          <div class="flex align-center icon-container">
            <font-awesome-icon
              data-desc="Transportation"
              class="icon-item"
              @click="addProp"
              title="Transportation"
              :icon="['fas', 'bus']"
            /> <span class="icon-desc">Transportation</span>
          </div>
          <div class="flex align-center icon-container">
            <font-awesome-icon
              data-desc="Restaurants"
              class="icon-item"
              @click="addProp"
              title="Restaurants"
              :icon="['fas', 'utensils']"
            /> <span class="icon-desc">Restaurants</span>
          </div>
          <div class="flex align-center icon-container">
            <font-awesome-icon
              data-desc="Parking"
              class="icon-item"
              @click="addProp"
              title="Parking"
              :icon="['fas', 'parking']"
            /> <span class="icon-desc">Parking</span>
          </div>

          <div class="flex align-center icon-container">
            <font-awesome-icon
              data-desc="Coffee shops"
              class="icon-item"
              @click="addProp"
              title="Coffee shops"
              :icon="['fas', 'mug-hot']"
            /> <span class="icon-desc">Coffee shops</span>
          </div>
        </div>
        <label>Salary:</label>
        <input type="number" placeholder="Expected Salery" v-model.number="editedJob.payment" />
        <label class="image-section flex align-center space-between">
          Image:
          <div class="image" v-if="editedJob.img">
            <img :src="editedJob.img" />
          </div>
          <input type="file" name="file" id="file" class="inputfile" @change="getUrl" />
          <scale-loader
            class="loader inline-block flex-center"
            v-if="isLoading && !editedJob.img"
            :color="'#8bdade'"
          ></scale-loader>
          <label for="file">Choose File</label>
        </label>
        <button class="save-btn">Save</button>
        <br />
        <div class="flex justify-center">
          <p v-if="!isAllowedToPublish">Fill all fields</p>
          <p v-else>Ready to go</p>
        </div>
      </section>
      <section class="flex column">
        <button v-if="editedJob._id" @click="remove">Remove Job</button>
      </section>
    </form>
  </section>
</template>

<script>
import UploadService from "../services/UploadService";
import dropDown from "../components/Dropdown";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  data() {
    return {
      editedJob: {
        reqSkills: [],
        perks: [],
        quests: [],
        saves: 0
      },
      skillToAdd: "",
      addedSkills: [],
      isLoading: false
    };
  },
  async created() {
    const user = this.$store.getters.loggedinUser;
    if (!user) return this.$router.go(-1);
    const jobId = this.$route.params.id;
    if (jobId) {
      await this.$store.dispatch({
        type: "loadCurrJob",
        id: jobId
      });
      const job = this.$store.getters.currJob;
      this.editedJob = JSON.parse(JSON.stringify(job));
    } else {
      this.editedJob.owner = user;
    }
  },
  methods: {
    addSkillReq() {
      this.editedJob.reqSkills.push(this.skillToAdd);
      this.addedSkills.push(JSON.parse(JSON.stringify(this.skillToAdd)));
      this.skillToAdd = "";
    },
    async saveJob() {
      if (this.isAllowedToPublish) {
        await this.$store.dispatch({ type: "addJob", job: this.editedJob });
        this.$router.go(-1);
      }
    },
    async getUrl(ev) {
      this.isLoading = true;
      const file = await UploadService.upload(ev.target.files[0]);
      this.isLoading = false;
      this.editedJob.img = file.url;
    },
    async remove() {
      await this.$store.dispatch({ type: "removeJob", id: this.editedJob._id });
      this.$router.push("/");
    },
    addProp(ev) {
      var target = ev.target;
      if (target.localName === "path") target = target.farthestViewportElement;
      if (this.editedJob.perks.includes(target.dataset.icon)) {
        this.editedJob.perks.splice(
          this.editedJob.perks.indexOf(target.dataset.icon),
          1
        );
      } else this.editedJob.perks.push(target.dataset.icon);

      target.classList.toggle("active");
    },
    setQuests(val) {
      this.editedJob.quests = val;
    }
  },
  computed: {
    skills() {
      return this.$store.getters.skills;
    },
    isAllowedToPublish() {
      let job = this.editedJob;
      if (
        job.title &&
        job.address &&
        job.reqSkills.length > 0 &&
        job.payment > 100 &&
        job.desc &&
        job.img
      ) {
        return true;
      }
      return false;
    }
  },
  components: {
    ScaleLoader,
    dropDown
  }
};
</script>
