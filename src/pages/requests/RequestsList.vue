<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError"
      ><p>{{ error }}</p></base-dialog
    >
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests">
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';

export default {
  components: {
    RequestItem,
    BaseDialog,
    BaseSpinner,
  },
  data() {
    return {
      error: null,
      isLoading: true,
    };
  },
  created() {
    this.getRequests();
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return !this.isLoading && this.$store.getters['requests/hasRequests'];
    },
  },
  methods: {
    async getRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/getRequests');
      } catch (error) {
        this.error = error.message || 'Something went wrong.';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
