<template>
  <div class="bg">
    <div
      class="card"
      :class="{ active: activeArr[0] }"
      :style="transformStyle[0]"
    >
      <img
        class="active"
        id="0"
        src="https://source.unsplash.com/900x600/?nature,water,1"
        @click="expand"
      />
      <h4>Dog</h4>
      <div class="content-wrapper">
        <div class="content">
          <p>
            所谓生活在树上，关键是生活在树上需要如何写。
            鲁巴金曾经说过，读书是在别人思想的帮助下，建立起自己的思想。这不禁令我深思总结的来说，
            本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。
            每个人都不得不面对这些问题。 在面对这种问题时，
            了解清楚生活在树上到底是一种怎么样的存在，是解决一切问题的关键。
            要想清楚，生活在树上，到底是一种怎么样的存在。
            爱迪生曾经说过，失败也是我需要的，它和成功对我一样有价值。这不禁令我深思本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。
            既然如此，
          </p>
        </div>
      </div>
    </div>

    <div
      class="card"
      :class="{ active: activeArr[1] }"
      :style="transformStyle[1]"
    >
      <img
        id="1"
        src="https://source.unsplash.com/900x600/?nature,water,2"
        @click="expand"
      />
      <h4>Computer</h4>
      <div class="content-wrapper">
        <div class="content">
          <p>
            要想清楚，生活在树上，到底是一种怎么样的存在。
            爱迪生曾经说过，失败也是我需要的，它和成功对我一样有价值。这不禁令我深思本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。
            既然如此，
            德谟克利特曾经说过，节制使快乐增加并使享受加强。这不禁令我深思每个人都不得不面对这些问题。
            在面对这种问题时，
            经过上述讨论要想清楚，生活在树上，到底是一种怎么样的存在。
            而这些并不是完全重要，更加重要的问题是，
            了解清楚生活在树上到底是一种怎么样的存在，是解决一切问题的关键。
          </p>
        </div>
      </div>
    </div>

    <div
      class="card"
      :class="{ active: activeArr[2] }"
      :style="transformStyle[2]"
    >
      <img
        id="2"
        src="https://source.unsplash.com/900x600/?nature,water,3"
        @click="expand"
      />
      <h4>Bridge</h4>
      <div class="content-wrapper">
        <div class="content">
          <p>
            了解清楚一天掉多少根头发到底是一种怎么样的存在，是解决一切问题的关键。
            普列姆昌德曾经说过，希望的灯一旦熄灭，生活刹那间变成了一片黑暗。这不禁令我深思我认为，
            一天掉多少根头发因何而发生?带着这些问题，我们来审视一下一天掉多少根头发。
            生活中，若一天掉多少根头发出现了，我们就不得不考虑它出现了的事实。
            要想清楚，一天掉多少根头发，到底是一种怎么样的存在。
            所谓一天掉多少根头发，关键是一天掉多少根头发需要如何写。
            了解清楚一天掉多少根头发到底是一种怎么样的存在，是解决一切问题的关键。
            这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。
            每个人都不得不面对这些问题。 在面对这种问题时，
            了解清楚一天掉多少根头发到底是一种怎么样的存在，是解决一切问题的关键。
            我们都知道，只要有意义，那么就必须慎重考虑。
            带着这些问题，我们来审视一下一天掉多少根头发。
            了解清楚一天掉多少根头发到底是一种怎么样的存在，是解决一切问题的关键。
            现在，解决一天掉多少根头发的问题，是非常非常重要的。 所以，
            带着这些问题，我们来审视一下一天掉多少根头发。
            我们都知道，只要有意义，那么就必须慎重考虑。
            要想清楚，一天掉多少根头发，到底是一种怎么样的存在。
            一般来讲，我们都必须务必慎重的考虑考虑。
            每个人都不得不面对这些问题。 在面对这种问题时，
            这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      curActiveID: null,
      // 1展开，0关闭
      activeArr: [0, 0, 0],
      translateY: 0,
      scale: 1,
    };
  },
  computed: {
    transformStyle: function(e) {
      let transform = new Array(3);
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
    expand: function(e) {
      let id = e.target.id;
      let offset = e.target.getBoundingClientRect().top;

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
        this.translateY = -offset;

        // target curID
        this.curActiveID = id;
        // change active statu
        this.isActive = true;
      } else {
        // close card
        // this.activeArr[id] = 0;

        // rm expand calss
        this.activeArr.splice(id, 1, 0);
        this.scale = 1;

        // rm curID
        this.curActiveID = null;
        // rm active stat
        this.isActive = false;
      }
    },
  },
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.8rem 1.2rem;
  background-color: #fff;
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
  overflow: hidden;
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
}

.card.active .content-wrapper {
  height: 100vh;
  opacity: 1;
  transition: 0.3s all;
}
</style>
