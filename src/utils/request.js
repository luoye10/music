function request(obj){
    var xhr = new XMLHttpRequest(),
    type = obj.type,
    url = obj.url,
    params = obj.data;
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            obj.callback(xhr.responseText);
        }
    };
    if(type === 'get'){
        paramsD(params) && (url += '?' + paramsD(params));
    }
    xhr.open(type,url);
    if(type === 'post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(paramsD());
    }else{
        xhr.send(null);
    }
}
function paramsD(data){
    var str = '';
    for(var key in data){
        str += key + '=' + data[key] + '&';
    }
    str.slice(0,-1);
    return str;
}
export default request
