<template>
  <q-page padding>
    <div class="fit row wrap justify-between items-start q-px-sm">
      <div class="col-lg-3 col-sm-12 col-xs-12">
          <q-btn-toggle
            v-model="filter"
            spread
            no-caps
            rounded
            toggle-color="primary"
            color="white"
            class="text-bold"
            text-color="black"
            :options="[
              {label: '我的评价', value: 'reviews'},
              {label: '我的进度', value: 'progress'},
              {label: '分类整理', value: 'folder'}
            ]"
          />
      </div>
      <div class="col-auto gt-sm">
        <q-select dense rounded outlined v-model="sortBy" :options="sortOptions" bg-color="white" />
      </div>
    </div>
    <div class="q-pt-md">
      <div class="q-px-sm q-py-md">
        <q-infinite-scroll @load="onLoad" :offset="250">
          <q-list bordered separator class="shadow-2">
             <FavListItem v-for="(work) in works" :key="work.id" :workid="work.id"></FavListItem> 
          </q-list>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </div>
  </q-page>
</template>

<script>
import FavListItem from 'components/FavListItem'

export default {
  name: 'Favourites',

  components: {
    FavListItem
  },

  data() {
    return {
      filter: 'reviews',
      works: [{id: 298301}, {id: 277473}, {id: 180713}],
      items: [ {}, {}, {}, {}, {}, {}, {} ],
      sortBy: {
          label: '按照评价时间排序',
          order: 'updated_at',
          sort: 'desc'
        },
      sortOptions: [
        {
          label: '按照评价时间排序',
          order: 'updated_at',
          sort: 'desc'
        },
        {
          label: '按照评价排序',
          order: 'rating',
          sort: 'desc'
        },
        {
          label: '按照新作优先顺序',
          order: 'release',
          sort: 'desc'
        },
        {
          label: '按照旧作优先顺序',
          order: 'release',
          sort: 'asc'
        },
        {
          label: '按照评论多到少的顺序',
          order: 'review_count',
          sort: 'desc'
        },
        {
          label: '按照售出数量多到少的顺序',
          order: 'dl_count',
          sort: 'desc'
        },
        {
          label: '按照全年龄新作优先的顺序',
          order: 'nsfw',
          sort: 'asc'
        },
        {
          label: '按照18禁新作优先的顺序',
          order: 'nsfw',
          sort: 'desc'
        }
      ]
    }
  },
  methods: {
    onLoad (index, done) {
      setTimeout(() => {
        if (this.items) {
          this.items.push({}, {}, {}, {}, {}, {}, {})
          if (this.items.length >= 49) {
            console.log(this.items.length);
            done(true)
          } else {
            done()
          }
        }
      }, 2000)
    }
  }
}
</script>
