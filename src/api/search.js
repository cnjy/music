/**
 * Created by admin on 2017/11/23.
 */
import jsonp from 'common/js/jsonp';
import {commonParams,options} from 'api/config';

export function getHotKey(){
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  const data =  Object.assign({},commonParams,{
    g_tk:1472799397,
    inCharset: 'utf-8',
    outCharset:'utf-8',
    platform:'h5',
    needNewCode:1,
    format:'jsonp'
  })
  return jsonp(url,data,options)
}

export function search(query,page,zhida,perpage){
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
  const data = Object.assign({},commonParams,{
    w: query,
    p: page,
    catZhida: zhida? 1:0,
    format:'jsonp',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    zhidaqu:1,
    t:0,
    flag:1,
    ie: 'utf-8',
    sem:1,
    aggr:0,
    perpage:perpage,
    n:20,
    g_tk:1472799397,
    remoteplace:'txt.mqq.all'
  })
  return jsonp(url,data,options)
}
