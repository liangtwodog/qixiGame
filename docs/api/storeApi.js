var storeApi = {};
// 调用微信扫描
storeApi.scan =function(){
    wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            console.log(res)
            var goods_id = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            var option = {
                path:gameBaseUrl + "?a=active&b=prizeExchange",
                type:'post',
                data:{
                    id:goods_id
                },
                successCallback:function (res) {
                    alert(res.datas.msg);
                    $(".writeOff .userList ul").empty();
                    ExchangeListCurpage = 1;
                    storeApi.getExchangeList({"curpage":ExchangeListCurpage});
                },
                errorCallback:function () {
                    alert("核销失败，请重新核销");
                }
            };
            myRequest(option)
        }
    });
};
//获取店家分享数
storeApi.getShareCount = function(data){
    var option = {
        path:gameBaseUrl + "?a=active&b=getShareCount",
        type:'post',
        successCallback:function (res) {
            $(".titleDiv p").html(res.datas.share_amount)
        },
        errorCallback:function () {
        }
    };
    // myRequest(option)
  const res = {
    datas: {
      share_amount: 100
    }
  }
  $(".titleDiv p").html(res.datas.share_amount)
};
//获取店家奖品
storeApi.getStorePrize = function(data){
    var option = {
        path:gameBaseUrl + "?a=active&b=getStorePrize",
        type:'post',
        successCallback:function (res) {
            $(".storeReward .content p").html(res.datas.msg);
            $(".storeReward").show()
        },
        errorCallback:function () {
        }
    };
    // myRequest(option)
  const res = {
    datas: {
      msg: '亲，最终排名定格时间为北京时间8月17日下午6点，请耐心等待！'
    }
  }
  $(".storeReward .content p").html(res.datas.msg);
  $(".storeReward").show()
};
//获取店家分享排名
storeApi.getShareRand = function(data){
    var option = {
        path:gameBaseUrl + "?a=active&b=getShareRand",
        type:'post',
        data:{
            curpage:data.curpage,
            rows:20
        },
        successCallback:function (res) {
            $(".nationalRankings .myInfo .curRand").html(res.datas.curRand);
            $(".nationalRankings .myInfo .curShareAmount").html(res.datas.curShareAmount);
            var rankList = res.datas.rankList;
            var html = '';
            if(rankList != null){
                for(var i = 0; i<rankList.length; i++){
                    html+='<li class="clearfloat">' +
                        '<div class="lfloat ranking">'+rankList[i].rownum+'</div>' +
                        '<div class="lfloat Province">'+rankList[i].area_name+'</div>' +
                        '<div class="lfloat storeName">'+rankList[i].address+'</div>' +
                        '<div class="lfloat headerImg"><img src="'+rankList[i].headimgurl+'"></div>' +
                        '<div class="lfloat forwardingNumber">'+rankList[i].share_amount+'</div>' +
                        '</li>'
                }
                $(".nationalRankings .userList ul").append(html);
                loading = false;
            }
        },
        errorCallback:function (res) {
            loading = false;
            if(res.code === 4000){
                $(".nationalRankings").hide();
                alert("当前用户量爆满，游戏火热进行中，请稍后加载数据！")
            }
        }
    };
    // myRequest(option)
  let res = {
    datas: {
      curRand: 2,
      curScoreHigh: 300,
      rankList: null
    }
  }
  if (data.curpage === 1) {
    res = {
      datas: {
        curRand: 2,
        curShareAmount: 300,
        rankList: [
          {
            rownum: 1,
            area_name: '广东',
            address: '深圳店',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            share_amount: 400
          },
          {
            rownum: 2,
            area_name: '广东',
            address: '深圳店',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            share_amount: 400
          },
          {
            rownum: 3,
            area_name: '广东',
            address: '深圳店',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            share_amount: 400
          },
          {
            rownum: 4,
            area_name: '广东',
            address: '深圳店',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            share_amount: 400
          },
          {
            rownum: 5,
            area_name: '广东',
            address: '深圳店',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            share_amount: 400
          },
          {
            rownum: 6,
            area_name: '广东',
            address: '深圳店',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            share_amount: 400
          },
          {
            rownum: 7,
            area_name: '广东',
            address: '深圳店',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            share_amount: 400
          }
        ]
      }
    }
  }
  $(".nationalRankings .myInfo .curRand").html(res.datas.curRand);
  $(".nationalRankings .myInfo .curShareAmount").html(res.datas.curShareAmount);
  var rankList = res.datas.rankList;
  var html = '';
  if(rankList != null){
    for(var i = 0; i<rankList.length; i++){
      html+='<li class="clearfloat">' +
          '<div class="lfloat ranking">'+rankList[i].rownum+'</div>' +
          '<div class="lfloat Province">'+rankList[i].area_name+'</div>' +
          '<div class="lfloat storeName">'+rankList[i].address+'</div>' +
          '<div class="lfloat headerImg"><img src="'+rankList[i].headimgurl+'"></div>' +
          '<div class="lfloat forwardingNumber">'+rankList[i].share_amount+'</div>' +
          '</li>'
    }
    $(".nationalRankings .userList ul").append(html);
    loading = false;
  }
}
//获取核销情况
storeApi.getExchangeList = function(data){
    var option = {
        path:gameBaseUrl + "?a=active&b=prizeExchangeList",
        type:'post',
        data:{
            curpage:data.curpage,
            rows:20
        },
        successCallback:function (res) {
            var List = res.datas;
            var html = '';
            if(res.datas.length != 0){
                for(var i = 0; i<List.length; i++){
                    html+='<li class="clearfloat">' +
                        '<div class="lfloat name">'+List[i].nickname+'</div> ' +
                        '<div class="lfloat headerImg"><img src="'+List[i].headimgurl+'"></div>' +
                        '<div class="lfloat type">'+List[i].prize_type+'</div>' +
                        '<div class="lfloat time"><p>'+List[i].time.split(" ")[0]+'</p><p>'+List[i].time.split(" ")[1]+'</p></div></li>'
                }
                $(".writeOff .userList ul").append(html);
                loading = false;
            }
        },
        errorCallback:function () {
            loading = false;
        }
    };
    // myRequest(option)
  let res = {
    datas: []
  }
  if (data.curpage === 1) {
    res = {
      datas: [
        {
          nickname: '西可爱呢',
          headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
          prize_type: '面膜',
          time: '2018-10-10 20:23'
        },
        {
          nickname: '西可爱呢',
          headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
          prize_type: '现金5元',
          time: '2018-10-10 10:23'
        }
      ]
    }
  }
  var List = res.datas;
  var html = '';
  if(res.datas.length != 0){
    for(var i = 0; i<List.length; i++){
      html+='<li class="clearfloat">' +
          '<div class="lfloat name">'+List[i].nickname+'</div> ' +
          '<div class="lfloat headerImg"><img src="'+List[i].headimgurl+'"></div>' +
          '<div class="lfloat type">'+List[i].prize_type+'</div>' +
          '<div class="lfloat time"><p>'+List[i].time.split(" ")[0]+'</p><p>'+List[i].time.split(" ")[1]+'</p></div></li>'
    }
    $(".writeOff .userList ul").append(html);
    loading = false;
  }
};
//获取分享二维码
storeApi.getStoreQrcode = function(data){
    var option = {
        path:gameBaseUrl + "?a=active&b=getStoreQrcode",
        type:'post',
        data:{"url":encodeURIComponent("https://dev.rainchapter.com/gbqx-h5/?" + window.location.href.split("?")[1])},
        successCallback:function (res) {
            $(".showQRCode .QRcodeDiv img").attr("src",res.datas.url);
            $(".showQRCode .storeName").html(res.datas.store_name);
        },
        errorCallback:function () {
        }
    };
    // myRequest(option)
  const res = {
    datas: {
      store_name: '南山店'
    }
  }
  $(".showQRCode .storeName").html(res.datas.store_name);
};