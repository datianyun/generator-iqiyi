(function($,root){

    root.QY = root.QY||{};

    root.QY={

        // 取得URL上参数
        getParams: function(strParamName,url){
            var strReturn,strHref,bFound,cmpstring,cmplen;
            if(url===undefined){
                strHref = window.location.href.toUpperCase();
            }else{
                strHref = url.toUpperCase();
            }
            bFound = false;
            cmpstring = strParamName.toUpperCase() + "=";
            cmplen = cmpstring.length;
            if (strHref.indexOf("?") > -1){
                var strQueryString,aQueryString;
                strQueryString = strHref.substr(strHref.indexOf("?") + 1);
                aQueryString = strQueryString.split("&");
                for (var iParam = 0; iParam < aQueryString.length; iParam++){
                    if (aQueryString[iParam].substr(0, cmplen) == cmpstring){
                        var aParam = aQueryString[iParam].split("=");
                        strReturn = aParam[1];
                        bFound = true;
                        break;
                    }
                }
            }
            if (bFound === false) return null;
            return strReturn;
        },

        //统计log，用img的src传，减少AJAX调用
        Statistics:{
            /**
             * @cfg {String} base
             * base url 
             */
            base: 'http://partner.vip.qiyi.com/mobact2rd/log?',
            
            /**
             * @privare
             */
            params: function(code) {
                var i, params = {};
                if (typeof code === 'string') {
                    params._once_ = code;
                    params._dc = (+new Date());
                }
                else {
                    for (i in code) {
                        params[i] = code[i];
                    }
                }
                
                return this.appendParams(params);
            },
            
            /*
             * @private
             */
            appendParams: function(params) {
                var i, paramsArray = [];
                
                for (i in params) {
                    if (params.hasOwnProperty(i)) {
                        paramsArray.push(i + '=' + params[i]);
                    }
                }
                return paramsArray.join('&');
            },
            
            /**
             * 发送一个简单的统计请求
             * @public
             * @param {String} code 统计码
             * @param {String} base (optional) 统计请求文件地址
             * 
             * example: add _once_
             * Statistics.addStatistics('000027_back2top');
             * 
             * example: add _once_ & _trans_
             * QY.Statistics.addStatistics({
             *     '_once_': '000095_video_newsfinal',
             *     '_trans_': 'aaa'
             * });
             */
            addStatistics: function(code, base) {
                var image;
                
                base = base || this.base;
                
                image = new Image(1, 1);
                image.src = base + this.params(code);
            },
            
            /**
             * 委托事件发送统计请求 
             */
            addGlobalSupport: function() {
                var that = this;
                
                $('body').on('touchend', '[data-code]', ontouchend);
                function ontouchend(e) {
                    var target, parent, code;
                    e.preventDefault();
                    e.stopPropagation();
                    //console.log(this);
                    
                    target = e.target;
                    parent = target.parentNode;
                    if ((code = target.getAttribute('data-code')) || (code = parent.getAttribute('data-code'))) {
                        that.addStatistics(code);
                    }
                }
            }  
        }
    };
    
})($,this);





