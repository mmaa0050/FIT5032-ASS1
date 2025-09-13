<template>
  <div class="d-flex justify-content-center align-items-center vh-100 login-bg">
    <div class="card shadow-lg p-4 text-dark login-card">
      <h2 class="text-center mb-4 text-gradient">Women's Health</h2>

      <form @submit.prevent="register">
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
            placeholder="Enter your password (min 6 chars)"
            required
            minlength="6"
          />
          <small class="form-text text-muted"
            >It is recommended to include uppercase letters, numbers, or special characters to
            enhance password strength.</small
          >
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

        <!-- Register Button -->
        <button type="submit" class="btn btn-login w-100 mt-3">Register</button>
      </form>

      <!-- Link to Login -->
      <p class="text-center mt-3">
        Already have an account?
        <a href="#" class="register-link" @click.prevent="$emit('go-login')">Login</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      role: '',
    }
  },
  methods: {
    sanitizeInput(str) {
      if (!str) return ''
      return String(str).replace(/[<>]/g, '').trim()
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    },
    async hashPassword(password) {
      const enc = new TextEncoder()
      const buff = enc.encode(password)
      const hashBuffer = await crypto.subtle.digest('SHA-256', buff)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
      return hashHex
    },
    async register() {
      this.username = this.sanitizeInput(this.username)
      this.email = this.sanitizeInput(this.email).toLowerCase()
      this.password = this.sanitizeInput(this.password)

      if (!this.username || !this.email || !this.password || !this.role) {
        alert('Please fill in all fields.')
        return
      }

      if (!this.validateEmail(this.email)) {
        alert('Please enter a valid email address.')
        return
      }

      if (this.password.length < 6) {
        alert('Password must be at least 6 characters.')
        return
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]')

      if (users.find((u) => u.email === this.email)) {
        alert('This email is already registered.')
        return
      }

      // hash password
      const passwordHash = await this.hashPassword(this.password)

      users.push({
        username: this.username,
        email: this.email,
        passwordHash: passwordHash,
        role: this.role,
      })
      localStorage.setItem('users', JSON.stringify(users))

      alert(`User ${this.username} registered successfully as ${this.role}!`)

      this.username = ''
      this.email = ''
      this.password = ''
      this.role = ''
      this.$emit('go-login')
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
