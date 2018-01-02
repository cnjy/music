/**
 * Created by admin on 2017/11/9.
 */
export function addClass(el,className){
  if(hasClass(el,className)){
    return
  }else{
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
  }
}
function hasClass(el,className){
  let re = new RegExp('(^|\\s)'+className+'(\\s|$)');
  return re.test(el.className)
}
//获取get自定义属性的方法
export function getData(el,name,val){
  const prefix = 'data-';
  const cuname = prefix + name;
  if(val){
    return el.setAttribute(cuname,val);
  }else{
    return el.getAttribute(cuname);
  }
}
