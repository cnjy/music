<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singerList" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  import {mapMutations} from 'vuex';
  import {playListMixin} from 'common/js/mixin'
  const HOT_NAME = '热门';
  const HOT_LENGTH = 10;
  export default {
    mixins: [playListMixin],
    data(){
      return {
        singerList: []
      }
    },
    created(){
      this._getSingerList()
    },
    methods: {
      handlePlaylist(playlist){
        const bottom = playlist.length > 0? '60px': ''
        this.$refs.singer.style.bottom = bottom;
        this.$refs.list.refresh()
      },
      selectSinger(item){
        this.$router.push({
          path: `/singer/${item.id}`
        })
        this.setSinger(item);
      },
      _getSingerList(){
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singerList = this._normalizeSinger(res.data.list);
          }
        })
      },
      _normalizeSinger(list){
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_LENGTH) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              _id: item.Fsinger_id,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex;
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            _id: item.Fsinger_id,
            name: item.Fsinger_name
          }))
        })
        //为了得到有序列表要处理map
        let hot = [];
        let ret = [];
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val);
          } else if (val.title === HOT_NAME) {
            hot.push(val);
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        });
        return hot.concat(ret);
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }

  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
