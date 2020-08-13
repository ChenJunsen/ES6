function formatRate2(value, minLength, zoom) {
    if (!isNumber(value)) {
        return '--'
    } else {
        let v = value
        if (isNumber(zoom)) {
            v = accMul(Number(value),Number(zoom))//设置放大
        }
        console.log(v+'')
        let ss = (v + '').split('.')
        let m = Math.abs(isInteger(minLength) ? Number(minLength) : 2)//默认两位小数
        console.log('m:'+m)
        if (ss.length == 1 || m == 0) {//整数
            console.log('a')
            let sec = ''
            for (let i = 0; i < m; i++) {
                sec += '0'
            }
            if(sec){
                return ss[0] + '.' + sec//整数拼接小数零
            }else{
                return ss[0]//纯整数
            }

        } else {//小数

            let round = ss[0]//整数部分
            let f = ss[1]//小数部分
            let sec = ''
            if (f.length < m) {
                console.log('b')
                for (let i = 0; i < m - f.length; i++) {
                    sec += '0'
                }
                sec = f + sec
            } else if (f.length == m) {
                console.log('c')
                sec = f
            } else {
                console.log('d')
                let index = f.length-1
                for (let i = f.length-1; i >= m; i--) {
                    index=i
                    console.log('index:'+index+' '+f[i])
                    if (f[i] != 0) {
                        break;
                    }
                }

                sec = f.substring(0, index+1)
            }
            return round + '.' + sec
        }
    }
}

function isNumber(value) {
    return value && value != 'null' && !Number.isNaN(Number(value))
}

function isInteger(obj) {
    return typeof obj === 'number' && obj%1 === 0
}

function accMul(num1,num2){
    var m=0,s1=num1.toString(),s2=num2.toString();
    try{m+=s1.split(".")[1].length}catch(e){};
    try{m+=s2.split(".")[1].length}catch(e){};
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}
