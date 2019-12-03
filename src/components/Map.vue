<template>
  <section>
    <GmapMap
      :options="{
   zoomControl: true,
   mapTypeControl: false,
   scaleControl: false,
   streetViewControl: false,
   rotateControl: false,
   fullscreenControl: false,
   disableDefaultUi: false
 }"
      :center="center"
      :zoom="11"
      style="width: 500px; height: 300px"
      ref="mapRef"
    >
      <GmapMarker :position="marker.position" :clickable="true" @click="centerMap" />
    </GmapMap>
    {{address}}
  </section>
</template>

<script>
import GeolocationService from "../services/Geolocation.service";
export default {
  props: { address: String },
  data() {
    return {
      center: { lat: 32, lng: 35 },
      marker: { position: { lat: 32, lng: 35 } }
    };
  },
  methods: {
    async centerMap() {
      const map = await this.$refs.mapRef.$mapPromise;
      map.panTo(this.marker.position);
    }
  },
  async created() {
    const loc = GeolocationService.getLoc(this.address);
    console.log(loc);
  }
};
</script>