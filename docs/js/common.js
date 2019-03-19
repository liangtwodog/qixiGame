$(document).ready(function() {
    refresh()
});
// $(window).resize(function() {
//     refresh()
// });
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
    if (window.orientation === 180 || window.orientation === 0) {
        $(".horizontalScreenHint").hide();
    }
    if (window.orientation === 90 || window.orientation === -90) {
        $(".horizontalScreenHint").show();
    }
}, false);

function refresh() {
    var widthScale = $(window).width()/750;
    if($(window).width()/$(window).height() > 750/1200){
        $("#bodyContent").css({
            "zoom": $(window).height()/1200*100 +  "%"
            // "left": ($(window).width() - $(window).height()/1200*750)/2 + "px"
        });
        console.log("height",$(window).height()/1200)
    }else {
        $("#bodyContent").css({
            "zoom": $(window).width()/750*100 +  "%",
        });
        console.log("width",$(window).width()/750)
    }

}
// 用户标识
var uesrRec = "";
// 分享用户的标识
var share_rec = "";
// 用户信息
var userinfo ={};
var FUI = {};
FUI.soundComponent=function(profile){
    this.profile={
        src:'', //音频文件地址
        altSrc:'', //备选音频文件地址 (不同浏览器支持的音频格式不同,可见附表)
        loop:false //是否循环播放,这个参数现在没有用上
    };
    if(profile) {
        $.extend(this.profile,profile);
    }
    this.soundObj=null;
    this.isIE = !-[1,];
    // /!*这个方法是前辈大牛发明的,利用ie跟非ie中JScript处理数组最后一个逗号“,”的差异,
    // 不过对于IE 9,这个办法就无效了,但此处正合我用,因为IE 9支持audio*!/
    this.init();
};
FUI.soundComponent.prototype={
    init:function(){
        this._setSrc();
    },
    _setSrc:function(){
        if(this.soundObj){
            if(this.isIE){
                this.soundObj[0].src=this.profile.src;
            }else{
                this.soundObj[0].innerHTML='<source src="'+this.profile.src+'" /> <source src="'+this.profile.altSrc+'" />';
            }
        }else{
            if(this.isIE){
                this.soundObj=$
                ('<bgsound volume="-10000" loop="1" src="'+this.profile.src+'">').appendTo('body');
                 //-10000是音量的最小值。先把音量关到最小,免得一加载就叮的一声,吓到人。
            }else{
                if(this.profile.loop){
                    this.soundObj=$('<audio preload="auto" autobuffer loop> <source src="'+this.profile.src+'" /> <source src="'+this.profile.altSrc+'" /> </audio>').appendTo('body');
                }else {
                    this.soundObj=$('<audio preload="auto" autobuffer> <source src="'+this.profile.src+'" /> <source src="'+this.profile.altSrc+'" /> </audio>').appendTo('body');
                }
            }
        }
    },
    setSrc:function(src,altSrc){
        this.profile.src=src;
        if(typeof altSrc!='undefined'){
            this.profile.altSrc=altSrc;
        }
        this._setSrc();
    },
    play:function(){
        // console.log(this.soundObj)
        if(this.soundObj){
            if(this.isIE){
                this.soundObj[0].volume = 1; //把音量打开。
                this.soundObj[0].src = this.profile.src;
            }else{
                this.soundObj.prevObject[0].currentTime = 0;
                this.soundObj.prevObject[0].play();
            }
        }
    },
    stop:function () {
        if(this.soundObj){
            if(this.isIE){
                this.soundObj[0].volume = 1; //把音量打开。
                this.soundObj[0].src = this.profile.src;
            }else{
                this.soundObj.prevObject[0].pause();
            }
        }
    }
};
var clickSound=new FUI.soundComponent({src:'./audio/click.mp3',altSrc:'./audio/click.mp3'});
var bgmSound=new FUI.soundComponent({src:'./audio/bgm.mp3',altSrc:'./audio/bgm.mp3',loop:true});


function myRequest(option) {
    $.ajax({
        type: option.type,
        url:option.path,
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded",
        data: option.data,
        beforeSend: function (xhr) {
        },
        success: function (json){
            // console.log(json)
            if(json.code === 200 || json.code === 0){
                option.successCallback(json)
            }else {
                if(json.code === 300){
                    console.log('接口返回报错')
                    location.href="https://dev.rainchapter.com/gbqx-h5/mobile/index.php?" + window.location.href.split("?")[1]
                }else {
                    option.errorCallback(json)
                }
            }
        },
        error: function (json) {
            console.log(json)
        }
    });

}
//获取链接参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

// 判断用户是否已经登录
function login() {
    var GetRequestValue = GetRequest();
    var rec = GetRequestValue.rec;
    if(rec === undefined || rec === ""){
        location.href="https://dev.rainchapter.com/gbqx-h5/mobile/index.php?a=login"
    }else {
        console.log("已经登录");
        uesrRec = rec;
        share_rec = GetRequestValue.share_rec;
        if(window.location.href.split("?")[0].indexOf("store")> -1){
            getStatSetting("902f9546-23d3-4cf5-bf4e-0869d4411c98");
            getSign();
        }else {
            getStatSetting("a175e255-f9fd-4a04-a43c-aae520298ded");
            getSign();
        }
    }
}
// login();
//获取微信jssdk配置
function getSign(){
    var showUrl = "https://dev.rainchapter.com/gbqx-h5/mobile/index.php?" + window.location.href.split("?")[1];
    // var showUrl = "http://gbhd.rainchapter.com/mobile/index.php?a=login&cnl=testcnl&cnltype=testcnltype&actid=testactid&stepid=teststepid&rec=" + uesrRec;
    var option = {
        path:gameBaseUrl + "?a=active&b=getSign",
        type:'GET',
        successCallback:function (res) {
            wx.config({
                debug: false,
                appId: res.datas.appId,
                timestamp:res.datas.timestamp ,
                nonceStr: res.datas.nonceStr,
                signature: res.datas.signature,
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareTimeline','onMenuShareQZone','scanQRCode'] // 必填，需要使用的JS接口列表
            });
            wx.ready(function(){
                wx.onMenuShareAppMessage({
                    title: '浪漫的果实，爱要有个果！', // 分享标题
                    desc: '一起参与果本七夕浪漫的果实游戏，海量精美豪礼、红包等着你！', // 分享描述
                    link: fiboSDK.dealUrl(showUrl) , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://dev.rainchapter.com/gbqx-h5/game/images/showImg.png', // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        alert("分享成功!");
                        fiboSDK.share('friend');
                    }
                });
                wx.onMenuShareTimeline({
                    title: '浪漫的果实，爱要有个果！', // 分享标题
                    link: fiboSDK.dealUrl(showUrl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://dev.rainchapter.com/gbqx-h5/game/images/showImg.png', // 分享图标
                    success: function () {
                        // 用户点击了分享后执行的回调函数
                        fiboSDK.share('timeline');
                    }
                } )
            });
        },
        errorCallback:function () {}
    };
    myRequest(option)
}

//获取斐波那契sdk配置
function getStatSetting(appid){
    var option = {
        path:gameBaseUrl + "?a=active&b=get_fibo_setting",
        type:'GET',
        successCallback:function (res) {
            console.log(res)
            userinfo = res.datas.userinfo;
            fiboSDK.init({
                pfid: 'mk_fib6Yvqam',
                appid: appid,
                mpid: res.datas.mpid,
                openid: res.datas.oid,
                userInfo: userinfo
            })
        },
        errorCallback:function () {

        }
    };
    myRequest(option)
}



