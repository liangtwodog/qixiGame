
var indexApi = {};
//获取全国排名
indexApi.getGameRand = function(data){
    var option = {
        path:gameBaseUrl + "?a=active&b=getGameRand",
        type:'post',
        data:{
            curpage:data.curpage,
            rows:20
        },
        successCallback:function (res) {
            $(".nationalRankings .myInfo .curRand").html(res.datas.curRand);
            $(".nationalRankings .myInfo .curScoreHigh").html(res.datas.curScoreHigh);
            var rankList = res.datas.rankList;
            var html = '';
            if(rankList != null){
                for(var i = 0; i<rankList.length; i++){
                    html+='<li class="clearfloat"><div class="lfloat ranking">'+rankList[i].rownum+'</div>' +
                        '<div class="lfloat name">'+rankList[i].nickname+'</div>' +
                        '<div class="lfloat headerImg"><img src="'+rankList[i].headimgurl+'"></div>' +
                        '<div class="lfloat Score">'+rankList[i].scores_total+'</div></li>'
                }
                $(".nationalRankings .userList ul").append(html);
                loading = false;
            }
        },
        errorCallback:function (res) {
            loading = false;
            if(res.code === 4000){
                alert("当前用户量爆满，游戏火热进行中，请稍后加载数据！")
                $(".nationalRankings").hide();
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
        curScoreHigh: 300,
        rankList: [
          {
            rownum: 1,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 2,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 3,
            nickname: '季土梅季土梅季土梅季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 4,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 5,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 6,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 7,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 8,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 9,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 10,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 11,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 12,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 13,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 14,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          },
          {
            rownum: 15,
            nickname: '季土梅',
            headimgurl: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',
            scores_total: 500
          }
        ]
      }
    }
  }
  $(".nationalRankings .myInfo .curRand").html(res.datas.curRand);
  $(".nationalRankings .myInfo .curScoreHigh").html(res.datas.curScoreHigh);
  var rankList = res.datas.rankList;
  var html = '';
  if(rankList != null){
    for(var i = 0; i<rankList.length; i++){
      html+='<li class="clearfloat"><div class="lfloat ranking">'+rankList[i].rownum+'</div>' +
          '<div class="lfloat name">'+rankList[i].nickname+'</div>' +
          '<div class="lfloat headerImg"><img src="'+rankList[i].headimgurl+'"></div>' +
          '<div class="lfloat Score">'+rankList[i].scores_total+'</div></li>'
    }
    $(".nationalRankings .userList ul").append(html);
    loading = false;
  }
};
//获取每日最高排名
indexApi.getScoreByDay = function(data){
    var option = {
        path:gameBaseUrl +"?a=active&b=getScoreByDay",
        type:'post',
        data:{
        },
        successCallback:function (res) {
            console.log(res)
            var rankList = res.datas;
            var html = ''
            for(var i = 0; i<rankList.length; i++){
                html+='<li class="clearfloat">' +
                    '<div class="lfloat time">'+rankList[i].date+'</div>' +
                    '<div class="lfloat Score">'+rankList[i].score+'</div></li>'
            }
            $(".highestScoreDiv .userList ul").append(html)
        },
        errorCallback:function () {
        }
    };
    // myRequest(option)
  const res = {
    datas: [
      {
        date: '2018-08-17',
        score: 300
      },
      {
        date: '2018-08-16',
        score: 500
      },
      {
        date: '2018-08-15',
        score: 600
      },
      {
        date: '2018-08-14',
        score: 150
      }
    ]
  }
  var rankList = res.datas;
  var html = ''
  for(var i = 0; i<rankList.length; i++){
    html+='<li class="clearfloat">' +
        '<div class="lfloat time">'+rankList[i].date+'</div>' +
        '<div class="lfloat Score">'+rankList[i].score+'</div></li>'
  }
  $(".highestScoreDiv .userList ul").append(html)
};
//开始游戏
indexApi.getShareAndPlayScoreInfo = function(data){
    var option = {
        path:gameBaseUrl + "?a=active&b=getShareAndPlayScoreInfo&share_rec="+share_rec,
        type:'get',
        successCallback:function (res) {
            $(".bodyContentBg").hide();
            $(".gameAssembly").hide();
            $("#quintus_container").show();
            $("#scoringDiv").show();
            if(res.datas.share_img != ""){
                score.highestScore1 = res.datas.scores_high;
                score.highestScore2 = res.datas.share_scores_high;
                $("#scoringDiv .highestScore1 .imgDIV img").attr("src",res.datas.img);
                $("#scoringDiv .highestScore2 .imgDIV img").attr("src",res.datas.share_img);
                $("#scoringDiv .highestScore1").show();
                $("#scoringDiv .highestScore2").show();
            }else {
                $("#scoringDiv .highestScore1 .imgDIV img").attr("src",res.datas.img);
                score.highestScore1 = res.datas.scores_high;
                score.highestScore2 = 0;
                $("#scoringDiv .highestScore1").show();
                $("#scoringDiv .highestScore2").hide();
            }
            score.nowScore = 0;
            if(parseInt(score.highestScore1) === 0 && parseInt(score.highestScore2) === 0){
                score.nowTotalscore = 100;
            }else {
                if(parseInt(score.highestScore1) > parseInt(score.highestScore2)){
                    score.nowTotalscore = score.highestScore1*2
                }else if(parseInt(score.highestScore1) === parseInt(score.highestScore2)){
                    score.nowTotalscore = score.highestScore2/2*5
                }else {
                    score.nowTotalscore = score.highestScore2*2

                }
            }
            scoreSet();
            Q.stageScene("level");
        },
        errorCallback:function (res) {
            if(res.code === 4000){
                $(".bodyContentBg").hide();
                $(".gameAssembly").hide();
                $("#quintus_container").show();
                $("#scoringDiv").show();
                if(res.datas.share_img != ""){
                    score.highestScore1 = res.datas.scores_high;
                    score.highestScore2 = res.datas.share_scores_high;
                    $("#scoringDiv .highestScore1 .imgDIV img").attr("src",res.datas.img);
                    $("#scoringDiv .highestScore2 .imgDIV img").attr("src",res.datas.share_img);
                    $("#scoringDiv .highestScore1").show();
                    $("#scoringDiv .highestScore2").show();
                }else {
                    $("#scoringDiv .highestScore1 .imgDIV img").attr("src",res.datas.img);
                    score.highestScore1 = res.datas.scores_high;
                    score.highestScore2 = 0;
                    $("#scoringDiv .highestScore1").show();
                    $("#scoringDiv .highestScore2").hide();
                }
                score.nowScore = 0;
                if(parseInt(score.highestScore1) === 0 && parseInt(score.highestScore2) === 0){
                    score.nowTotalscore = 100;
                }else {
                    if(parseInt(score.highestScore1) > parseInt(score.highestScore2)){
                        score.nowTotalscore = score.highestScore1*2
                    }else if(parseInt(score.highestScore1) === parseInt(score.highestScore2)){
                        score.nowTotalscore = score.highestScore2/2*5
                    }else {
                        score.nowTotalscore = score.highestScore2*2

                    }
                }
                scoreSet();
                Q.stageScene("level");
                $("#scoringDiv .highestScore").hide();
            }
        }
    };
    // myRequest(option)
  const res = {
    datas: {
      share_img: '',
      scores_high: 300,
      share_scores_high: 0,
      img: 'https://i.loli.net/2019/03/20/5c91a7114056c.jpg',

    }
  }
  $(".bodyContentBg").hide();
  $(".gameAssembly").hide();
  $("#quintus_container").show();
  $("#scoringDiv").show();
  if(res.datas.share_img != ""){
    score.highestScore1 = res.datas.scores_high;
    score.highestScore2 = res.datas.share_scores_high;
    $("#scoringDiv .highestScore1 .imgDIV img").attr("src",res.datas.img);
    $("#scoringDiv .highestScore2 .imgDIV img").attr("src",res.datas.share_img);
    $("#scoringDiv .highestScore1").show();
    $("#scoringDiv .highestScore2").show();
  }else {
    $("#scoringDiv .highestScore1 .imgDIV img").attr("src",res.datas.img);
    score.highestScore1 = res.datas.scores_high;
    score.highestScore2 = 0;
    $("#scoringDiv .highestScore1").show();
    $("#scoringDiv .highestScore2").hide();
  }
  score.nowScore = 0;
  if(parseInt(score.highestScore1) === 0 && parseInt(score.highestScore2) === 0){
    score.nowTotalscore = 100;
  }else {
    if(parseInt(score.highestScore1) > parseInt(score.highestScore2)){
      score.nowTotalscore = score.highestScore1*2
    }else if(parseInt(score.highestScore1) === parseInt(score.highestScore2)){
      score.nowTotalscore = score.highestScore2/2*5
    }else {
      score.nowTotalscore = score.highestScore2*2

    }
  }
  scoreSet();
  Q.stageScene("level");
};
//提交分数
indexApi.scoreSubmit = function(data){
    var option = {
        path:gameBaseUrl + "?a=active&b=gameScoreSubmit",
        type:'post',
        data:{
            scores:data.scores
        },
        successCallback:function (res) {
            $(".gameAssembly").show();
            switch (parseInt(res.datas.prezeid)){
                case 0:
                    // 未获得奖品
                    $(".gameOver .myScor").html(data.scores);
                    $(".gameOver").show();
                    break;
                case 1:
                    $(".winPrize .PrizeContent").html("恭喜你获得果本新品果实精华油面膜一片与面膜预售券一张！点击下方“立即领取”即可领取奖品");
                    $(".winPrize").show();
                    break;
                case 2:
                    $(".winPrize .PrizeContent").html("恭喜你获得果本新品果实精华油面膜一片+5.20现金红包+面膜预售券一张!点击下方“立即领取”即可领取奖品");
                    $(".winPrize").show();
                    break;
                case 3:
                    $(".winPrize .PrizeContent").html("恭喜你获得果本新品果实精华油面膜一片+2.60现金红包+面膜预售券一张!点击下方“立即领取”即可领取奖品");
                    $(".winPrize").show();
                    break;
            }
            var form = {"用户名": userinfo.nickname,"openid":userinfo.openid,"分数": data.scores,"游戏时间": gameTime, "奖品id": res.datas.prezeid};
            fiboSDK.saveFormInfo(form, '游戏结束的结果');
        },
        errorCallback:function (res) {
            if(res.code === 4000 && $('.waitDiv').is(':hidden')){
                myConfirm("当前用户量爆满，游戏火热进行中，请耐心等待上传数据...")
            }
            function myConfirm(confirmTitle) {
                if (confirm(confirmTitle)) {
                    $(".waitDiv").show();
                    var upDataNb = 0;
                    var upDataInterval = setInterval(function () {
                        if(upDataNb < 3){
                            indexApi.scoreSubmit({"scores" : data.scores});
                            upDataNb++;
                        }else {
                            clearInterval(upDataInterval);
                            myConfirm("当前用户量爆满，游戏火热进行中，是否确定继续排队上传数据..")
                        }
                    },10000)
                }else {
                    $(".waitDiv").hide();
                    $(".gameOver .closeBtn").click();
                }
            }
        }
    };
    // myRequest(option)
  const res = {
    datas: {
      prezeid: 0
    }
  }
  $(".gameAssembly").show();
  switch (parseInt(res.datas.prezeid)){
    case 0:
      // 未获得奖品
      $(".gameOver .myScor").html(data.scores);
      $(".gameOver").show();
      break;
    case 1:
      $(".winPrize .PrizeContent").html("恭喜你获得果本新品果实精华油面膜一片与面膜预售券一张！点击下方“立即领取”即可领取奖品");
      $(".winPrize").show();
      break;
    case 2:
      $(".winPrize .PrizeContent").html("恭喜你获得果本新品果实精华油面膜一片+5.20现金红包+面膜预售券一张!点击下方“立即领取”即可领取奖品");
      $(".winPrize").show();
      break;
    case 3:
      $(".winPrize .PrizeContent").html("恭喜你获得果本新品果实精华油面膜一片+2.60现金红包+面膜预售券一张!点击下方“立即领取”即可领取奖品");
      $(".winPrize").show();
      break;
  }
};
//获取我的奖品
indexApi.getPrize = function(data){
    var option = {
        path:gameBaseUrl + "?a=active&b=getPlayerPrize",
        type:'post',
        successCallback:function (res) {
            if(res.datas.is_auth == 0){
                $(".verificationPhone").show();
                $("#phoneNbShow").focus();
            }else {
                $(".myPrize").show();
                switch (parseInt(res.datas.prize_id)){
                    case 1:
                        $(".myPrize .Prize").addClass("Prize1");
                        $(".myPrize .title").html("");
                        break;
                    case 2:
                        $(".myPrize .Prize").addClass("Prize2");
                        $(".myPrize .title").html("");
                        break;
                    case 3:
                        $(".myPrize .Prize").addClass("Prize3");
                        $(".myPrize .title").html("");
                        // $(".myPrize .title").html("恭喜您获得了<span>3</span>个奖品");
                        break;
                }
                //设置奖品二维码
                $(".prizeQRcode .QRcode img").attr("src",res.datas.prize_qrcode);
                //检查奖品是否核销了
                if(res.datas.ifexchage === "0"){
                    $(".prizeQRcode .writtenOffIcon").hide();
                }else {
                    $(".prizeQRcode .writtenOffIcon").show();
                }

            }
        },
        errorCallback:function () {
        }
    };
    // myRequest(option)
  const res = {
    datas: {
      is_auth: 1,
      prize_id: 1,
      prize_qrcode: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=645541877,1234586207&fm=26&gp=0.jpg',
      ifexchage: 1
    }
  }
  if(res.datas.is_auth == 0){
    $(".verificationPhone").show();
    $("#phoneNbShow").focus();
  }else {
    $(".myPrize").show();
    switch (parseInt(res.datas.prize_id)){
      case 1:
        $(".myPrize .Prize").addClass("Prize1");
        $(".myPrize .title").html("");
        break;
      case 2:
        $(".myPrize .Prize").addClass("Prize2");
        $(".myPrize .title").html("");
        break;
      case 3:
        $(".myPrize .Prize").addClass("Prize3");
        $(".myPrize .title").html("");
        // $(".myPrize .title").html("恭喜您获得了<span>3</span>个奖品");
        break;
    }
    //设置奖品二维码
    $(".prizeQRcode .QRcode img").attr("src",res.datas.prize_qrcode);
    //检查奖品是否核销了
    if(res.datas.ifexchage === "0"){
      $(".prizeQRcode .writtenOffIcon").hide();
    }else {
      $(".prizeQRcode .writtenOffIcon").show();
    }

  }
};
//检验电话号码是否为果本会员
indexApi.ifExit = function(data){
    var option = {
        path: gameBaseUrl + "?a=active&b=ifExit&phone=" + data.phone,
        type:'get',
        successCallback:function (res) {
            if(parseInt(res.datas.ifExit) === 1){
                $(".verificationPhone").hide();
                $(".gameIndex .myPrizeBtn").click();
            }else {
                $(".registeredMember .phoneNb").val(data.phone);
                $(".verificationPhone").hide();
                $(".registeredMember").show();
                $("#nameShow").focus();
            }

        },
        errorCallback:function () {
            alert('服务器异常，稍后重试')
        }
    };
    myRequest(option)
};
//注册果本会员
indexApi.regist = function(data){
    var option = {
        path: gameBaseUrl + "?a=active&b=regist",
        type:'post',
        data:{
            phone:data.phone,
            name:data.name
        },
        successCallback:function (res) {
            if(res.datas.msg === "注册成功" ){
                $(".registeredMember").hide();
                $(".gameIndex .myPrizeBtn").click();
                var form = {"用户名": data.name,"手机号码": data.phone,"时间":moment().format("YYYY-M-D H:m:s") };
                fiboSDK.saveFormInfo(form, '注册会员信息');
            }else {
                alert("注册失败，请检验信息重新注册")
            }
        },
        errorCallback:function () {
        }
    };
    myRequest(option)
};