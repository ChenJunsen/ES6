<!--created by cjs at201812241731 从pwd-input-item里面剥离出来的独立的密码输入控件-->
<template>
    <div>
        <input :type="getType"
               :readonly="true"
               :placeholder="placeholder"
               :id="pwdId"
               v-model="pwd"
               style="text-align: right"
               @click.stop="$_onClick(`${pwdId}`)"
               @focus="$_onFocus(`${pwdId}`)"
               class="input">
    </div>
    <!--@click.stop是用来给对话框的密码控件用的，阻止父级点击域事件冒泡-->
</template>

<style lang="stylus">
    .input {
        background: transparent;
        font-size: 16px;
        outline: none;
        border: none;
        padding: 0;
    }

    input::-webkit-input-placeholder {
        color: #999
    }
</style>

<script>

    import {Component} from '@ali/kylin-framework';
    import notify from 'common/js/notify_common.vue';

    @Component
    export default class PwdInputView {
        data = {
            pwd: '',//假密码，用于填充密码黑点
            inputLen: 0,//当前的输入长度
        };

        mounted() {
            // document.addEventListener()
            L('->密码控件挂载<-');
            AlipayJSBridgeReadyFun(() => {
                //pwdId是给对应的Input框设置的id,用于在单页面多密码框情况下区分密码控件
                if (isAndroid) {
                    this.$_addPwdChangeListener();
                } else {
                    document.addEventListener(this.pwdId, this.$_onRetPas, false);
                    document.addEventListener(this.pwdId + 'Length', this.$_onRetPasLengthChange, false);
                }
            })
        };

        computed = {
            getType() {
                return isAndroid ? 'password' : 'text';
            },
            isA(){
                return isAndroid;
                // return true;//安卓基线升级后需要设置只读属性为true
            }
        };

        destroyed() {
            //防止再次渲染重复设置监听器
            if (isAndroid) {
                L('-------------->注销密码改变监听器<--------------');
                document.removeEventListener(notify.NOTIFY_PWD_CHANGE, this.$_onPwdChange, false);
            } else {
                document.removeEventListener(this.pwdId, this.$_onRetPas, false);
                document.removeEventListener(this.pwdId + 'Length', this.$_onRetPasLengthChange, false);
            }
        }

        props = {
            pwdId: {//控件id,必输，用于在多个密码控件的情况下区分
                type: String | Number | Object,
                default: "p",
                required: true
            },
            placeholder: {//输入框hint
                type: String,
                default: "xxxxxx"
            },
            pwdType: {//键盘类型，123数字(6位) abc混合(6~20位)
                type: String,
                default: '123'
            }
            /*$_model:{//私有属性(用于双向绑定,目前暂时无用)，不要直接调用
                type:String,
                default:''
            }*/
        };

        //private methods:唤出密码键盘
        $_onClick(p) {
            this.$emit('$_submitPwd_', '');
            this.$emit('onPwdLengthChange_', [0, p]);
            if (isAndroid) {
                L(p, 'inputClick');
                L(this.pwdType, '键盘类型');
                this.pwd = '';
                AlipayJSBridge_call('tempPasswordGetter', {
                    type: this.pwdType,
                    id: p
                }, res => {
                    L(res, '最终密码');
                    let encrypt = res ? res.password : '';
                    this.$emit('$_submitPwd_', encrypt);
                })
            } else {
                if (this.pwdType == '123') {
                    OCModel.callKeyboardType(p, '123');
                } else if (this.pwdType == 'abc') {
                    OCModel.callKeyboardType(p, 'abc');
                }
            }

        }

        //private methods Android:注册密码改变监听器
        $_addPwdChangeListener() {
            L('-------------->注册密码改变监听器<--------------');
            //监听页面唤醒
            document.addEventListener(notify.NOTIFY_PWD_CHANGE, this.$_onPwdChange, false);
        }

        //private methods Android:密码长度发生改变时
        $_onPwdChange(res) {
            L(res, "密码改变");
            if (res && res.data) {
                let length = res.data.length;//当前改变的长度
                let id = res.data.id;//调用tempPasswordGetter时传给原生用于区分是哪个输入框的标志
                L('len:' + length + ' id:' + id);
                this.$emit('onPwdLengthChange_', [length, id]);
                if (typeof length === 'number') {
                    this.inputLen = length;
                    let pp = '';
                    for (let i = 0; i < length; i++) {
                        pp += '0';//这个0可以是任意单个字符，用于填充*号
                    }
                    if (id === this.pwdId) {
                        this.pwd = pp;
                    }
                } else {
                    L('密码长度不是数字')
                }
            }
        }

        model = {
            prop: '$_model',
            event: '$_submitPwd_'
        };

        //private methods IOS
        $_onRetPas(res) {
            L(res, "IOSPwd");
            if (res && res.data) {
                if (res.data.length >= 6) {
                    this.$emit('$_submitPwd_', res.data.password);
                } else {
                    L('输入长度不够6位', '$_onRetPas');
                    this.$emit('$_submitPwd_', '');
                }
            } else {
                L('没有获取到密码', '$_onRetPas');
                this.$emit('$_submitPwd_', '');
            }
        }

        //private methods IOS to get immediate pwd length
        $_onRetPasLengthChange(res) {
            if (res && res.data) {
                this.$emit('onPwdLengthChange_', [res.data.length, res.data.id]);
            }
        }

        $_onFocus(id){
            L(id,'$_onFocus');
            this.$emit('onPwdFocus',id);
            //屏蔽键盘的行为由readOnly控制
            // document.activeElement.blur();//屏蔽默认键盘弹出；
        }

        //清空密码
        clear(){
            //去除黑点
            if(isAndroid){
                this.pwd='';
            }else{
                OCModel.clearValue();
            }

            //去除真实密码
            this.$emit('$_submitPwd_', '');
        }
    }

</script>
