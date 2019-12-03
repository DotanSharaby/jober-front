<template>
  <div class="about">
    <gmap-autocomplete class="introInput">
      <template v-slot:input="slotProps">
        <v-text-field
          outlined
          prepend-inner-icon="place"
          placeholder="Location Of Event"
          ref="input"
          v-on:listeners="slotProps.listeners"
          v-on:attrs="slotProps.attrs"
        ></v-text-field>
      </template>
    </gmap-autocomplete>
    <GmapMap
      :center="{lat:32, lng:35}"
      :zoom="11"
      style="width: 500px; height: 300px"
    >
    </GmapMap>
  </div>
</template>

<script>
export default {
  
  
};
</script>