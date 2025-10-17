<template>
  <div class="map-container">
    <div class="search-box">
      <input type="text" v-model="startQuery" placeholder="Start place" />
      <input type="text" v-model="endQuery" placeholder="End place" />
      <button @click="searchPlace">Search Place</button>
      <button @click="showRoute">Show Route</button>
    </div>
    <div id="map"></div>
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
      if (!this.startQuery) return
      const coords = await this.geocodePlace(this.startQuery)
      if (!coords) {
        alert('Location not found!')
        return
      }
      this.map.flyTo({ center: coords, zoom: 14 })
      new mapboxgl.Marker({ color: 'blue' }).setLngLat(coords).addTo(this.map)
    },

    async showRoute() {
      this.startCoords = await this.geocodePlace(this.startQuery)
      this.endCoords = await this.geocodePlace(this.endQuery)

      if (!this.startCoords || !this.endCoords) {
        alert('Could not find one or both locations.')
        return
      }

      this.map.flyTo({ center: this.startCoords, zoom: 13 })

      new mapboxgl.Marker({ color: 'green' }).setLngLat(this.startCoords).addTo(this.map)
      new mapboxgl.Marker({ color: 'red' }).setLngLat(this.endCoords).addTo(this.map)

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.startCoords[0]},${this.startCoords[1]};${this.endCoords[0]},${this.endCoords[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      const res = await fetch(url)
      const data = await res.json()
      if (!data.routes || data.routes.length === 0) return

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
}
.search-box input {
  padding: 6px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  outline: none;
  margin-right: 4px;
}
.search-box button {
  padding: 6px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  background-color: #ff6f91;
  color: #fff;
  cursor: pointer;
  margin-left: 2px;
}
.search-box button:hover {
  opacity: 0.9;
}
</style>
