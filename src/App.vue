<template>
  <div>
    <Login v-if="currentPage === 'login'" @go-register="currentPage = 'register'" />
    <Register v-else @go-login="currentPage = 'login'" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

export default {
  components: { Login, Register },
  setup() {
    const currentPage = ref('login')
    return { currentPage }
  },
}
</script>
