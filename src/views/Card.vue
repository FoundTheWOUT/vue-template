<template>
  <div class="bg">
    <h3>{{ cardList.title }}</h3>
    <div
      :id="card.id"
      class="card"
      v-for="card in cardList"
      :key="card.id"
      :class="{ active: activeArr[card.id] }"
      :style="transformStyle[card.id]"
    >
      <img :id="card.id" :src="card.img" @click="expand" />
      <h4>{{ card.title }}</h4>
      <div class="content-wrapper" :style="contentWrapperHeight" ref="content">
        <p>{{ card.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const card = require("../card.json");
const cardList = card.cardList;
let cardLength;
export default {
  // props: ["cardList"]
  beforeMount() {
    cardLength = this.cardList.length;
    let activeArr = new Array(cardLength);
    activeArr.fill(0);
    this.activeArr = activeArr;
  },
  data() {
    return {
      cardList: cardList,
      isActive: false,
      curActiveID: null,
      // 1展开，0关闭
      activeArr: [],
      translateY: 0,
      scale: 1,
      contentWrapperHeight: {
        height: "0px",
      },
    };
  },
  computed: {
    transformStyle: function (e) {
      // 移动数组，每个index对应相对的card
      let transform = new Array(cardLength);
      let id = e.curActiveID;
      let transformObj = {
        transform:
          "translateY(" + this.translateY + "px)  scale(" + this.scale + ")",
      };

      // is active --> rm transform
      if (!this.isActive) {
        return transform;
      }
      transform[id] = transformObj;
      return transform;
    },
  },
  methods: {
    expand: function (e) {
      let id = e.target.id;
      let toTop = e.target.getBoundingClientRect().top;
      let imgHeight = 320 * this.scale;
      let titleHeight = 45 * this.scale;

      // 激活状态且点击卡片非展开卡片无响应
      if (this.isActive && id != this.curActiveID) {
        return;
      }

      if (!this.activeArr[id]) {
        // expand card
        // vue2 数组更新不能直接更新
        // this.activeArr[id] = 1;

        // add expand class
        this.activeArr.splice(id, 1, 1);
        this.scale = 1.2;
        this.translateY = -toTop;
        // target curID
        this.curActiveID = id;
        // change active statu
        this.isActive = true;

        // 更新内容栏高度
        this.contentWrapperHeight = {
          height: `${
            (window.innerHeight - imgHeight - titleHeight - 100) / this.scale
          }px`,
        };
        // 正文滚动停止
        document.getElementsByTagName("body")[0].className = "active";
      } else {
        // close card
        // this.activeArr[id] = 0;

        // rm expand calss
        this.activeArr.splice(id, 1, 0);
        this.scale = 1;
        this.curActiveID = null;
        this.isActive = false;

        this.contentWrapperHeight = {
          height: `0px`,
        };
        document.body.removeAttribute("class");
      }
    },
  },
};
</script>

<style>
body.active {
  overflow: hidden;
}

.bg {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: blue; */
}

.card {
  height: 280px;
  width: 420px;
  margin: 10px;
  border-radius: 1em;
  box-shadow: 0 0.2rem 2rem rgba(0, 0, 0, 0.1);
  transition: 0.3s all;
}

.card img {
  display: block;
  /* card没有overflow属性，图片上两个角覆盖圆角 */
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  height: 226px;
  width: 100%;
  object-fit: cover;
  transition: 0.3s all;
}

.card h4 {
  margin: -1px;
  /* height: 45px; */
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.8rem 1.2rem;
  background-color: #fff;
  line-height: 2rem;
  letter-spacing: -0.5px;
  /* 不影响圆角 */
  padding-bottom: 0;
}

.card .content-wrapper {
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition: 0.3s all;
}

.card .content-wrapper .content {
  padding: 0 1.2rem;
  background-color: #fff;
}

/* actice class */
.card.active {
  z-index: 999;
  border-radius: 0;
  transform-origin: 50% 0;
}

.card.active img {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  height: 320px;
  box-shadow: 0 3rem 100px rgba(0, 0, 0, 0.1);
}

.card.active h4 {
  height: 40px;
}

.card.active .content-wrapper {
  /* height: 100px; */
  opacity: 1;
  transition: 0.3s all;
  background-color: #fff;
  overflow: auto;
  padding: 0 1.2rem;
}
</style>
