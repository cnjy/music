/**
 * Created by admin on 2017/11/10.
 */
import jsonp from 'common/js/jsonp';
import {commonParams,options} from 'api/config';
//获取歌手的数据
export function getSingerList(){
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  const data = Object.assign({},commonParams,{
    channel:'singer',
    page:'list',
    key:'all_all_all',
    g_tk:1052483176,
    pagesize:100,
    pagenum:1,
    platform:'yqq',
    hostUin:0,
    needNewCode:0
  });
  return jsonp(url,data,options);
}
//获取歌手详情数据
export function getSingerDetail(singerid){
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  const data = Object.assign({},commonParams,{
    singerid:singerid,
    from:'h5',
    num:100,
    begin:0,
    songstatus: 1,
    format:'json',
    order:'listen'
  })
  return jsonp(url,data,options);
}
