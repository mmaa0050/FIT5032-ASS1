<template>
  <div class="dashboard-page">
    <div class="container p-4">
      <h2>Welcome, {{ currentUser.username }}!</h2>
      <p>
        Your role is: <strong>{{ currentUser.role }}</strong>
      </p>

      <Rating :current-user="currentUser" />

      <button class="btn btn-logout mt-3" @click="$emit('logout')">Logout</button>
    </div>
  </div>
</template>

<script>
import Rating from './Rating.vue'
export default {
  props: { currentUser: { type: Object, required: true } },
  components: { Rating },
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #fff6f6, #fffaf0);
  padding-top: 40px;
}
.container {
  max-width: 900px;
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
</style>
