/**
 * Created by admin on 2017/11/13.
 */
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch,deleteSearch,clearSearch,savePlay,saveFavorite,deleteFavorite} from 'common/js/cache'
function findIndex(list,song){
  return list.findIndex((item)=>{
    return item.id === song.id;
  })
}
export const selectPlay =  function ({commit,state},{list,index}){

  commit(types.SET_SEQUENCE_LIST,list);
  if(state.mode === playMode.random){
    let randomList = shuffle(list);
    commit(types.SET_PLAY_LIST,randomList);
    index = findIndex(randomList,list[index]);
  }else{
    commit(types.SET_PLAY_LIST,list);
  }
  commit(types.SET_CURRENT_INDEX,index);
  commit(types.SET_FULL_SCREEN,true);
  commit(types.SET_PLAY_SING,true);
}
export const randomPlay = function({commit,state},{list}){
  commit(types.SET_MODE,playMode.random)
  commit(types.SET_SEQUENCE_LIST,list);
  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST,randomList);
  commit(types.SET_CURRENT_INDEX,0);
  commit(types.SET_FULL_SCREEN,true);
  commit(types.SET_PLAY_SING,true);
}

export const insertSong = function({commit,state},song){
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  //记录当前的歌曲
  let currentSong = playList[currentIndex];
  //查找当前列表中是否待插入的歌曲并返回其索引
  let fpIndex = findIndex(playList,song);
  //因为插入歌曲，所以索引要+1
  currentIndex ++;
  //插入首歌到当前的索引位置
  playList.splice(currentIndex,0,song)
  //如果已经包含了这首歌
  if(fpIndex > -1){
    //如果当前插入的序号大于列表中的序号
    if(currentIndex > fpIndex){
      playList.splice(fpIndex,1)
      currentIndex --
    }else{
      playList.splice(fpIndex+1,1)
    }
  }
  let currentSIndex = findIndex(sequenceList,currentSong) + 1
  let fsIndex = findIndex(sequenceList,song);
  sequenceList.splice(currentSIndex,0,song);
  if(fsIndex>-1){
    if(currentSIndex > fsIndex){
      sequenceList.splice(fsIndex,1)
    }else{
      sequenceList.splice(fsIndex+1,1)
    }
  }
  commit(types.SET_PLAY_LIST,playList)
  commit(types.SET_SEQUENCE_LIST,sequenceList)
  commit(types.SET_CURRENT_INDEX,currentIndex)
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_PLAY_SING,true)
}

export const saveSearchHistory = function ({commit},query){
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function({commit},query){
  commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const clearSearchHistory = function({commit},query){
  commit(types.SET_SEARCH_HISTORY,clearSearch())
}

export const deleteSong = function ({commit,state},song){
  let playlist = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist,song)
  playlist.splice(pIndex,1)
  let sIndex = findIndex(sequenceList,song)
  sequenceList.splice(sIndex,1)
  if(currentIndex > pIndex || currentIndex === playlist.length){
    currentIndex --
  }
  commit(types.SET_PLAY_LIST,playlist)
  commit(types.SET_SEQUENCE_LIST,sequenceList)
  commit(types.SET_CURRENT_INDEX,currentIndex)

  if(!playlist.length){
    commit(types.SET_PLAY_SING,false)
  }else{
    commit(types.SET_PLAY_SING,true)
  }
}

export const deleteSongList = function ({commit,state}){
  commit(types.SET_PLAY_LIST,[])
  commit(types.SET_CURRENT_INDEX,-1)
  commit(types.SET_PLAY_SING,false)
}

export const savePlayHistory = function({commit,state},song){
  commit(types.SET_PLAY_HISTORY,savePlay(song))
}

export const saveFavoriteList = function ({commit,state},song){
  commit(types.SET_FAVORITE_LIST,saveFavorite(song))
}

export const deleteFavoriteList = function ({commit},song){
  commit(types.SET_FAVORITE_LIST,deleteFavorite(song))
}
