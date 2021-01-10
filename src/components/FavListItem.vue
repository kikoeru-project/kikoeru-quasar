<template>
  <q-item clickable class="row bg-white">
      <q-item-section class="col-auto" top> 
        <router-link :to="`/work/${workid}`">
          <q-img transition="fade" :src="coverUrl" style="height: 120px; width: 160px;" />
        </router-link>
      </q-item-section>


      <q-item-section class="q-gutter-y-xs column items-start" top v-on:click.self="toWork()">
        <q-item-label lines="2" class="text-body2">
          <router-link :to="`/circle/49556`" class="col-auto text-black">
            【5時間/銚子電鉄車内音/耳かき/砂浜/イルカウォッチング】蓄音レヱル 西瓜【CV.伊ヶ崎綾香】
          </router-link>
        </q-item-label>

        <div class="row q-gutter-x-sm col-auto" >
          <router-link :to="`/circle/49556`" class="col-auto text-grey">
            RailRomanesque
          </router-link>

          <span class="col-auto">/</span>

          <router-link
            :to="`/va/1903985`"
            class="col-auto text-primary"
          >
            伊ヶ崎綾香
          </router-link>
        </div>

        <q-rating
          v-model="rating"
          v-on:click="test()"
          size="sm"
          color="blue"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          class="col-auto"
        />

        <q-item-label v-show="review">
          <q-card class="my-card col-auto">
            <q-card-section class="q-pa-sm">
              <!-- <span class="text-grey-7">我的评价</span> -->
              <span class="text-grey-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </span>
            </q-card-section>
          </q-card>
        </q-item-label>
      </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'FavListItem',

  props: {
      workid: {
        type: Number,
        required: true
      },
  },

  data () {
    return {
      rating: 4,
      review: 'adas'
    }
  },

  computed: {
    coverUrl () {
      // 从 LocalStorage 中读取 token
      const token = this.$q.localStorage.getItem('jwt-token') || ''
      return this.workid ? `/api/cover/${this.workid}?type=240x240&token=${token}` : ""
    },
  },

  methods: {
    test () {
      console.log('rated')
    },
    
    toWork () {
      this.$router.push(`/work/${this.workid}`)
      // console.log('FIRED')
    }
  }

}
</script>