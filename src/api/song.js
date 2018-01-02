/**
 * Created by admin on 2017/11/20.
 */
import {commonParams,options} from 'api/config';
import axios from 'axios';

export function getLyric(mid){
  //https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg
  const url  = '/api/lyric';
  const data = Object.assign({},commonParams,{
    uin:0,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    nobase64: 1,
    format: 'json',
    songtype:0,
    g_tk:5381,
    musicid: mid
  })
  return axios.get(url,{
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}


