<template>
  <div class="admin-page">
    <div class="container p-4">
      <h2>Admin Dashboard — {{ currentUser.username }}</h2>
      <p>
        Role: <strong>{{ currentUser.role }}</strong>
      </p>

      <button class="btn btn-primary mt-3 mb-3" @click="showTables = !showTables">
        {{ showTables ? 'Hide' : 'Show' }} Interactive Tables
      </button>

      <InteractiveTables v-if="showTables" />

      <button class="btn btn-logout mt-4" @click="$emit('logout')">Logout</button>
    </div>
  </div>
</template>

<script>
import InteractiveTables from './InteractiveTables.vue'

export default {
  props: { currentUser: { type: Object, required: true } },
  components: { InteractiveTables },
  data() {
    return {
      showTables: false,
    }
  },
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f7ff, #f9fbff);
  padding-top: 40px;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 24px;
}
.btn-logout {
  margin-top: 20px;
  padding: 10px 20px;
  background: #ff6f61;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.btn-logout:hover {
  background: #ff8a75;
}
.btn-primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
.btn-primary:hover {
  background: #0056b3;
}
</style>
