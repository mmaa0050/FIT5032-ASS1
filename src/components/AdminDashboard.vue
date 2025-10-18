<template>
  <main class="dashboard-page">
    <div class="container p-4">
      <section class="welcome-section" aria-label="Welcome section">
        <h2>Welcome Admin, {{ currentUser.email }}!</h2>
        <p>Your role is: <strong>Admin</strong></p>
      </section>

      <div class="button-group" role="group" aria-label="Dashboard controls">
        <button
          class="btn btn-primary"
          @click="showTables = !showTables"
          :aria-pressed="showTables.toString()"
          aria-label="Toggle interactive tables"
        >
          {{ showTables ? 'Hide' : 'Show' }} Interactive Tables
        </button>

        <button
          class="btn btn-secondary"
          @click="$emit('toggle-map')"
          :aria-pressed="showMap.toString()"
          aria-label="Toggle map view"
        >
          {{ showMap ? 'Hide' : 'Show' }} Map
        </button>

        <button class="btn btn-logout" @click="$emit('logout')" aria-label="Logout">Logout</button>
      </div>

      <InteractiveTables v-if="showTables" />
      <MapView v-if="showMap" />
    </div>
  </main>
</template>

<script>
import InteractiveTables from './InteractiveTables.vue'
import MapView from './MapView.vue'

export default {
  props: {
    currentUser: { type: Object, required: true },
    showMap: { type: Boolean, required: true },
  },
  components: { InteractiveTables, MapView },
  data() {
    return { showTables: false }
  },
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f7ff, #e6f0ff);
  padding-top: 40px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.welcome-section h2 {
  font-size: 28px;
  color: #1e90ff;
  margin-bottom: 6px;
}

.welcome-section p {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  outline: none;
}

.btn:focus {
  outline: 3px solid #ffa500; /* 高对比焦点提示 */
  outline-offset: 2px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #28a745;
  color: white;
}

.btn-secondary:hover {
  background-color: #1e7e34;
}

.btn-logout {
  background-color: #ff6f61;
  color: white;
}

.btn-logout:hover {
  background-color: #ff8a75;
}
</style>
