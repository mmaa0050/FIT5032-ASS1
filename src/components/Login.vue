<template>
  <div class="d-flex justify-content-center align-items-center vh-100 login-bg">
    <div class="card shadow-lg p-4 text-dark login-card">
      <h2 class="text-center mb-4 text-gradient">Women's Health</h2>
      <form @submit.prevent="login">
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

        <!-- Role -->
        <div class="mb-3">
          <label class="form-label fw-bold">Role</label>
          <select v-model="role" class="form-control form-control-lg" required>
            <option disabled value="">Select role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <!-- Login Button -->
        <button type="submit" class="btn btn-login w-100 mt-3">Login</button>
      </form>

      <!-- Link to Register -->
      <p class="text-center mt-3">
        Don’t have an account?
        <a href="#" class="register-link" @click.prevent="$emit('go-register')">Sign Up</a>
      </p>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebaseConfig'

export default {
  data() {
    return {
      email: '',
      password: '',
      role: '',
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.password || !this.role) {
        alert('Please fill in all fields.')
        return
      }

      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password)
        const user = userCredential.user

        // Check stored role
        const savedRole = localStorage.getItem('userRole')
        if (savedRole !== this.role) {
          alert('Incorrect role selection. Please select the correct role.')
          return
        }

        // Correct template string
        alert(`Welcome back, ${user.displayName || 'User'}! You are logged in as ${this.role}.`)

        // Reset form
        this.email = ''
        this.password = ''
        this.role = ''

        this.$emit('login-success', { email: user.email, role: this.role })
      } catch (error) {
        alert('Invalid email or password: ' + error.message)
      }
    },
  },
}
</script>

<style scoped>
.login-bg {
  background: linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb);
}
.login-card {
  width: 90%;
  max-width: 380px;
  border-radius: 20px;
  background: #fff;
}
.text-gradient {
  background: linear-gradient(45deg, #ff6f91, #ff9671, #ffc75f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}
.btn-login {
  background: linear-gradient(45deg, #ff6f91, #ff9671, #ffc75f);
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 12px;
  border-radius: 30px;
  transition: 0.3s;
}
.btn-login:hover {
  opacity: 0.85;
}
.register-link {
  color: #ff6f91;
  font-weight: 600;
  text-decoration: none;
}
.register-link:hover {
  text-decoration: underline;
}
</style>
