<template>
  <div class="d-flex justify-content-center align-items-center vh-100 login-bg">
    <div class="card shadow-lg p-4 text-dark login-card">
      <h2 class="text-center mb-4 text-gradient">Women's Health</h2>

      <!-- Error Message -->
      <div v-if="errorMsg" role="alert" class="alert alert-danger">
        {{ errorMsg }}
      </div>

      <form @submit.prevent="login" aria-label="Login form">
        <!-- Email -->
        <div class="mb-3">
          <label for="login-email" class="form-label fw-bold">Email</label>
          <input
            id="login-email"
            type="email"
            v-model="email"
            class="form-control form-control-lg"
            placeholder="Enter your email"
            required
            aria-required="true"
          />
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label for="login-password" class="form-label fw-bold">Password</label>
          <input
            id="login-password"
            type="password"
            v-model="password"
            class="form-control form-control-lg"
            placeholder="Enter your password"
            required
            minlength="6"
            aria-required="true"
          />
        </div>

        <!-- Role -->
        <div class="mb-3">
          <label for="login-role" class="form-label fw-bold">Role</label>
          <select
            id="login-role"
            v-model="role"
            class="form-control form-control-lg"
            required
            aria-required="true"
            aria-label="Select role"
          >
            <option disabled value="">Select role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <!-- Login Button -->
        <button type="submit" class="btn btn-login w-100 mt-3" aria-label="Login">Login</button>
      </form>

      <!-- Link to Register -->
      <p class="text-center mt-3">
        Don’t have an account?
        <a
          href="#"
          class="register-link"
          @click.prevent="$emit('go-register')"
          aria-label="Go to register page"
        >
          Sign Up
        </a>
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
      errorMsg: '',
    }
  },
  methods: {
    async login() {
      this.errorMsg = ''
      if (!this.email || !this.password || !this.role) {
        this.errorMsg = 'Please fill in all fields.'
        return
      }

      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password)
        const user = userCredential.user

        // Check stored role
        const savedRole = localStorage.getItem('userRole')
        if (savedRole && savedRole !== this.role) {
          this.errorMsg = 'Incorrect role selection. Please select the correct role.'
          return
        }

        alert(`Welcome back, ${user.displayName || 'User'}! You are logged in as ${this.role}.`)

        // Reset form
        this.email = ''
        this.password = ''
        this.role = ''

        this.$emit('login-success', { email: user.email, role: this.role })
      } catch (error) {
        this.errorMsg = 'Invalid email or password: ' + error.message
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
.form-control {
  border: 2px solid #333; /* 高对比边框 */
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
.alert {
  padding: 10px 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  background-color: #f8d7da;
  color: #842029;
}
</style>
