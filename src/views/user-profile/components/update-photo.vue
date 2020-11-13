<template>
  <img :src="img" alt="" />
</template>

<script>
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.img {
  display: block;
  max-width: 100%;
}
</style>
