Component({
  data: { counter: 0 },
  methods: {
    plusOne(e) {
      this.setData({ counter: this.data.counter + 1 });
    },
  },
})