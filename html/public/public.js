﻿/**version for TibetBank app**/
window.csiiImageUrl = 'http://nginx.csii.cd/public/pub/images/';

function isEmpty(obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}

function jumpPageAndPackage(paramDict, defaultJumpFunc) {
  // defaultJumpFunc();
  // return;
  AlipayJSBridge_call('setH5NextData', paramDict);
  AlipayJSBridge_call('getPageIndexConfig', {}, function (res) {
    var sourceUrl = document.URL.getUrlKey();
    var resultUrl = paramDict.url.getUrlKey();
    // var source = (res.pages[sourceUrl]).packageinfo;
    // var sourcePackageNum = source.substr(0, source.indexOf('-'));
    var sourcePackageNum = (res.pages[sourceUrl]).pack;//这里修改为西藏框架的解析方式
    // var result = (res.pages[resultUrl]).packageinfo;
    // var resultPackageNum = result.substr(0, result.indexOf('-'));
    var resultPackageNum = (res.pages[resultUrl]).pack;
    if (sourcePackageNum == resultPackageNum) {
      defaultJumpFunc();
    } else {
      paramDict["pageName"] = resultUrl;
      L(paramDict, '跨包传参');
      if (isiOS) {
        AlipayJSBridge_call('openPageWithName', paramDict);
      } else {
        AlipayJSBridge_call('openPageWithName', {
          pageName: paramDict.pageName,
          pageTitle: paramDict.param.defaultTitle,
          param: JSON.stringify(paramDict)
        });
      }
    }
  });
}

function checkPowerWithTransactionId(paramObj, runFun) {
  if (true) {
    runFun();
  } else {
    AlipayJSBridge_call('showLoginToAuth', {}, function (data) {
      runFun();
    });
  }
  return true;
}

var powerArray = ["tool-msg-service", "tool-msg-acc-notice", "tool-msg-manager", "tool-msg-active", "pay-happypay-orderpage", "pay-happypay-qrcoderst", "jiangyuhui-shop-mycollections", "jiangyuhui-shop-details-topay", "loan-repay-list", "loan-ious-detail-one", "loan-disburse", "loan-onedisburse", "loan-product-intro", "loan-application-allpro", "loan-haveloan", "financing-financial-buyfinancing", "financing-financial-holding-details", "financing-financial-myheartchoice", "financing-financial-myholding", "financing-financial-redeem", "financing-financial-risktest", "financing-financial-risktest-answertwo", "financing-financial-trsdetails", "financing-financial-trsxiangqing", "financing-fund-changbonus", "financing-fund-buyfund", "financing-fund-confundpro", "financing-fund-confundpro-seemore", "financing-fund-detailsof-holdingincome", "financing-fund-fixedinv-xiangqing", "financing-fund-fundfixedinvestment", "financing-fund-holding-details", "financing-fund-holding-trsdetails", "financing-fund-myfixedinvestment", "financing-fund-redemption", "financing-fund-seetrs-details", "financing-fund-transrecord", "financing-fund-trsxiangqing", "financing-fundsigning-continuesigning", "financing-fundsigning-editcustomerinfo", "financing-fundsigning-manage", "financing-fundsigning-myholding", "financing-fundsigning-risktest", "financing-fundsigning-risktest-answerone", "financing-fundsigning-see-customerinfo", "member-center", "member-add-drivinglicence", "member-add-houselicence", "member-add-workinformation", "member-add-xdrivinglicence", "member-already-upload-photo", "member-chooseworkaddr", "member-education-information", "member-happyvalu", "e-descmember-mypleasantmember-submit-success"];

function isInArray(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      return true;
    }
  }
  return false;
}

function checkPowerWithPageId(paramObj, runFun) {
  if (!isInArray(powerArray, paramObj.url.getUrlKey())) {
    runFun();
  } else {
    AlipayJSBridge_call('showLoginToAuth', {}, function (data) {
      runFun();
    });
  }
  return true;
}

function setTestData(key, data) {
  sessionStorage.setItem('testData' + key, JSON.stringify(data));
}

function getTestData(key) {
  return JSON.parse(sessionStorage.getItem('testData' + key));
}


function restore(vueObject) {
  var result = null;
  var type = Object.prototype.toString.call(vueObject);

  switch (type) {
    case '[object Array]':
      result = toArray(vueObject);
      break;

    case '[object Object]':
      result = toObject(vueObject);
      break;

    default:
      result = vueObject;
      break;
  }

  function toArray(vueArray) {
    var array = [];

    for (var index in vueArray) {
      var item = restore(vueArray[index]);
      array.push(item);
    }

    return array;
  }

  function toObject(vueObject) {
    var obj = new Object();

    for (var index in vueObject) {
      var item = restore(vueObject[index]);
      obj[index] = item;
    }

    return obj;
  }

  return result;
};


