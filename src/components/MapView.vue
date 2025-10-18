<template>
  <div class="map-container">
    <!-- Search Box -->
    <div class="search-box">
      <label for="start-place" class="visually-hidden">Start Place</label>
      <input
        id="start-place"
        type="text"
        v-model="startQuery"
        placeholder="Start place"
        aria-required="true"
        @keyup.enter="searchPlace"
      />

      <label for="end-place" class="visually-hidden">End Place</label>
      <input
        id="end-place"
        type="text"
        v-model="endQuery"
        placeholder="End place"
        aria-required="true"
        @keyup.enter="showRoute"
      />

      <button @click="searchPlace" aria-label="Search start place">Search Place</button>
      <button @click="showRoute" aria-label="Show route from start to end">Show Route</button>

      <!-- Route Info for screen readers -->
      <div v-if="routeInfo" role="status" aria-live="polite" class="sr-only">
        {{ routeInfo }}
      </div>
    </div>

    <!-- Map Container -->
    <div id="map" role="application" aria-label="Map showing start and end locations"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export default {
  name: 'MapView',
  data() {
    return {
      map: null,
      startQuery: '',
      endQuery: '',
      startCoords: null,
      endCoords: null,
      routeInfo: '',
    }
  },
  mounted() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibWFvemhlbWlhbm1hIiwiYSI6ImNtZ3VseDRtajBpNG4ybXBvazhneTIxYXIifQ.AT_dEX75_Rp4AI82xCppbQ'

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [144.9631, -37.8136],
      zoom: 12,
    })

    this.map.addControl(new mapboxgl.NavigationControl())
  },
  methods: {
    async geocodePlace(query) {
      if (!query) return null
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query,
        )}.json?access_token=${mapboxgl.accessToken}`,
      )
      const data = await res.json()
      if (data.features && data.features.length > 0) {
        return data.features[0].center // [lng, lat]
      }
      return null
    },

    async searchPlace() {
      if (!this.startQuery) {
        this.routeInfo = 'Start place is empty.'
        return
      }
      const coords = await this.geocodePlace(this.startQuery)
      if (!coords) {
        this.routeInfo = 'Location not found.'
        return
      }
      this.map.flyTo({ center: coords, zoom: 14 })
      new mapboxgl.Marker({ color: 'blue' }).setLngLat(coords).addTo(this.map)
      this.routeInfo = `Searched location: ${this.startQuery}`
    },

    async showRoute() {
      if (!this.startQuery || !this.endQuery) {
        this.routeInfo = 'Start or end place is empty.'
        return
      }

      this.startCoords = await this.geocodePlace(this.startQuery)
      this.endCoords = await this.geocodePlace(this.endQuery)

      if (!this.startCoords || !this.endCoords) {
        this.routeInfo = 'Could not find one or both locations.'
        return
      }

      this.map.flyTo({ center: this.startCoords, zoom: 13 })

      new mapboxgl.Marker({ color: 'green' }).setLngLat(this.startCoords).addTo(this.map)
      new mapboxgl.Marker({ color: 'red' }).setLngLat(this.endCoords).addTo(this.map)

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.startCoords[0]},${this.startCoords[1]};${this.endCoords[0]},${this.endCoords[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      const res = await fetch(url)
      const data = await res.json()
      if (!data.routes || data.routes.length === 0) {
        this.routeInfo = 'No route found.'
        return
      }

      const route = data.routes[0].geometry

      if (this.map.getSource('route')) {
        this.map.getSource('route').setData(route)
      } else {
        this.map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: route,
          },
        })
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#ff6f91', 'line-width': 5 },
        })
      }

      this.routeInfo = `Route generated from ${this.startQuery} to ${this.endQuery}`
    },
  },
}
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 500px;
  margin-top: 20px;
}
#map {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}
.search-box {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  z-index: 1;
  flex-wrap: wrap;
  gap: 4px;
}
.search-box input {
  padding: 6px 12px;
  font-size: 16px;
  border: 2px solid #333;
  outline: none;
  border-radius: 6px;
}
.search-box button {
  padding: 6px 12px;
  font-size: 16px;
  border: none;
  background-color: #ff6f91;
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
}
.search-box button:hover {
  opacity: 0.9;
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
