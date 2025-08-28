<template>
  <div
    class="d-flex justify-content-center align-items-center vh-100"
    style="background-color: #fff"
  >
    <div
      class="card shadow-lg p-4 text-dark"
      style="width: 380px; border-radius: 10px; background-color: #f8f8f8"
    >
      <h2 class="text-center mb-4" style="color: #333">Register</h2>
      <p class="text-center text-muted mb-4">Create your account</p>

      <form @submit.prevent="registerUser">
        <!-- Username -->
        <div class="mb-3">
          <label class="form-label fw-bold">Username</label>
          <input
            type="text"
            v-model="username"
            class="form-control form-control-lg"
            placeholder="Enter your username"
            required
          />
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label class="form-label fw-bold">Email</label>
          <input
            type="email"
            v-model="email"
            class="form-control form-control-lg"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label class="form-label fw-bold">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control form-control-lg"
            placeholder="Enter your password"
            required
            minlength="6"
          />
        </div>

        <!-- Register Button -->
        <button
          type="submit"
          class="btn w-100 mt-3"
          style="background-color: #333; color: white; border-radius: 5px; padding: 10px"
        >
          Register
        </button>
      </form>

      <!-- Link to Login -->
      <p class="text-center mt-3" style="font-size: 14px">
        Already have an account?
        <a href="#" style="color: #333; text-decoration: none" @click.prevent="$emit('go-login')"
          >Login</a
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')

function registerUser() {
  if (!username.value || !email.value || !password.value) {
    alert('Please fill all fields')
    return
  }
  console.log('Registered:', username.value, email.value, password.value)
  alert(`User ${username.value} registered successfully!`)
  username.value = ''
  email.value = ''
  password.value = ''
}
</script>

<style scoped></style>