function convertParam(vueObject) {
  var result = null;
  var type = Object.prototype.toString.call(vueObject);

  switch (type) {
    case '[object Array]':
      result = toArrayDictionary(vueObject);
      break;

    case '[object Object]':
      result = toObjectArray(vueObject);
      break;
    default:
      result = vueObject;
      break;
  }

  function toArrayDictionary(vueArray) {
    var obj = new Object();
    for (var index in vueObject) {
      var item = convertParam(vueObject[index]);
      obj[index] = item;
    }
    return {
      _ArrayObject: obj
    };
  }

  function toObjectArray(vueObject) {
    var obj = new Object();
    var isArray = false;
    for (var index in vueObject) {
      if (index == '_ArrayObject') {
        isArray = true;
        break;
      }
      var item = convertParam(vueObject[index]);
      obj[index] = item;
    }
    if (isArray) {
      var array = [];
      var arrayObject = vueObject['_ArrayObject'];
      for (var index in arrayObject) {
        var item = convertParam(arrayObject[index]);
        array.push(item);
      }
      return array;
    } else {
      return obj;
    }
  }

  return result;
};


(function () {
  var htmlFontSize = document.documentElement.clientWidth / 375 * 100 + 'px';
  var bodyFontSize = '0.16rem';
  var styleDom = document.createElement('style');
  styleDom.innerHTML = 'html{font-size:' + htmlFontSize + '!important;}body{font-size:' + bodyFontSize + '!important;}';
  document.getElementsByTagName('head')[0].appendChild(styleDom)
})();


//字符串扩展，将带转义字符的字符串，在去除引号和反斜杠后，转化为标准json字符串
String.prototype.toJSONString = function () {
  var count = 0;
  var v = true;
  var val = JSON.stringify(this);
  for (; v;) {
    if (val.indexOf('"{') == -1 && val.indexOf('"[{') == -1) {
      v = false;
    } else {
      count++;
      val = val.replace(new RegExp("\\\\", "g"), ''); //去掉反斜杠
      val = val.replace(new RegExp('"{', "g"), '{');
      val = val.replace(new RegExp('}"', "g"), '}');
      const reg = /"(\[\{.*?\}\])"/g; //这个每次只会去掉第一层的，所以需要递归查询
      //              var reg = /"(\[.*?\])"/g;
      val = val.replace(reg, '$1');
      const reg2 = /"(\[.*?\])"/g;
      val = val.replace(reg2, '$1');
    }
  }
  console.log('查找了:' + count + '次')
  return val;
}

//截取url中指定的字符，
String.prototype.getUrlKey = function () {
  return this.replace(/(.*\/)*([^.]+).*/ig, "$2");
}

function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  console.log('GetRequest:' + JSON.stringify(theRequest));
  return theRequest;
}

function deepClone(obj) {
  var objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        //判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          //如果不是，简单复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//var m_document_addEventListener = document.addEventListener;
//var m_document_removeEventListener = document.removeEventListener;
//
//
//if (isiOS) {
//    document.addEventListener = function (evt, handler, capture) {
//        var e = evt.toLowerCase();
//        AlipayJSBridge_call('addEventName', {
//            event: e,
//            func: handler.toString()
//        });
//        m_document_addEventListener.call(document, evt, handler, capture);
//    };
//    document.removeEventListener = function (evt, handler, capture) {
//        var e = evt.toLowerCase();
//        AlipayJSBridge_call('removeEventName', {
//            event: e,
//            func: handler.toString()
//        });
//        m_document_removeEventListener.call(document, evt, handler, capture);
//    };
//}


var isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) != null;

var isPushWeb = GetRequest().jumpType == 'Web';
// var isPushWindow = GetRequest().jumpType == 'Window';
var isPushWindow = !isPushWeb;

function AlipayJSBridgeReadyFun(readyCallback) {
  function ready(callback) {
    // 如果 jsbridge 已经注入则直接调用
    if (window.AlipayJSBridge) {
      callback && callback();
    } else {
//            // 如果没有注入则监听注入的事件
//            if (isAndroid) {
      document.addEventListener('AlipayJSBridgeReady', callback, false);
//            } else if (isiOS) {
//                // document.addEventListener('AlipayJSBridgeReady', callback, false);
//                m_document_addEventListener('AlipayJSBridgeReady', callback, false);
//            }
    }
  }

  ready(readyCallback);
}

//鉴权
function AlipayJSBridge_auth(authTypes, transCode, successFun, errFun, acctNo) {
  let p = {
    "authTypes": authTypes,
    "transCode": transCode
  }
  if (acctNo) {
    p.acctNo = acctNo
  }
  AlipayJSBridge_call('transactionCertification', p, function (res) {
    if (res['authState'] == 'S') {
      if (typeof successFun == 'function') {
        successFun();
      }
    } else {
      if (typeof errFun == 'function') {
        errFun();
      }
    }
  });
}

