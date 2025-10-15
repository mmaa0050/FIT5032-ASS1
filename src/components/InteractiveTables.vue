<template>
  <div class="container mt-5">
    <!-- Users Table -->
    <h2>Users Table</h2>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>
            ID
            <input
              v-model="userFilters.id"
              placeholder="Search ID"
              class="form-control form-control-sm"
            />
          </th>
          <th>
            Username
            <input
              v-model="userFilters.username"
              placeholder="Search Username"
              class="form-control form-control-sm"
            />
          </th>
          <th>
            Email
            <input
              v-model="userFilters.email"
              placeholder="Search Email"
              class="form-control form-control-sm"
            />
          </th>
          <th>
            Role
            <input
              v-model="userFilters.role"
              placeholder="Search Role"
              class="form-control form-control-sm"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in paginatedUsers" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.username }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.role }}</td>
        </tr>
      </tbody>
    </table>
    <!-- Users Pagination -->
    <div class="pagination mt-2">
      <button
        class="btn btn-sm btn-outline-primary me-1"
        :disabled="userPage === 1"
        @click="userPage--"
      >
        Prev
      </button>
      <span>Page {{ userPage }} / {{ totalUserPages }}</span>
      <button
        class="btn btn-sm btn-outline-primary ms-1"
        :disabled="userPage === totalUserPages"
        @click="userPage++"
      >
        Next
      </button>
    </div>

    <!-- Emails Table -->
    <h2 class="mt-5">Emails Table</h2>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>
            ID
            <input
              v-model="emailFilters.id"
              placeholder="Search ID"
              class="form-control form-control-sm"
            />
          </th>
          <th>
            Recipient
            <input
              v-model="emailFilters.to"
              placeholder="Search Recipient"
              class="form-control form-control-sm"
            />
          </th>
          <th>
            Subject
            <input
              v-model="emailFilters.subject"
              placeholder="Search Subject"
              class="form-control form-control-sm"
            />
          </th>
          <th>
            Date Sent
            <input
              v-model="emailFilters.date"
              placeholder="Search Date"
              class="form-control form-control-sm"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in paginatedEmails" :key="e.id">
          <td>{{ e.id }}</td>
          <td>{{ e.to }}</td>
          <td>{{ e.subject }}</td>
          <td>{{ e.date }}</td>
        </tr>
      </tbody>
    </table>
    <!-- Emails Pagination -->
    <div class="pagination mt-2">
      <button
        class="btn btn-sm btn-outline-primary me-1"
        :disabled="emailPage === 1"
        @click="emailPage--"
      >
        Prev
      </button>
      <span>Page {{ emailPage }} / {{ totalEmailPages }}</span>
      <button
        class="btn btn-sm btn-outline-primary ms-1"
        :disabled="emailPage === totalEmailPages"
        @click="emailPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const users = ref([])
    const emails = ref([])

    // 分页控制
    const userPage = ref(1)
    const emailPage = ref(1)
    const pageSize = 10

    // 搜索过滤
    const userFilters = ref({ id: '', username: '', email: '', role: '' })
    const emailFilters = ref({ id: '', to: '', subject: '', date: '' })

    // Mock 数据生成
    const generateMockData = () => {
      users.value = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        username: `User${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: i % 2 === 0 ? 'Admin' : 'User',
      }))

      emails.value = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        to: `user${i + 1}@example.com`,
        subject: `Welcome Email ${i + 1}`,
        date: new Date().toLocaleDateString(),
      }))
    }

    onMounted(generateMockData)

    // Users filtered & paginated
    const filteredUsers = computed(() =>
      users.value.filter(
        (u) =>
          u.id.toString().includes(userFilters.value.id) &&
          u.username.toLowerCase().includes(userFilters.value.username.toLowerCase()) &&
          u.email.toLowerCase().includes(userFilters.value.email.toLowerCase()) &&
          u.role.toLowerCase().includes(userFilters.value.role.toLowerCase()),
      ),
    )

    const totalUserPages = computed(() => Math.ceil(filteredUsers.value.length / pageSize))

    const paginatedUsers = computed(() =>
      filteredUsers.value.slice((userPage.value - 1) * pageSize, userPage.value * pageSize),
    )

    // Emails filtered & paginated
    const filteredEmails = computed(() =>
      emails.value.filter(
        (e) =>
          e.id.toString().includes(emailFilters.value.id) &&
          e.to.toLowerCase().includes(emailFilters.value.to.toLowerCase()) &&
          e.subject.toLowerCase().includes(emailFilters.value.subject.toLowerCase()) &&
          e.date.includes(emailFilters.value.date),
      ),
    )

    const totalEmailPages = computed(() => Math.ceil(filteredEmails.value.length / pageSize))

    const paginatedEmails = computed(() =>
      filteredEmails.value.slice((emailPage.value - 1) * pageSize, emailPage.value * pageSize),
    )

    return {
      users,
      emails,
      userPage,
      emailPage,
      pageSize,
      userFilters,
      emailFilters,
      paginatedUsers,
      paginatedEmails,
      totalUserPages,
      totalEmailPages,
    }
  },
}
</script>

<style scoped>
.container {
  max-width: 900px;
}
.table th,
.table td {
  padding: 6px 10px;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination span {
  margin: 0 10px;
  font-weight: bold;
}
</style>
