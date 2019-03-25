/**
 * Created by Alienware on 2018/8/6 0006.
 * 解构测试
 */
function des1([x,y]) {
    console.log(`x:${x} y:${y}`)
}

function des2([[a,b,c],d]) {
    console.log(`a:${a} b:${b} c:${c} d:${d}`)
}

function des3({a,b,c}) {
    console.log(`a:${a} b:${b} c:${c}`)
}