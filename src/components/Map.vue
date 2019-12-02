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
    {{loc}}
  </section>
</template>

<script>
export default {
  props: { loc: Object },
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
  }
};
</script>