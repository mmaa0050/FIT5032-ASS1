<template>
  <div class="admin-page">
    <div class="container p-4">
      <h2>Admin Dashboard — {{ currentUser.username }}</h2>
      <p>
        Role: <strong>{{ currentUser.role }}</strong>
      </p>

      <section class="mt-4">
        <h4>Registered Users</h4>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in users" :key="u.email">
              <td>{{ u.username }}</td>
              <td>{{ u.email }}</td>
              <td>{{ u.role }}</td>
              <td>
                <button class="btn btn-sm btn-danger" @click="deleteUser(u.email)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="mt-4">
        <h4>Ratings Summary</h4>
        <p>
          Average rating: <strong>{{ avgRatingDisplay }}</strong>
        </p>
        <p>Total votes: {{ ratings.length }}</p>
      </section>

      <button class="btn btn-logout mt-3" @click="$emit('logout')">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  props: { currentUser: { type: Object, required: true } },
  data() {
    return {
      users: [],
      ratings: [],
    }
  },
  computed: {
    avgRating() {
      if (!this.ratings.length) return 0
      const sum = this.ratings.reduce((s, r) => s + r.rating, 0)
      return sum / this.ratings.length
    },
    avgRatingDisplay() {
      return this.avgRating ? this.avgRating.toFixed(2) + ' / 5' : 'No ratings yet'
    },
  },
  mounted() {
    this.loadUsers()
    this.loadRatings()
  },
  methods: {
    loadUsers() {
      this.users = JSON.parse(localStorage.getItem('users') || '[]')
    },
    loadRatings() {
      this.ratings = JSON.parse(localStorage.getItem('ratings') || '[]')
    },
    deleteUser(email) {
      if (!confirm(`Delete user ${email}? This cannot be undone.`)) return
      // remove user
      this.users = this.users.filter((u) => u.email !== email)
      localStorage.setItem('users', JSON.stringify(this.users))
      // also remove ratings by this email
      this.ratings = this.ratings.filter((r) => r.email !== email)
      localStorage.setItem('ratings', JSON.stringify(this.ratings))
      this.loadUsers()
      this.loadRatings()
    },
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
.btn-danger {
  background: #e25555;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
}
.btn-danger:hover {
  opacity: 0.9;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  padding: 8px 6px;
  text-align: left;
}
</style>
