/**
 * Created by lenovo on 2017/11/21.
 */
import {mapGetters,mapMutations,mapActions} from  'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
export const playListMixin = {
  computed:{
    ...mapGetters(['playList'])
  },
  mounted(){
   this.handlePlaylist(this.playList)
  },
  activated(){
    this.handlePlaylist(this.playList)
  },
  watch:{
    playList(newVal){
      this.handlePlaylist(newVal)
    }
  },
  methods:{
    handlePlaylist(){
      throw new Error('component must implement handlePlaylist method')
    }
  }

}

export const playerMixin = {
  computed: {
    iconMode(){
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playList',
      'mode',
      'favoriteList'
    ])
  },
  methods: {
    changeMode(){
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list){
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    getFavoriteIcon(song){
      if(this.isFavorite(song)){
        return 'icon-like'
      }
      return 'icon-not-like'

    },
    toggleFavorite(song){
      if(this.isFavorite(song)){
        this.deleteFavoriteList(song)
      }else{
        this.saveFavoriteList(song)
      }
    },
    isFavorite(song){
      const index = this.favoriteList.findIndex((item)=>{
        return item.id === song.id
      })
      return index>-1
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAY_SING',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_MODE',
      setPlayList: 'SET_PLAY_LIST'
    }),
    ...mapActions(['saveFavoriteList','deleteFavoriteList'])
  }
}

export const searchMixin ={
  data(){
    return {
      query: '',
      refreshDelay: 100
    }
  },
  computed: {
    ...mapGetters(['searchHistory'])
  },
  methods :{
    blurInput(){
      this.$refs.searchBox.blur()
    },
    saveSearch(){
      this.saveSearchHistory(this.query)
    },
    onQueryChange(query){
      this.query = query
    },
    addQuery(query){
      this.$refs.searchBox.setQuery(query)
    },
    ...mapActions(['saveSearchHistory','deleteSearchHistory'])
  }
}
