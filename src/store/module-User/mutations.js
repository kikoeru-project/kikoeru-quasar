const mutations = {
  INIT (state, user) {
    state.name = user.name
    state.group = user.group
  },

  SET_AUTH (state, flag) {
    state.auth = flag
  },

  SET_REG (state, flag) {
    state.reg = flag;
  }
}

export default mutations
