// Mutations

export default {
  WindowWidth (state, payload) {
    const width = parseInt(payload, 10)

    if (width) {
      state.windowWidth = width
    }
  }
}
