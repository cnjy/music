/**
 * Created by admin on 2017/11/9.
 */
import originJsonp from 'jsonp';
export default function jsonp (url,data,option){
    url += (url.indexOf('?')<0? '?': '&') + param(data);
    return new Promise((resolve,reject)=>{
      console.log(url);
      originJsonp(url,option,(err,data)=>{
        if(!err){
          resolve(data);
        }else{
          reject(data);
        }
      })
    })
}
//创建&name="zhangxin"
function param(data){
  let url = '';
  for(var k in data){
    let value = data[k] !== undefined ? data[k]: '';
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1): '';
}