//人脸识别，单独调用
function AlipayJSBridge_face(transCode, successFun, errFun) {
  AlipayJSBridge_auth('00000000000000002', transCode, successFun, errFun);
}

//扫描银行卡
function AlipayJSBridge_scanBankCard(transCode, successFun) {
  AlipayJSBridge_call('getCardNumberFromOCR', {
    transCode: transCode
  }, function (res) {
    L(JSON.stringify(res), '银行卡扫描');
    if (typeof successFun === 'function') {
      successFun(res);
    }
  });
}

//扫描身份证号（正面）
function AlipayJSBridge_scanIdCard(transCode, successFun) {
  AlipayJSBridge_call('getIDNumber', {
    transCode: transCode,
    position: 'front'
  }, function (res) {
    L(JSON.stringify(res), '身份证扫描');
    if (typeof successFun === 'function') {
      successFun(res);
    }
  });
}

//H5跳转原生涉税信息页面
function AlipayJSBridge_CallNativeTax(param) {
  AlipayJSBridge_call('openNativePage', {
    pageAndroid: 'setting.tax_info',
    pageiOS: 'LoginEnterTaxInfoViewController',
    nodeType: 'Native',
    jumpType: 'PushRoot',
    menuParam: JSON.stringify(param)
  })
}

function createHistoryObject() {
  if (isEmpty(sessionStorage.getItem("historyString"))) {
    sessionStorage.setItem("historyString", document.URL.getUrlKey());
  }
}

function pushHistoryObject(historyObject) {
  if (sessionStorage.getItem("historyString")) {
    var historyString = sessionStorage.getItem("historyString");
    var historyArray = historyString.split(',');
    if (historyArray[historyArray.length - 1] != historyObject) {
      historyArray.push(historyObject);
    }
    historyString = historyArray.join(',');
    sessionStorage.setItem("historyString", historyString);
  }
}

function popHistoryObject() {
  if (sessionStorage.getItem("historyString")) {
    var historyString = sessionStorage.getItem("historyString");
    var historyArray = historyString.split(',');
    historyArray.pop();
    historyString = historyArray.join(',');
    sessionStorage.setItem("historyString", historyString);
  }
}

function popHistoryObjectTo(n) {
  if (sessionStorage.getItem("historyString")) {
    var historyString = sessionStorage.getItem("historyString");
    var historyArray = historyString.split(',');
    for (var i = 0; i < n * -1; i++) {
      historyArray.pop();
    }
    historyString = historyArray.join(',');
    sessionStorage.setItem("historyString", historyString);
  }
}

function getHistoryObject() {
  if (sessionStorage.getItem("historyString")) {
    var historyString = sessionStorage.getItem("historyString");
    var historyArray = historyString.split(',');
    if (historyArray.length > 1) {
      return historyArray[historyArray.length - 2];
    } else {
      return '';
    }
  } else {
    return '';
  }
}

function deepObjectassign(FirstOBJ, SecondOBJ) { // 深度合并对象
  for (var key in SecondOBJ) {
    FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ?
      deepObjectassign(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
  }
  return FirstOBJ;
}

if (isiOS) {
  function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }

  setupWebViewJavascriptBridge(function (bridge) {
    window.AlipayJSBridge = bridge;
    var evt = document.createEvent('Events');
    evt.initEvent('AlipayJSBridgeReady', false, false);
    document.dispatchEvent(evt);
  });
} else {
  //新版JS桥接
  function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener('AlipayJSBridgeReady', function () {
        callback(WebViewJavascriptBridge)
      }, false)
    }
  }

  connectWebViewJavascriptBridge(function (bridge) {
    window.AlipayJSBridge = bridge;
  })

  //监听原生init
  AlipayJSBridge_init(function (message, responseCallback) {
    responseCallback({'init': 'success'})
  })
}

function document_addEventListener(eventName, eventCallback) {
  AlipayJSBridgeReadyFun(function () {
    AlipayJSBridge.registerHandler(eventName, function (data, responseCallback) {
      L(eventName+': '+JSON.stringify(data))
      let prevent = false;
      eventCallback({
        data: data,
        preventDefault: function () {
          prevent = true;
          responseCallback(
            {
              "state": "false",
              "preventDefault": prevent + ""
            });
        }
      });
      if (prevent == false) {
        responseCallback({"state": "success"});
      }
    })
  });
}

function AlipayJSBridge_MessageHandlerNames() {
  var messageHandlers = AlipayJSBridge.messageHandlers;
  return Object.keys(messageHandlers);
}

