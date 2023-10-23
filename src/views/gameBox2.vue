<script setup lang="ts">
import { useCounterStore } from '../stores/counter'
import { nextTick } from 'vue'
import { computed, ref, reactive, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { vElementHover } from '@vueuse/components'
import gsap from 'gsap'
let question1: Ref<string> = ref('')
let showRule: Ref<boolean> = ref(false)
let ruleGsap = ref(null)
let qestionAllObject = ref([
  {
    questionCount: '問題一',
    questionAsk: ref(
      '從迷糊中醒來，你發現自己正在一節列車上，窗外風光明媚，你靜靜地感受了一陣子，然後'
    ),
    choose1: ref('不去猜測目的地，等待未知的驚喜'),
    choose2: ref('起身尋找路線圖，確認車要開去哪'),
    showChoose: ref(false),
    model1: ref(''),
    ansTrue: ref(10),
    ansFalse: ref(-6)
  },
  {
    questionCount: '問題二',
    questionAsk: ref('前面突然出現岔路，一個是往山上，一個是往城市，你會?'),
    model1: ref(''),
    choose1: ref('人聲鼎沸，有很多小商店的鬧區'),
    choose2: ref('悠閒寧靜，少數人居住的山上'),
    showChoose: ref(false),
    ansTrue: ref(-10),
    ansFalse: ref(5)
  }
])
let qestionCityObject = ref([
  {
    questionCount: '問題三',
    questionAsk: ref('下坡路上，你發現路邊有個小女孩，你會怎麼辦?'),
    model1: ref(''),
    choose1: ref('「呃，她怎麼會在這？我該幫她嗎？」'),
    choose2: ref('「哇，她好像很苦惱，要關心她嗎？」'),
    showChoose: ref(false),
    ansTrue: ref(-10),
    ansFalse: ref(10)
  },
  {
    questionCount: '問題四',
    questionAsk: ref('路程途中，有一座神秘的廟宇，進去之前，你被突然衝出的老人，嚇了一跳'),
    model1: ref(''),
    choose1: ref('「呼！還好不是野生動物」'),
    choose2: ref('「年紀大了，不知道他要去哪裡」'),
    showChoose: ref(false),
    ansTrue: ref(-5),
    ansFalse: ref(8)
  },
  {
    questionCount: '問題五',
    questionAsk: ref('老人很久沒看到人了忍不住對你訴苦，委屈地說起自己遇到的鳥事，而你⋯⋯'),
    model1: ref(''),
    choose1: ref('很同情老人，忍不住幫牠想想辦法'),
    choose2: ref('表面上禮貌聆聽，大腦早就在神遊'),
    showChoose: ref(false),
    ansTrue: ref(-2),
    ansFalse: ref(9)
  },
  {
    questionCount: '問題六',
    questionAsk: ref('離開廟宇前，老人邀請你跟他一起下棋，於是你？'),
    model1: ref(''),
    choose1: ref('問很多問題，兩人一起熱絡的下棋'),
    choose2: ref('認真跟老人下棋，絲毫不想讓步'),
    showChoose: ref(false),
    ansTrue: ref(-10),
    ansFalse: ref(1)
  },
  {
    questionCount: '問題七',
    questionAsk: ref('最後，老人把他最喜歡的茶葉送你，還順便推薦你去看看會泡溫泉的小海豹，你會⋯⋯'),
    model1: ref(''),
    choose1: ref('把小海豹寫進行程，好好安排時間去看'),
    choose2: ref('把小海豹放在心上，視時機與心情前往'),
    showChoose: ref(false),
    ansTrue: ref(-5),
    ansFalse: ref(2)
  },
  {
    questionCount: '問題八',
    questionAsk: ref('出來後，你發現你的車壞了，這時你會?'),
    model1: ref(''),
    choose1: ref('自己想辦法處理，不想依靠他人'),
    choose2: ref('尋求老人協助，看能否請專家幫忙'),
    showChoose: ref(false),
    ansTrue: ref(-3),
    ansFalse: ref(4)
  },
  {
    questionCount: '問題九',
    questionAsk: ref(
      '隨後，你到一間糕餅店稍作休息，隔壁的人在聊天，哪一個話題會讓你忍不住豎耳傾聽？'
    ),
    model1: ref(''),
    choose1: ref('洗菜的方法、火箭股價、甜甜圈的口味'),
    choose2: ref('玄學、魔法、公平的代價、發光大竹筍'),
    showChoose: ref(false),
    ansTrue: ref(-4),
    ansFalse: ref(1)
  },
  {
    questionCount: '問題十',
    questionAsk: ref('休息完，突然前面出現了兩條長得一模一樣的老街，你會想要走進哪一條裡面逛逛？'),
    model1: ref(''),
    choose1: ref('可以用第一人稱體驗每個人生活的街'),
    choose2: ref('可以用上帝視角觀察每個人生活的街'),
    showChoose: ref(false),
    ansTrue: ref(-10),
    ansFalse: ref(10)
  }
])
let qestionMoutainObject = ref([
  {
    questionCount: '問題三',
    questionAsk: ref('走入坑道，你發現中央有一隻大鳥牠因為煩惱而散發著強烈的負能量⋯⋯'),
    model1: ref(''),
    choose1: ref('「呃，牠怎麼會在這？我該逃跑嗎？」'),
    choose2: ref('「哇，牠好像很苦惱，要關心牠嗎？」'),
    showChoose: ref(false),
    ansTrue: ref(-5),
    ansFalse: ref(5)
  },
  {
    questionCount: '問題四',
    questionAsk: ref('山的入口，是一座神秘的窯坑，進去之前，你被突然衝出的一窩小貓，嚇了一跳'),
    model1: ref(''),
    choose1: ref('「呼！還好不是更兇的野生動物」'),
    choose2: ref('「還這麼小，不知道牠們要去哪裡」'),
    showChoose: ref(false),
    ansTrue: ref(-10),
    ansFalse: ref(10)
  },
  {
    questionCount: '問題五',
    questionAsk: ref('大鳥很久沒看到人了忍不住對你訴苦，委屈地說起自己遇到的鳥事，而你⋯⋯'),
    model1: ref(''),
    choose1: ref('很同情大鳥，忍不住幫牠想想辦法'),
    choose2: ref('表面上禮貌聆聽，大腦早就在神遊'),
    showChoose: ref(false),
    ansTrue: ref(-3),
    ansFalse: ref(7)
  },
  {
    questionCount: '問題六',
    questionAsk: ref('出洞口前，冒出一個老人他邀請你從４杯茶裡，猜出他最喜歡的，於是你？'),
    model1: ref(''),
    choose1: ref('問很多問題，兩人一起熱絡的品茶'),
    choose2: ref('認真聽老人介紹，安靜悠閒的品茶'),
    showChoose: ref(false),
    ansTrue: ref(-7),
    ansFalse: ref(1)
  },
  {
    questionCount: '問題七',
    questionAsk: ref('老人把他最喜歡的茶葉送你，還順便推薦你去看看會泡溫泉的小海豹，你會⋯⋯'),
    model1: ref(''),
    choose1: ref('把小海豹寫進行程，好好安排時間去看'),
    choose2: ref('把小海豹放在心上，視時機與心情前往'),
    showChoose: ref(false),
    ansTrue: ref(-2),
    ansFalse: ref(3)
  },
  {
    questionCount: '問題八',
    questionAsk: ref(
      '出來後，你攔了一輛計程車，但每一個路標都寫著一樣的路名，連司機都迷路。這時你會？'
    ),
    model1: ref(''),
    choose1: ref('幫忙看路，想從蛛絲馬跡中找到差異'),
    choose2: ref('這狀況太不真實，一定中了什麼結界'),
    showChoose: ref(false),
    ansTrue: ref(-5),
    ansFalse: ref(9)
  },
  {
    questionCount: '問題九',
    questionAsk: ref('這時，前面出現了兩條長得一模一樣的老街，你會想要走進哪一條裡面逛逛？'),
    model1: ref(''),
    choose1: ref('可以用第一人稱體驗每個人生活的街'),
    choose2: ref('可以用上帝視角觀察每個人生活的街'),
    showChoose: ref(false),
    ansTrue: ref(-5),
    ansFalse: ref(3)
  },
  {
    questionCount: '問題十',
    questionAsk: ref('你到一間糕餅店稍作休息，隔壁的人在聊天，哪一個話題會讓你忍不住豎耳傾聽？'),
    model1: ref(''),
    choose1: ref('洗菜的方法、火箭股價、甜甜圈的口味'),
    choose2: ref('玄學、魔法、公平的代價、發光大竹筍'),
    showChoose: ref(false),
    ansTrue: ref(-5),
    ansFalse: ref(9)
  }
])
let whichLine = ref([
  {
    questionCount: '',
    questionAsk: ref(''),
    model1: ref(''),
    choose1: ref(''),
    choose2: ref(''),
    showChoose: ref(false),
    ansTrue: ref(),
    ansFalse: ref()
  }
])
const showQuestion = (i: any): void => {
  let question1AllText = i.questionAsk
  const characters = question1AllText.split('')
  let currentIndex = -1
  if (i.model1 !== '') {
    return
  }
  const intervalId = setInterval(() => {
    currentIndex++
    if (currentIndex < characters.length) {
      setTimeout(() => {
        i.model1 += characters[currentIndex]
      })
    } else {
      clearInterval(intervalId) // 停止定时器
      i.showChoose = ref(true)
    }
  }, 100) // 每隔一秒添加一个字符
}
onMounted(() => {
  gsap.to(ruleGsap.value, {
    y: -20, // 向上浮动
    duration: 1.5,
    ease: 'power2.inOut',
    repeat: -1, // 无限循环
    yoyo: true // 循环时反向运动
  })
})
let translateMove = ref(0)
let finalAns = ref(0)
let alreadyComplete: Ref<number> = ref(0)
let showComplete: Ref<boolean> = ref(false)
let resultAns = ref([
  {
    name: '冰系圈',
    inside: ['邏輯呢', '掰掰', '笑而不語'],
    pic: '1698051811867.jpg',
    outside: ['科技嘗鮮者', ['自我管理', '形象大使', '用作品說話'], '很在意標點符號']
  },
  {
    name: '鋼系圈',
    inside: ['摩拳擦掌', '我真帥', '不要找理由'],
    pic: '1698047366563.jpg',
    outside: ['沒有散漫', ['霸氣', '進修魔人', '討厭作弊'], '藝術顧問']
  },
  {
    name: '貓系圈',
    inside: ['這無聊', '有意思', '不幹了不幹了'],
    pic: '1698051850909.jpg',
    outside: ['超級衝動', ['忠於自我', '找刺激', '笑聲好笑'], '邏輯異於常人']
  },
  {
    name: '超能圈',
    inside: ['頭痛欸', '好忙', '阿不管了'],
    pic: '1698051861912.jpg',
    outside: ['體育股長', ['住海邊', '工作狂', '讀心術'], '聒噪又熱情']
  }
])
let whichResult = reactive({
  name: '',
  inside: [''],
  pic: '',
  outside: [[''], '']
})
const nextQuestion = (i: string, ans?: number): void => {
  alreadyComplete.value++
  translateMove.value -= 300
  if (ans) {
    finalAns.value += ans
  }
  if (alreadyComplete.value == 10) {
    showComplete.value = true
    if (finalAns.value <= -20) {
      whichResult.name = resultAns.value[0].name
      whichResult.inside = resultAns.value[0].inside
      whichResult.pic = resultAns.value[0].pic
      whichResult.outside = resultAns.value[0].outside
    } else if (finalAns.value > -20 && finalAns.value <= 0) {
      whichResult.name = resultAns.value[3].name
      whichResult.inside = resultAns.value[3].inside
      whichResult.pic = resultAns.value[3].pic
      whichResult.outside = resultAns.value[3].outside
    } else if (finalAns.value > 0 && finalAns.value <= 25) {
      whichResult.name = resultAns.value[1].name
      whichResult.inside = resultAns.value[1].inside
      whichResult.pic = resultAns.value[1].pic
      whichResult.outside = resultAns.value[1].outside
    } else if (finalAns.value > 25) {
      whichResult.name = resultAns.value[2].name
      whichResult.inside = resultAns.value[2].inside
      whichResult.pic = resultAns.value[2].pic
      whichResult.outside = resultAns.value[2].outside
    }
  }
  //   console.log(i)
  //   console.log(translateMove)
  if (i == '悠閒寧靜，少數人居住的山上') {
    whichLine.value = qestionMoutainObject.value
    console.log(whichLine.value)
  } else if (i == '人聲鼎沸，有很多小商店的鬧區') {
    whichLine.value = qestionCityObject.value
  }
}
</script>
<template>
  <div class="gameAllOuter">
    <!-- <div class="ruleBox" v-if="showRule" @click="showRule = !showRule"> -->
    <div class="ruleBox" @click="showRule = !showRule" v-if="!showRule">
      <div class="ruleMainBox" ref="ruleGsap">
        <div class="ruleTitle">遊戲規則</div>
        <div class="ruleDetail">
          視窗關閉後，按下"ClickMe"即可開始答題，每個答案都會影響結局，請謹慎作答
        </div>
      </div>
    </div>
    <div class="container" v-if="showRule && !showComplete">
      <div>
        <div
          class="group"
          v-for="(i, index) in qestionAllObject"
          :key="index"
          :style="{ transform: `translateY(${translateMove}px)`, transition: '1s' }"
        >
          <input
            type="text"
            required
            @focus="showQuestion(i)"
            v-model="i.model1"
            readonly
            placeholder="ClickMe"
          />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>{{ i.questionCount }}</label>

          <div class="chooseAns" v-if="i.showChoose">
            <input
              type="radio"
              class="trueOrNot"
              :name="`${index}`"
              @click="nextQuestion(i.choose1)"
            />
            {{ i.choose1 }}

            <input
              type="radio"
              class="trueOrNot"
              :name="`${index}`"
              @click="nextQuestion(i.choose2)"
            />
            {{ i.choose2 }}
          </div>
        </div>

        <div
          class="group"
          v-for="(i, index) in whichLine"
          :key="index"
          :style="{ transform: `translateY(${translateMove}px)`, transition: '1s' }"
        >
          <input
            type="text"
            required
            @focus="showQuestion(i)"
            v-model="i.model1"
            readonly
            placeholder="ClickMe"
          />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>{{ i.questionCount }}</label>

          <div class="chooseAns" v-if="i.showChoose">
            <input
              type="radio"
              class="trueOrNot"
              :name="`${index}`"
              @click="nextQuestion(i.choose1, i.ansTrue)"
            />
            {{ i.choose1 }}

            <input
              type="radio"
              class="trueOrNot"
              :name="`${index}`"
              @click="nextQuestion(i.choose2, i.ansFalse)"
            />
            {{ i.choose2 }}
          </div>
        </div>
      </div>
    </div>
    <div class="ansBox" v-if="showComplete">
      <div class="mainAnsBox">
        <div class="mainFirstPart">
          <div>天生就混</div>
          <div>{{ whichResult.name }}</div>
        </div>
        <div class="mainSecondPart">
          <div class="mainSecondLeft">
            <div class="insideHeart">
              <div>內</div>
              <div>心</div>
              <div>表</div>
              <div>現</div>
            </div>
            <div class="insideDetail">
              <div>{{ whichResult.inside[0] }}</div>
              <div>{{ whichResult.inside[1] }}</div>
              <div>{{ whichResult.inside[2] }}</div>
            </div>
          </div>

          <div class="insideImg">
            <img :src="'../../public/all_images/' + whichResult.pic" alt="" />
          </div>
        </div>
        <div class="mainThirdPart">
          <div class="outSide">
            <div>外</div>
            <div>在</div>
            <div>特</div>
            <div>徵</div>
          </div>
          <div class="outSideDetail">
            <div class="detailOne">{{ whichResult.outside[0] }}</div>
            <div class="detailMiddle">
              <div>{{ whichResult.outside[1][0] }}</div>
              <div>{{ whichResult.outside[1][1] }}</div>
              <div>{{ whichResult.outside[1][2] }}</div>
            </div>

            <div class="detailThird">{{ whichResult.outside[2] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.gameAllOuter {
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
* {
  box-sizing: border-box;
}

/* basic stylings ------------------------------------------ */
body {
  background: url(https://scotch.io/wp-content/uploads/2014/07/61.jpg);
}
.container {
  font-family: 'Roboto';
  width: 80%;
  margin-top: 50px;
  display: block;
  background: #fff;
  padding-left: 70px;
  height: 300px;
  border: 5px red dashed;
  overflow: hidden;
}
h2 {
  text-align: center;
  margin-bottom: 50px;
}
h2 small {
  font-weight: normal;
  color: #888;
  display: block;
}
.footer {
  text-align: center;
}
.footer a {
  color: #53b2c8;
}

/* form starting stylings ------------------------------- */
.group {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  .chooseAns {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 20px;

    .trueOrNot {
      width: auto;
      margin: 0px 10px;
      border: 1px red solid;
    }
  }
}
input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 750px;
  border: none;
  border-bottom: 1px solid #757575;
}
input:focus {
  outline: none;
}

/* LABEL ======================================= */
label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;

  left: 10%;
  top: 50px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

/* active state */
input:focus ~ label,
input:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #5264ae;
}

/* BOTTOM BARS ================================= */
.bar {
  position: relative;
  display: block;
  width: 300px;
}
.bar:before,
.bar:after {
  content: '';
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  //   background: #5264ae;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}

.ruleBox {
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  .ruleMainBox {
    width: 600px;
    height: 300px;
    border: 2px black solid;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 15px;
    z-index: 2;
    .ruleTitle {
      font-size: 25px;

      margin-bottom: 10px;
    }
    .ruleDetail {
      width: 80%;
    }
  }
}
.ansBox {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  .mainAnsBox {
    width: 50%;
    height: 100%;
    border: 1px rgb(85, 84, 84) solid;
    display: flex;
    flex-direction: column;

    .mainFirstPart {
      width: 100%;
      height: 20%;
      border-bottom: 1px black solid;
      display: flex;
      div {
        &:first-child {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-left: 20px;
          padding-bottom: 10px;
          font-size: 20px;
          font-weight: 700;
          width: 50%;
          border-right: 1px black solid;
        }
        &:nth-child(2) {
          display: flex;
          align-items: flex-end;
          padding-left: 15px;
          font-size: 40px;
          font-weight: 700;
        }
      }
    }
    .mainSecondPart {
      display: flex;
      height: 40%;
      width: 100%;
      border-bottom: 1px black solid;
      .mainSecondLeft {
        width: 50%;
        display: flex;
        .insideHeart {
          width: 30%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 25px;
          border-right: 1px black solid;
          div {
            font-weight: bold;
          }
        }
        .insideDetail {
          width: 70%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          border-right: 1px black solid;
          div {
            width: auto;
            padding: 5px 40px;
            box-shadow: 0px 0px 10px #ccc;
            border-top-left-radius: 52px;
            border-top-right-radius: 50px;
            border-bottom-left-radius: 57px;
            border-bottom-right-radius: 62px;
          }
        }
      }
      .insideImg {
        width: 30%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
    .mainThirdPart {
      display: flex;
      height: 40%;
      .outSide {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        border-right: 1px black solid;
        height: 100%;
        div {
          font-weight: bold;
        }
      }
      .outSideDetail {
        width: 70%;
        align-items: center;
        display: flex;
        justify-content: space-around;
        .detailOne,
        .detailThird {
          width: auto;
          padding: 5px 40px;
          box-shadow: 0px 0px 10px #ccc;
          border-top-left-radius: 52px;
          border-top-right-radius: 50px;
          border-bottom-left-radius: 57px;
          border-bottom-right-radius: 62px;
        }
        .detailMiddle {
          div {
            margin: 15px 0px;
            border-bottom: 1px rgb(83, 82, 82) solid;
          }
        }
      }
    }
  }
}
</style>
