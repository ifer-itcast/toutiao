<template>
  <div class="channel-edit">
    <!-- 我的频道标题 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini" @click="isEdit = !isEdit"
        >{{isEdit ? '完成' : '编辑'}}</van-button
      >
    </van-cell>
    <!-- 我的频道内容 -->
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon v-show="isEdit && !fixedChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
        <!-- 对象中的 key 代表要作用的 css 类名 -->
        <span class="text" slot="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐标题 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!-- 频道推荐内容 -->
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fixedChannels: [0] // 固定频道，不允许删除
    }
  },
  computed: {
    /* recommendChannels() {
      const channels = []
      this.allChannels.forEach(channel => {
        // find 找到符合条件的第一个就返回，后面就不再查找！
        const ret = this.myChannels.find(
          myChannel => myChannel.id === channel.id
        )
        // 我的频道没有找到 channel，则收集
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    } */
    recommendChannels() {
      // filter 把符合条件的元素返回到新数组
      return this.allChannels.filter(channel => {
        // find 找到符合条件的第一个就返回，后面就不再查找！
        return !this.myChannels.find(myChannel => myChannel.id === channel.id)
      })
    }
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch {
        this.$toast('数据获取失败')
      }
    },
    onAddChannel(channel) {
      this.myChannels.push(channel)
    },
    onMyChannelClick(channel, index) {
      // 如果是编辑状态，删除频道
      if (this.isEdit) {

      } else {
        // 非编辑状态，切换频道
        this.$emit('update-active', index)
      }
    }
  }
}

// 代码测试
/* const allChannels = [{ "id": 0, "name": "开发者资讯" }, { "id": 1, "name": "666" }];
const myChannels = [{ "id": 0, "name": "开发者资讯" }, { "id": 6, "name": "css" }];
const r = allChannels.filter(channel => {
  return !myChannels.find(myChannel => myChannel.id === channel.id)
});
console.log(r); */
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  // 编辑按钮
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