/*END***********************************************************************************/
function AlipayJSBridge_call(rpcStr, paramDict, successFun, errorFun) {
  AlipayJSBridgeReadyFun(function () {
    if (rpcStr == 'rpc') {
      function rpcFun() {
        if (paramDict['headers']) {
          paramDict['headers']['type'] = "Web";
        } else {
          paramDict['headers'] = {
            "type": "Web"
          };
        }

        if (!window.__hasLunaMock) {
          if (paramDict['requestData']) {
            paramDict['requestData'] = [paramDict['requestData']];
          } else {
            paramDict['requestData'] = [{}];
          }
        }
        paramDict.timeout = '30';
        AlipayJSBridge.call('rpc', paramDict, function (result) {
          if (result && !result.error) {
            if (result["_RejCode"] == "000000") {
              successFun(result);
              // return true;
            } else {
              try {
                if (typeof errorFun === "function") {
                  errorFun(result);
                } else {
                  // alert(result._RejMsg);
                  return;
                }
              } catch (e) {
              }
              // alert("业务异常信息:" + result.Info);
              // return false;
              AlipayJSBridge_call('closeActivityIndicator');
            }
          } else if (result && result.error) {
            //MARK:RPC CACHE 3.H5判断无网络调用原生接口从缓存拿数据的逻辑

            // if (isiOS) {
            if (result.error == 10) {
              AlipayJSBridge.call('getOffLineData', {
                cachePageId: document.URL.getUrlKey(),
                interface: paramDict.operationType
              }, function (result) {
                if (result.have) {
                  console.log(result.data);
                  try {
                    successFun(JSON.parse(result.data));
                  } catch (e) {
                  }
                }
              });
            }
            // }

            AlipayJSBridge_call('closeActivityIndicator');
            // alert("系统异常信息:" + result.error); //这部分由原生处理可以知道状态但是不必弹框
            // return false;
          } else {
            if (typeof errorFun === "function") {
              errorFun("系统异常信息:无返回结果");
            }
            AlipayJSBridge_call('closeActivityIndicator');
            // alert("系统异常信息:无返回结果");
            // return false;
          }
        });
      }

      //获取登录状态"getLoginState"
      AlipayJSBridge_call('getLoginState', {}, function (result) {
        //未登录
        if (result.isLoginFlag == 'N') {
          checkPowerWithTransactionId(paramDict, rpcFun);
        } else if (result.isLoginFlag == 'Y') {
          rpcFun();
        }
      });


    } else if (rpcStr == 'pushWindow') {
      function pushWindowFun() {
//                var  darkurl='?jumpType=Web&appStyle='+window.appStyle;
//                paramDict.url += darkurl;
//                
//                var param = paramDict["param"];
//                var deep = deepClone(paramDict);
//                var resultObj = deepObjectassign(param ? param : {}, deep);
//                paramDict["param"] = resultObj;
//
//                paramDict.param.showLoading = true;
//                // 页面是否支持下拉（显示出黑色背景或者域名）
//                // 只有*.alipay.com/*.alipay.net/本地文件允许设置为NO
//                // 9.9.5废弃， 使用'allowsBounceVertical'替代
//                paramDict.param.canPullDown = 'NO';
//                paramDict.param.allowsBounceVertical = 'NO';
//
//                if(window.appStyle == 'dark'){
//                    paramDict.param.backgroundColor = '000';
//                }
        paramDict.url += '?jumpType=Window';

        var param = paramDict["param"];
        var deep = deepClone(paramDict);
        var resultObj = deepObjectassign(param ? param : {}, deep);
        paramDict["param"] = resultObj;

        var passData = paramDict["passData"];
        deep = deepClone(paramDict);
        resultObj = deepObjectassign(passData ? passData : {}, deep);
        paramDict["passData"] = resultObj;

        paramDict.param.showLoading = false;
        // 页面是否支持下拉（显示出黑色背景或者域名）
        // 只有*.alipay.com/*.alipay.net/本地文件允许设置为NO
        // 9.9.5废弃， 使用'allowsBounceVertical'替代
        paramDict.param.canPullDown = 'NO';
        paramDict.param.allowsBounceVertical = 'NO';
        if (window.appStyle == 'dark') {
          paramDict.param.backgroundColor = '000';
        }
        if (isiOS) {
          paramDict = convertParam(paramDict);
        }

        jumpPageAndPackage(paramDict, function () {
          AlipayJSBridge.call('pushWindow', paramDict);
        });
      }


      AlipayJSBridge_call('isDisablePageTimeFunc', {
        pageName: paramDict.url.getUrlKey()
      }, function (res) {
        if (res.isUsable == 'Y') {
          //获取登录状态"getLoginState"
          AlipayJSBridge_call('getLoginState', {}, function (result) {
            //未登录
            if (result.isLoginFlag == 'N') {
              checkPowerWithPageId(paramDict, pushWindowFun);
            } else if (result.isLoginFlag == 'Y') {
              pushWindowFun();
            }
          });
        }
      });

    } else if (rpcStr == 'pushWeb') {

      function pushWebFun() {
        var darkurl = '?jumpType=Web&appStyle=' + window.appStyle;
        paramDict.url += darkurl;
        var param = paramDict["param"];
        var deep = deepClone(paramDict);
        var resultObj = deepObjectassign(param ? param : {}, deep);
        paramDict["param"] = resultObj;

        paramDict.param.showLoading = true;
        // 页面是否支持下拉（显示出黑色背景或者域名）
        // 只有*.alipay.com/*.alipay.net/本地文件允许设置为NO
        // 9.9.5废弃， 使用'allowsBounceVertical'替代
        paramDict.param.canPullDown = 'NO';
        paramDict.param.allowsBounceVertical = 'NO';

        if (window.appStyle == 'dark') {
          paramDict.param.backgroundColor = '000';
        }

        jumpPageAndPackage(paramDict, function () {

          var url = paramDict.url;
          console.log('pushWeb:' + url + '->' + url.getUrlKey());
          sessionStorage.setItem(url.getUrlKey(), JSON.stringify(paramDict));
          pushHistoryObject(url.getUrlKey());
          if (!window.__hasLunaMock && isiOS) {
            AlipayJSBridge.call('pushWeb', paramDict, function (result) {
              window.location.href = paramDict.url;
            });
          } else {
            window.location.href = paramDict.url;
          }
        });
      }

      AlipayJSBridge_call('isDisablePageTimeFunc', {
        pageName: paramDict.url.getUrlKey()
      }, function (res) {
        if (res.isUsable == 'Y') {
          //获取登录状态"getLoginState"
          AlipayJSBridge_call('getLoginState', {}, function (result) {
            //未登录
            if (result.isLoginFlag == 'N') {
              checkPowerWithPageId(paramDict, pushWebFun);
            } else if (result.isLoginFlag == 'Y') {
              pushWebFun();
            }
          });
        }
      });
    } else if (rpcStr == 'popWeb') {
      AlipayJSBridge_call('setH5PreData', paramDict);
      if (paramDict && paramDict["param"]) {
        console.log(JSON.stringify(paramDict, null, 4));
        var param = paramDict["param"];
        var deep = deepClone(paramDict);
        var resultObj = deepObjectassign(param ? param : {}, deep);
        paramDict["param"] = resultObj;

        paramDict = JSON.stringify(paramDict);
        paramDict = paramDict.toJSONString();
        paramDict = JSON.parse(paramDict);
      }


      if (window.history.length == 1) {
        AlipayJSBridge.call('popWindow', paramDict);
        return;
      }
      if (paramDict) {
        paramDict.url += '?jumpType=Web';
      }


      popHistoryObject();


      if (!window.__hasLunaMock && isiOS) {
        AlipayJSBridge.call('popWeb', paramDict, function (result) {
          window.history.go(-1);
        });
      } else {
        window.history.go(-1);
      }
    } else if (rpcStr == 'popWebTo') {
      AlipayJSBridge_call('setH5PreData', paramDict);
      if (paramDict && paramDict["param"]) {
        console.log(JSON.stringify(paramDict, null, 4));
        var param = paramDict["param"];
        var deep = deepClone(paramDict);
        var resultObj = deepObjectassign(param ? param : {}, deep);
        paramDict["param"] = resultObj;

        paramDict = JSON.stringify(paramDict);
        paramDict = paramDict.toJSONString();
        paramDict = JSON.parse(paramDict);
      }


      if (window.history.length == 1) {
        AlipayJSBridge.call('popWindow', paramDict);
        return;
      }
      if (paramDict) {
        paramDict.url += '?jumpType=Web';
      }


      popHistoryObjectTo(paramDict.historyStep);


      if (!window.__hasLunaMock && isiOS) {
        AlipayJSBridge.call('popWeb', paramDict, function (result) {
          window.history.go(paramDict.historyStep);
        });
      } else {
        window.history.go(paramDict.historyStep);
      }
    } else if (rpcStr == 'removeTempView') {
      if (!window.__hasLunaMock && isiOS) {
        AlipayJSBridge.call('removeTempView');
      }
    } else if (rpcStr == 'popWindow' || rpcStr == 'popTo') {
      AlipayJSBridge_call('setH5PreData', paramDict);
      AlipayJSBridge.call(rpcStr, paramDict, successFun);
    } else if (rpcStr == 'popToRootPage') {
      AlipayJSBridge.call('popToRootPage', paramDict);
    } else if (rpcStr == 'setTitle') {
      AlipayJSBridge.call('setTitle', paramDict);
    } else if (rpcStr == 'getCardNumberFromOCR') {
      if (typeof paramDict === "function") {
        AlipayJSBridge.call('getCardNumberFromOCR', {}, paramDict);
      } else {
        AlipayJSBridge.call('getCardNumberFromOCR', paramDict, successFun);
      }
    } else if (rpcStr == 'getUserFromAddressBook') {
      if (typeof paramDict === "function") {
        AlipayJSBridge.call('getUserFromAddressBook', {}, paramDict);
      } else {
        AlipayJSBridge.call('getUserFromAddressBook', paramDict, successFun);
      }
    } else if (rpcStr == 'transactionCertification') {
      AlipayJSBridge.call('transactionCertification', paramDict, successFun);
    } else if (rpcStr == 'setAPDataStorage') {
      AlipayJSBridge.call('setAPDataStorage', paramDict, successFun);
    } else if (rpcStr == 'getAPDataStorage') {
      AlipayJSBridge.call('getAPDataStorage', paramDict, successFun);
    } else if (rpcStr == 'getLoginState') {

      if (paramDict.url) {
        AlipayJSBridge_call('isDisablePageTimeFunc', {
          pageName: paramDict.url.getUrlKey()
        }, function (res) {
          if (res.isUsable == 'Y') {
            AlipayJSBridge.call('getLoginState', paramDict, successFun);
          }
        });
      } else {
        AlipayJSBridge.call('getLoginState', paramDict, successFun);
      }

    } else if (rpcStr == 'showLoginToAuth') {
      AlipayJSBridge.call('showLoginToAuth', paramDict, successFun);
    } else if (rpcStr == 'loadImageFunc') {
      AlipayJSBridge.call('loadImageFunc', paramDict, successFun);
    } else if (rpcStr == 'closeMongolianLayer') {
      AlipayJSBridge.call('closeMongolianLayer', paramDict, successFun);
    } else if (rpcStr == 'setOptionMenu') {
      AlipayJSBridge.call('setOptionMenu', paramDict);
    } else if (rpcStr == 'closeActivityIndicator') {
      AlipayJSBridge.call('closeActivityIndicator', paramDict);
    } else if (rpcStr == 'hideBackButton') {
      AlipayJSBridge.call('hideBackButton', paramDict);
    } else if (rpcStr == 'openVoiceTransfer') {
      AlipayJSBridge.call('openVoiceTransfer', paramDict);
    } else if (rpcStr == 'openAIService') {
      AlipayJSBridge.call('openAIService', paramDict);
    } else if (rpcStr == 'openPageWithName') {
      AlipayJSBridge.call('openPageWithName', paramDict);
    } else if (rpcStr == 'addEventName') {
      AlipayJSBridge.call('addEventName', paramDict);
    } else if (rpcStr == 'removeEventName') {
      AlipayJSBridge.call('removeEventName', paramDict);
    } else if (rpcStr == 'setJumpPackageObject') {
      AlipayJSBridge.call('setJumpPackageObject', paramDict, successFun);
    } else if (rpcStr == 'setJumpPackageData') {
      AlipayJSBridge.call('setJumpPackageData', paramDict);
    } else if (rpcStr == 'getJumpPackageObject') {
      AlipayJSBridge.call('getJumpPackageObject', paramDict, successFun);
    } else if (rpcStr == 'showOptionMenu') {
      AlipayJSBridge.call('showOptionMenu');
    } else if (rpcStr == 'getPageIndexConfig') {
      AlipayJSBridge.call('getPageIndexConfig', paramDict, successFun);
    } else if (rpcStr == 'uploadFileWithBase64') {
      AlipayJSBridge.call('uploadFileWithBase64', paramDict, successFun);
    } else if (rpcStr == 'showActivity') {
      AlipayJSBridge.call('showActivity', paramDict);
    } else if (rpcStr == 'setH5NextData') {
      AlipayJSBridge.call('setH5NextData', paramDict);
    } else if (rpcStr == 'setH5PreData') {
      AlipayJSBridge.call('setH5PreData', paramDict);
    } else if (rpcStr == 'popPackageTo') {
      AlipayJSBridge.call('popPackageTo', paramDict);
    } else if (rpcStr == 'closeScroll') {
      AlipayJSBridge.call('closeScroll', paramDict);
    } else if (rpcStr == 'openScroll') {
      AlipayJSBridge.call('openScroll', paramDict);
    } else if (rpcStr == 'exitApp') {
      AlipayJSBridge.call('exitApp', paramDict);
    } else if (rpcStr == 'hideActivity') {
      AlipayJSBridge.call('hideActivity', paramDict);
    } else if (rpcStr == 'openNativePage') {
      if (isiOS) {
        paramDict = convertParam(paramDict);
      }
      AlipayJSBridge.call('openNativePage', paramDict, successFun);
    } else if (rpcStr == 'isDisablePageTimeFunc') {
      AlipayJSBridge.call('isDisablePageTimeFunc', paramDict, successFun);
    } else if (rpcStr == 'disBusGroupList') {
      AlipayJSBridge.call('disBusGroupList', paramDict, successFun);
    } else if (rpcStr == 'currentServerTime') {
      AlipayJSBridge.call('currentServerTime', paramDict, successFun);
    } else if (rpcStr == 'startApp') {

      var param = paramDict["param"];
      var deep = deepClone(paramDict);
      var resultObj = deepObjectassign(param ? param : {}, deep);
      paramDict["param"] = resultObj;

      var passData = paramDict["passData"];
      deep = deepClone(paramDict);
      resultObj = deepObjectassign(passData ? passData : {}, deep);
      paramDict["passData"] = resultObj;

      AlipayJSBridge.call('startApp', paramDict, successFun);
    } else if (rpcStr == 'startH5App') {

      var param = paramDict["param"];
      var deep = deepClone(paramDict);
      var resultObj = deepObjectassign(param ? param : {}, deep);
      paramDict["param"] = resultObj;

      var passData = paramDict["passData"];
      deep = deepClone(paramDict);
      resultObj = deepObjectassign(passData ? passData : {}, deep);
      paramDict["passData"] = resultObj;

      AlipayJSBridge.call('startH5App', paramDict, successFun);
    } else if (rpcStr == 'remoteLog') {
      AlipayJSBridge.call('buryPointAttr', {}, function (result) {
        var publicObj = result;
        console.log(publicObj, 'buryPointAttr');
        paramDict.param4 = Object.assign(paramDict.param4, publicObj);
        console.log(paramDict, 'buryPointAttraaaaaaaaaaaa');
        AlipayJSBridge.call('remoteLog', paramDict, successFun);
      });
    } else if (rpcStr == 'toast') {
      AlipayJSBridge.call('toast', paramDict, successFun);
    } else {
      AlipayJSBridge.call(rpcStr, paramDict, successFun);
    }
  });
}

