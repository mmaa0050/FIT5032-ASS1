<template>
  <div class="container mt-5">
    <!-- Users Table -->
    <h2>Users Table</h2>
    <div class="d-flex justify-content-end mb-2">
      <button class="btn btn-sm btn-success me-2" @click="exportUsersCSV">Export Users CSV</button>
      <button class="btn btn-sm btn-success" @click="exportUsersPDF">Export Users PDF</button>
    </div>
    <table class="table table-striped table-bordered" aria-label="Users table">
      <caption>
        List of users with ID, username, email, and role
      </caption>
      <thead>
        <tr>
          <th
            scope="col"
            @click="sortUsers('id')"
            :aria-sort="getUserSort('id')"
            tabindex="0"
            @keyup.enter="sortUsers('id')"
          >
            ID
            <input
              id="search-user-id"
              v-model="userFilters.id"
              placeholder="Search ID"
              class="form-control form-control-sm"
              aria-label="Search user ID"
            />
          </th>
          <th
            scope="col"
            @click="sortUsers('username')"
            :aria-sort="getUserSort('username')"
            tabindex="0"
            @keyup.enter="sortUsers('username')"
          >
            Username
            <input
              id="search-username"
              v-model="userFilters.username"
              placeholder="Search Username"
              class="form-control form-control-sm"
              aria-label="Search username"
            />
          </th>
          <th
            scope="col"
            @click="sortUsers('email')"
            :aria-sort="getUserSort('email')"
            tabindex="0"
            @keyup.enter="sortUsers('email')"
          >
            Email
            <input
              id="search-email"
              v-model="userFilters.email"
              placeholder="Search Email"
              class="form-control form-control-sm"
              aria-label="Search email"
            />
          </th>
          <th
            scope="col"
            @click="sortUsers('role')"
            :aria-sort="getUserSort('role')"
            tabindex="0"
            @keyup.enter="sortUsers('role')"
          >
            Role
            <input
              id="search-role"
              v-model="userFilters.role"
              placeholder="Search Role"
              class="form-control form-control-sm"
              aria-label="Search role"
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
        <tr v-if="paginatedUsers.length === 0">
          <td colspan="4" class="text-center">No users found</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination mt-2" role="navigation" aria-label="Users table pagination">
      <button
        class="btn btn-sm btn-outline-primary me-1"
        :disabled="userPage === 1"
        @click="userPage--"
        :aria-disabled="userPage === 1"
      >
        Prev
      </button>
      <span>Page {{ userPage }} / {{ totalUserPages }}</span>
      <button
        class="btn btn-sm btn-outline-primary ms-1"
        :disabled="userPage === totalUserPages"
        @click="userPage++"
        :aria-disabled="userPage === totalUserPages"
      >
        Next
      </button>
    </div>

    <!-- Emails Table -->
    <h2 class="mt-5">Emails Table</h2>
    <div class="d-flex justify-content-end mb-2">
      <button class="btn btn-sm btn-success me-2" @click="exportEmailsCSV">
        Export Emails CSV
      </button>
      <button class="btn btn-sm btn-success" @click="exportEmailsPDF">Export Emails PDF</button>
    </div>
    <table class="table table-striped table-bordered" aria-label="Emails table">
      <caption>
        List of sent emails with ID, recipient, subject, and date
      </caption>
      <thead>
        <tr>
          <th
            scope="col"
            @click="sortEmails('id')"
            :aria-sort="getEmailSort('id')"
            tabindex="0"
            @keyup.enter="sortEmails('id')"
          >
            ID
            <input
              id="search-email-id"
              v-model="emailFilters.id"
              placeholder="Search ID"
              class="form-control form-control-sm"
              aria-label="Search email ID"
            />
          </th>
          <th
            scope="col"
            @click="sortEmails('to')"
            :aria-sort="getEmailSort('to')"
            tabindex="0"
            @keyup.enter="sortEmails('to')"
          >
            Recipient
            <input
              id="search-email-to"
              v-model="emailFilters.to"
              placeholder="Search Recipient"
              class="form-control form-control-sm"
              aria-label="Search recipient"
            />
          </th>
          <th
            scope="col"
            @click="sortEmails('subject')"
            :aria-sort="getEmailSort('subject')"
            tabindex="0"
            @keyup.enter="sortEmails('subject')"
          >
            Subject
            <input
              id="search-email-subject"
              v-model="emailFilters.subject"
              placeholder="Search Subject"
              class="form-control form-control-sm"
              aria-label="Search subject"
            />
          </th>
          <th
            scope="col"
            @click="sortEmails('date')"
            :aria-sort="getEmailSort('date')"
            tabindex="0"
            @keyup.enter="sortEmails('date')"
          >
            Date Sent
            <input
              id="search-email-date"
              v-model="emailFilters.date"
              placeholder="Search Date"
              class="form-control form-control-sm"
              aria-label="Search date"
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
        <tr v-if="paginatedEmails.length === 0">
          <td colspan="4" class="text-center">No emails found</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination mt-2" role="navigation" aria-label="Emails table pagination">
      <button
        class="btn btn-sm btn-outline-primary me-1"
        :disabled="emailPage === 1"
        @click="emailPage--"
        :aria-disabled="emailPage === 1"
      >
        Prev
      </button>
      <span>Page {{ emailPage }} / {{ totalEmailPages }}</span>
      <button
        class="btn btn-sm btn-outline-primary ms-1"
        :disabled="emailPage === totalEmailPages"
        @click="emailPage++"
        :aria-disabled="emailPage === totalEmailPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  setup() {
    const users = ref([])
    const emails = ref([])

    const userPage = ref(1)
    const emailPage = ref(1)
    const pageSize = 10

    const userFilters = ref({ id: '', username: '', email: '', role: '' })
    const emailFilters = ref({ id: '', to: '', subject: '', date: '' })

    const userSort = ref({ key: '', order: '' })
    const emailSort = ref({ key: '', order: '' })

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

    // Users filtered & sorted
    const filteredUsers = computed(() => {
      let filtered = users.value.filter(
        (u) =>
          u.id.toString().includes(userFilters.value.id) &&
          u.username.toLowerCase().includes(userFilters.value.username.toLowerCase()) &&
          u.email.toLowerCase().includes(userFilters.value.email.toLowerCase()) &&
          u.role.toLowerCase().includes(userFilters.value.role.toLowerCase()),
      )
      const { key, order } = userSort.value
      if (!key) return filtered
      return filtered.sort((a, b) => {
        if (typeof a[key] === 'number') return (a[key] - b[key]) * (order === 'asc' ? 1 : -1)
        return a[key].localeCompare(b[key]) * (order === 'asc' ? 1 : -1)
      })
    })

    const totalUserPages = computed(() => Math.ceil(filteredUsers.value.length / pageSize))
    const paginatedUsers = computed(() =>
      filteredUsers.value.slice((userPage.value - 1) * pageSize, userPage.value * pageSize),
    )

    // Emails filtered & sorted
    const filteredEmails = computed(() => {
      let filtered = emails.value.filter(
        (e) =>
          e.id.toString().includes(emailFilters.value.id) &&
          e.to.toLowerCase().includes(emailFilters.value.to.toLowerCase()) &&
          e.subject.toLowerCase().includes(emailFilters.value.subject.toLowerCase()) &&
          e.date.includes(emailFilters.value.date),
      )
      const { key, order } = emailSort.value
      if (!key) return filtered
      return filtered.sort((a, b) => {
        if (typeof a[key] === 'number') return (a[key] - b[key]) * (order === 'asc' ? 1 : -1)
        return a[key].localeCompare(b[key]) * (order === 'asc' ? 1 : -1)
      })
    })

    const totalEmailPages = computed(() => Math.ceil(filteredEmails.value.length / pageSize))
    const paginatedEmails = computed(() =>
      filteredEmails.value.slice((emailPage.value - 1) * pageSize, emailPage.value * pageSize),
    )

    // Sorting handlers
    const sortUsers = (key) => {
      if (userSort.value.key === key) {
        userSort.value.order = userSort.value.order === 'asc' ? 'desc' : 'asc'
      } else {
        userSort.value.key = key
        userSort.value.order = 'asc'
      }
    }
    const getUserSort = (key) => {
      if (userSort.value.key !== key) return 'none'
      return userSort.value.order === 'asc' ? 'ascending' : 'descending'
    }

    const sortEmails = (key) => {
      if (emailSort.value.key === key) {
        emailSort.value.order = emailSort.value.order === 'asc' ? 'desc' : 'asc'
      } else {
        emailSort.value.key = key
        emailSort.value.order = 'asc'
      }
    }
    const getEmailSort = (key) => {
      if (emailSort.value.key !== key) return 'none'
      return emailSort.value.order === 'asc' ? 'ascending' : 'descending'
    }

    // CSV Export
    const exportUsersCSV = () => {
      const rows = filteredUsers.value.map((u) => [u.id, u.username, u.email, u.role])
      let csvContent = 'data:text/csv;charset=utf-8,ID,Username,Email,Role\n'
      rows.forEach((r) => (csvContent += r.join(',') + '\n'))
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', 'users_table.csv')
      link.click()
    }

    const exportEmailsCSV = () => {
      const rows = filteredEmails.value.map((e) => [e.id, e.to, e.subject, e.date])
      let csvContent = 'data:text/csv;charset=utf-8,ID,Recipient,Subject,Date\n'
      rows.forEach((r) => (csvContent += r.join(',') + '\n'))
      const link = document.createElement('a')
      link.setAttribute('href', encodeURI(csvContent))
      link.setAttribute('download', 'emails_table.csv')
      link.click()
    }

    // PDF Export
    const exportUsersPDF = () => {
      const doc = new jsPDF()
      doc.text('Users Table', 14, 16)
      const columns = ['ID', 'Username', 'Email', 'Role']
      const rows = filteredUsers.value.map((u) => [u.id, u.username, u.email, u.role])
      doc.autoTable({ startY: 20, head: [columns], body: rows, styles: { fontSize: 10 } })
      doc.save('users_table.pdf')
    }

    const exportEmailsPDF = () => {
      const doc = new jsPDF()
      doc.text('Emails Table', 14, 16)
      const columns = ['ID', 'Recipient', 'Subject', 'Date Sent']
      const rows = filteredEmails.value.map((e) => [e.id, e.to, e.subject, e.date])
      doc.autoTable({ startY: 20, head: [columns], body: rows, styles: { fontSize: 10 } })
      doc.save('emails_table.pdf')
    }

    return {
      userPage,
      emailPage,
      totalUserPages,
      totalEmailPages,
      userFilters,
      emailFilters,
      paginatedUsers,
      paginatedEmails,
      sortUsers,
      sortEmails,
      getUserSort,
      getEmailSort,
      exportUsersCSV,
      exportEmailsCSV,
      exportUsersPDF,
      exportEmailsPDF,
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
