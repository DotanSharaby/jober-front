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
      style="max-width: 500px; width:100%;  height: 300px; outline: 1px solid #bfadad"
      ref="mapRef"
    >
      <GmapMarker :position="marker.position" :clickable="true" @click="centerMap" />
    </GmapMap>
  </section>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
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
  computed: {
    google: gmapApi
  },
  async mounted() {
    const self = this;
    const map = await this.$refs.mapRef.$mapPromise;

    var geocoder = new this.google.maps.Geocoder();
    var address = this.address;
    geocoder.geocode({ address: address }, function(results, status) {
      if (status === this.google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        self.center = { lat: latitude, lng: longitude };
        map.zoom = 12;
        self.marker.position = { lat: latitude, lng: longitude };
      }
    });
  }
};
</script>