function AlipayJSBridge_setAPDataStorage(key, value) {
  AlipayJSBridge.call('setAPDataStorage', {
    type: "common",
    key: key,
    value: value
  }, function (result) {
    console.log('AlipayJSBridge_setAPDataStorage:' + JSON.stringify(result));
  });
}

function AlipayJSBridge_getAPDataStorage(key) {
  AlipayJSBridge.call('getAPDataStorage', {
    type: "common",
    key: key,
  }, function (result) {
    console.log('AlipayJSBridge_getAPDataStorage:' + JSON.stringify(result));
  });
}

//包装方法 H5调用原生初始化
function AlipayJSBridge_init(callback) {
  AlipayJSBridgeReadyFun(function () {
    AlipayJSBridge.init(callback);
  });
}

//非es6方法判断是否是数组
function isArrayFn(o) {
  return Object.prototype.toString.call(o) === '[object Array]';
}

function AlipayJSBridge_startupParams(paramCallBack) {
  AlipayJSBridgeReadyFun(function () {
    if (isPushWeb) {
      var currentUrl = document.URL;
      console.log('AlipayJSBridge_startupParams:' + currentUrl + '->' + currentUrl.getUrlKey());
      var paramDict = deepClone(JSON.parse(sessionStorage.getItem(currentUrl.getUrlKey())));

      var param = paramDict["param"];
      var deep = deepClone(paramDict);
      var resultObj = deepObjectassign(param ? param : {}, deep);
      paramDict = resultObj;

      paramCallBack(paramDict);
    } else {
      if (window.__hasLunaMock) {
        AlipayJSBridge.startupParams = JSON.parse(sessionStorage.getItem("AlipayJSBridge.startupParams"))
      }

      function startupParamsFunc() {
        L(AlipayJSBridge.startupParams, '没有处理过的参数');
        if (AlipayJSBridge.startupParams && AlipayJSBridge.startupParams != null) {

          if (AlipayJSBridge.startupParams.hasOwnProperty("passData") && Object.prototype.toString.call(AlipayJSBridge.startupParams["passData"]) === "[object String]") {
            AlipayJSBridge.startupParams["passData"] = JSON.parse(AlipayJSBridge.startupParams["passData"]);
          }

          if (AlipayJSBridge.startupParams.hasOwnProperty("param") && Object.prototype.toString.call(AlipayJSBridge.startupParams["param"]) === "[object String]") {
            AlipayJSBridge.startupParams["param"] = JSON.parse(AlipayJSBridge.startupParams["param"]);
          }


          var param = AlipayJSBridge.startupParams["param"];

          if (!isArrayFn(param)) {
            try {
              param = JSON.parse(param);
            } catch (e) {
            }
          }
          if (typeof param === 'object' && !isArrayFn(param)) {
            var deep = deepClone(AlipayJSBridge.startupParams);
            var resultObj = deepObjectassign(param ? param : {}, deep);
            AlipayJSBridge.startupParams = resultObj;
          }
          var res = JSON.stringify(AlipayJSBridge.startupParams);

          try {
            res = res.toJSONString();
            res = JSON.parse(res);
          } catch (error) {

          }

          if (isiOS) {
            res = convertParam(res);
            res = deepObjectassign(res, res["passData"]);
          }

          L(res, '最终获取参数');
          paramCallBack(res);
        } else {
          console.log('pushWindow没有传参');
        }
      };

      if (isiOS) {
        startupParamsFunc();
      } else {
        AlipayJSBridge_call('startupParams', {}, function (res) {
          AlipayJSBridge.startupParams = res;
          startupParamsFunc();
        });
      }


    }
  });
}

