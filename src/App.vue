<template>
  <div>
    <Login
      v-if="currentPage === 'login'"
      @go-register="currentPage = 'register'"
      @login-success="handleLoginSuccess"
    />

    <Register v-else-if="currentPage === 'register'" @go-login="currentPage = 'login'" />

    <AdminDashboard
      v-else-if="currentPage === 'admin'"
      :current-user="currentUser"
      :show-map="showMap"
      @toggle-map="toggleMap"
      @logout="logout"
    />

    <UserDashboard
      v-else-if="currentPage === 'user'"
      :current-user="currentUser"
      :show-map="showMap"
      @toggle-map="toggleMap"
      @logout="logout"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import AdminDashboard from './components/AdminDashboard.vue'
import UserDashboard from './components/UserDashboard.vue'

export default {
  components: { Login, Register, AdminDashboard, UserDashboard },
  setup() {
    const currentPage = ref('login') // 'login' | 'register' | 'admin' | 'user'
    const currentUser = ref(null)
    const showMap = ref(false)

    const handleLoginSuccess = (user) => {
      currentUser.value = user
      if (user.role === 'Admin') {
        currentPage.value = 'admin'
      } else {
        currentPage.value = 'user'
      }
    }

    const logout = () => {
      currentUser.value = null
      currentPage.value = 'login'
      showMap.value = false
    }

    const toggleMap = () => {
      showMap.value = !showMap.value
    }

    return {
      currentPage,
      currentUser,
      showMap,
      handleLoginSuccess,
      logout,
      toggleMap,
    }
  },
}
</script>

<style scoped>
.dashboard {
  text-align: center;
  padding: 50px;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #ff6f61;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background: #ff8a75;
}
</style>
