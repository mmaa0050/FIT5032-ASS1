<template>
  <div class="rating-card">
    <h3>Rate this app</h3>
    <div class="mb-2">
      <label class="form-label">Your rating</label>
      <select v-model.number="rating" class="form-control" :disabled="hasRated">
        <option disabled value="">Choose</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }} ★</option>
      </select>
    </div>
    <button class="btn btn-login w-100" @click="submitRating" :disabled="!rating || hasRated">
      {{ hasRated ? 'Thanks for rating' : 'Submit Rating' }}
    </button>

    <p class="mt-3">
      Average rating: <strong>{{ averageRatingDisplay }}</strong>
    </p>
    <p v-if="totalVotes">Total votes: {{ totalVotes }}</p>
  </div>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rating: null,
      ratings: [], // { email, rating }
    }
  },
  computed: {
    averageRating() {
      if (!this.ratings.length) return 0
      const sum = this.ratings.reduce((s, r) => s + r.rating, 0)
      return sum / this.ratings.length
    },
    averageRatingDisplay() {
      return this.averageRating ? this.averageRating.toFixed(1) + ' / 5' : 'No ratings yet'
    },
    totalVotes() {
      return this.ratings.length
    },
    hasRated() {
      return this.ratings.some((r) => r.email === this.currentUser.email)
    },
  },
  mounted() {
    this.loadRatings()
  },
  methods: {
    loadRatings() {
      this.ratings = JSON.parse(localStorage.getItem('ratings') || '[]')
    },
    submitRating() {
      if (!this.rating) {
        alert('Please choose a rating before submitting.')
        return
      }
      // prevent double rating by same email: replace if exists
      const idx = this.ratings.findIndex((r) => r.email === this.currentUser.email)
      if (idx >= 0) {
        this.ratings[idx].rating = this.rating
      } else {
        this.ratings.push({ email: this.currentUser.email, rating: this.rating })
      }
      localStorage.setItem('ratings', JSON.stringify(this.ratings))
      alert('Thanks for your rating!')
      this.loadRatings()
    },
  },
}
</script>

<style scoped>
.rating-card {
  max-width: 480px;
  margin: 16px auto;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}
.btn-login {
  background: linear-gradient(45deg, #ff6f91, #ff9671, #ffc75f);
  border: none;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-radius: 8px;
}
</style>