/**
 * 获取通过href跳转页面的参数
 * @constructor
 */
function Get_Location_param() {
  var url = location.search; //获取url中"?"符后的字串
  console.log('search:' + url);
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      var ps = strs[i].split("=");
      theRequest[ps[0]] = JSON.parse(decodeURI(ps[1])); //反序列化
    }
  }
  return theRequest;
}

function L(log, tag) {
  if (typeof log === 'object') {
    console.log("%c" + (tag ? tag : "") + "[这是一个对象]:",
      "color: #FFFF00; background: black;font-size:15px;font-weight:bold;",
      log);

    console.log(log);
  } else {
    if (tag) {
      console.log("%c" + tag,
        "color: #FFFF00; background: black;font-size:15px;font-weight:bold;",
        log);
    }
    console.log("%c%s",
      "color: #cb097b; background: black;font-size:20px;font-weight:bold;",
      log);
  }
}

(function () {
  var ie = !!(window.attachEvent && !window.opera);
  var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
  var fn = [];
  var run = function () {
    for (var i = 0; i < fn.length; i++) fn[i]();
  };
  var d = document;
  d.ready = function (f) {
    if (!ie && !wk && d.addEventListener)
      return d.addEventListener('DOMContentLoaded', f, false);
    if (fn.push(f) > 1) return;
    if (ie)
      (function () {
        try {
          d.documentElement.doScroll('left');
          run();
        } catch (err) {
          setTimeout(arguments.callee, 0);
        }
      })();
    else if (wk)
      var t = setInterval(function () {
        if (/^(loaded|complete)$/.test(d.readyState))
          clearInterval(t), run();
      }, 0);
  };
})();

