export default {
  computed: {
    color() {
      return this.$q.dark.isActive ? 'black' : 'white'
    },
    textColor() {
      return this.$q.dark.isActive ? 'white' : 'black'
      // return this.$q.dark.isActive ? 'light' : 'dark'
    },
    classTextColor() {
      return this.$q.dark.isActive ? 'text-white' : 'text-black'
    },
    classBackgroundColor() {
      return this.$q.dark.isActive ? 'bg-black' : 'bg-white'
    }
  }
}
