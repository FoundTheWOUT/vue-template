<template>
  <div>
    <h1>Masonry</h1>
    <div id="container" :colNum="colNum" ref="container">
      <div
        class="post"
        :id="index"
        v-for="(card, index) in this.renderList"
        :key="index"
        :style="post[index]"
      >
        <img :src="card.download_url" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
const List = require("../assets/data_picsum.json");
// const postWidth ;
const COL = 4;

export default {
  data() {
    return {
      colNum: COL,
      renderList: [],
      currenderList: [],
      startIndex: 0,
      post: [], // 对应图片的样式
      postItemHeight: [],
      renderEach: 20,
      renderTimes: 0,
      topMargin: 5,
    };
  },
  computed: {
    bodyWidth: function () {
      return document.body.clientWidth;
    },
    postWidth: function () {
      return this.bodyWidth / this.colNum;
    },
  },
  beforeMount() {
    this.getRenderList();
  },
  mounted() {
    window.addEventListener("scroll", this.loadMore);
  },
  methods: {
    // 获得文章
    getRenderList() {
      let renderList = List.slice(
        this.startIndex,
        this.renderEach + this.startIndex
      );
      // 没有文章了
      if (renderList == "") {
        console.log("没有了");
        return;
      }
      // 获取当前渲染列表，用于获得当前列表图片高度
      this.currenderList = renderList;
      // 合并列表到页面渲染列表
      let thisRenderList = this.renderList.concat(renderList);
      // Vue无法直接操作数组的曲线救国
      this.renderList = thisRenderList;
      // 重设开始索引
      this.startIndex += this.renderEach;
      this.renderTimes++;
      // 渲染页面
      this.render();
    },
    loadMore() {
      let viewHeight = document.documentElement.clientHeight;
      let scrollTop = document.documentElement.scrollTop;
      let pageHeight = document.documentElement.scrollHeight;
      // 触底渲染更多
      if (pageHeight - scrollTop - viewHeight == 0) {
        this.getRenderList();
      }
    },
    render() {
      this.currenderList.forEach((element, index) => {
        // console.log(element);
        //* 渲染第一行图片
        if (index < this.colNum && this.renderTimes == 1) {
          let left = this.postWidth * index;
          let obj = {
            left: left + "px",
            width: this.postWidth + "px",
          };
          this.postItemHeight.push(
            element.height * (this.postWidth / element.width) + this.topMargin
          );
          this.post.push(obj);
        } else {
          //* 第二行图片
          // 当前图片在row列
          let row = index % this.colNum;
          let left = this.postWidth * row;
          //* 获得与上照片的距离
          let top = this.postItemHeight[row];
          let obj = {
            left: left + "px",
            top: top + "px",
            width: this.postWidth + "px",
          };
          this.post.push(obj);
          //! 更新高度
          this.postItemHeight[row] +=
            element.height * (this.postWidth / element.width) + this.topMargin;
        }
      });
    },
  },
};
</script>

<style>
#container {
  position: relative;
  width: 100%;
  height: auto;
}

.post {
  text-align: center;
  position: absolute;
  overflow: hidden;
}

img {
  width: 100%;
  margin: 5px;
}
</style>