function isEmptyStr(val) {
  return val === null || val === '' || val === undefined;
}

document.ready(function () {
  console.log("Document is ready!");
  console.log(new Date().getTime());
  console.log(window.history);
  var currentUrl = document.URL;
  var uKey = currentUrl.getUrlKey();
  L(uKey, '当前的页面urlKey');
  var uKeyDataOri = sessionStorage.getItem(uKey);
  L(uKeyDataOri, "当前的页面uKeyDataOri");
  var uKeyDataParse = JSON.parse(uKeyDataOri);
  L(uKeyDataParse, "当前的页面uKeyDataParse");

  if (isPushWeb) {
    var webTitle = JSON.parse(sessionStorage.getItem(currentUrl.getUrlKey()))['param'].defaultTitle;
    if (!isEmptyStr(webTitle)) {
      console.log('popWeb标题:' + webTitle);
      AlipayJSBridge_call('setTitle', {
        'title': webTitle
      });
    } else {
      console.log('webTitle没有获取到,尝试获取webTitle2');
      var webTitle2 = "";
      if (!isEmpty(AlipayJSBridge) && AlipayJSBridge.startupParams) {
        webTitle2 = AlipayJSBridge.startupParams.defaultTitle;
      }

      if (isEmptyStr(webTitle2)) {
        if (AlipayJSBridge.startupParams.param) {
          webTitle2 = AlipayJSBridge.startupParams.param.defaultTitle;
        }
      }
      if (!isEmptyStr(webTitle2)) {
        AlipayJSBridge_call('setTitle', {
          'title': webTitle2
        });
      } else {
        console.error('设置标题失败');
      }
    }
  } else if (isPushWindow) {
  } else {
    if (!isEmpty(AlipayJSBridge) && AlipayJSBridge.hasOwnProperty["startupParams"] && AlipayJSBridge.startupParams.hasOwnProperty["defaultTitle"]) {
      var t1 = AlipayJSBridge.startupParams.defaultTitle;
      if (isEmptyStr(t1)) {
        if (AlipayJSBridge.startupParams.param) {
          t1 = AlipayJSBridge.startupParams.param.defaultTitle;
        }
      }
      AlipayJSBridge_call('setTitle', {
        'title': t1
      });
    }
  }
});

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      oldonload();
      func();
    }
  }
}

addLoadEvent(function () {
  console.log("Window is load!");
  console.log(new Date().getTime());

  createHistoryObject(); //构建历史对象

  AlipayJSBridge_call('removeTempView');
  if (isPushWeb) {
    document_addEventListener('back', function (pushWebEvent) {
      //pushWebEvent.preventDefault();
      AlipayJSBridge_call('popWeb');
    }, false);
  }
});
