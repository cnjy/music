/**
 * Created by admin on 2017/11/9.
 */
import jsonp from 'common/js/jsonp';
import {commonParams,options} from 'api/config';
import axios from 'axios';
export function getRecommend(){
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({},commonParams,{
        platform: 'h5',
        uin: 0,
        needNewCode: 1
  })
  return jsonp(url,data,options)
}
//歌单数据
export function getDiscList(){
  const url =  '/api/getDiscList';
  const data = Object.assign({},commonParams,{
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    format: 'json',
    rnd: Math.random()
  });
  return axios.get(url,{
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data.data);
  })

}
// 获取热门歌曲详情数据
export function getSongeList(dissid){
  //ttps://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg
  const url = '/api/playList';
  const data = Object.assign({},commonParams,{
    type:1,
    json:1,
    utf8:1,
    onlysong:0,
    disstid: dissid,
    format: 'json',
    g_tk:5381,
    platform: 'yqq',
    hostUin:0,
    needNewCode:0
  })
  return axios.get(url,{
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}
