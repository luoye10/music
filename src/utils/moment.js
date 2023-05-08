function format(str) {
    let date = new Date(this)
    let y = date.getFullYear()
    let M = date.getMonth()
    let d = date.getDate()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    let reg = {
        'yyyy': y,
        'MM': dealVal(M + 1),
        'dd': dealVal(d),
        'hh': dealVal(h),
        'mm': dealVal(m),
        'ss': dealVal(s)
    }
    for(let key in reg) {
        str = str.replace(key, reg[key])
    }
    return str
}
function dealVal(v) {
    return v < 10 ? '0' + v : v;
}

Date.prototype.format = format