export default {
  requests(state, _1, _2, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((request) => request.coachId === coachId);
  },
  hasRequests(_1, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
