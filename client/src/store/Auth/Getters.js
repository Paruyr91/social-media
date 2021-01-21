// Getters

export default {
  IsAuthenticated (state) {
    const { userToken, expTime } = state
    return !!userToken && expTime > Date.now()
  }
}
