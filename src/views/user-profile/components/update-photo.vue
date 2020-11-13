<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
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
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      crop(event) {
        console.log(event.detail.x)
        console.log(event.detail.width)
      }
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
