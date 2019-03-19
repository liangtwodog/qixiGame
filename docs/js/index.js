
//全国排名的页码
var getGameRandCurpage = 1;
// 是否加载中
var loading = true;
// 打开活动介绍
$(".gameIndex .gameDescriptionBtn").on("click",function () {
    clickSound.play();
    $(".activityDescription").show();
    fiboSDK.btnClick('qixiGame_uesrBtn1', '用户游戏说明');
});
// 关闭活动介绍
$(".activityDescription .closeBtn").on("click",function () {
    clickSound.play();
    $(".activityDescription").hide();
});
// 关闭活动介绍
$(".activityDescription .okBtn").on("click",function () {
    clickSound.play();
    $(".activityDescription").hide();
});
// 查看玩法和奖品
$(".activityDescription .selectBtn a").on("click",function () {
    var type = $(this).attr("data-type");
    if($(".activityDescription .content").attr("data-type") != type){
        clickSound.play();
        switch (parseInt(type)){
            case 0:
                $(".activityDescription .content").removeClass("gameDescription");
                $(".activityDescription .content").addClass("gameInfo");
                break;
            case 1:
                $(".activityDescription .content").removeClass("gameInfo");
                $(".activityDescription .content").addClass("gameDescription");
                break
        }
    }
    $(".activityDescription .content").attr("data-type",type);
});



// 关闭活动结束
$(".activityEnd .closeBtn").on("click",function () {
    clickSound.play();
    $(".activityEnd").hide();
});
// 关闭活动结束
$(".activityEnd .okBtn").on("click",function () {
    clickSound.play();
    $(".activityEnd").hide();
});

// 关闭会员验证
$(".verificationPhone .closeBtn").on("click",function () {
    clickSound.play();
    $(".verificationPhone").hide();
});
// 检查手机号码是否为会员
$(".verificationPhone .okBtn").on("click",function () {
    clickSound.play();
    var phoneNb = $(".verificationPhone .phoneNb").val();
    if(!phoneNb.match(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(14[0-9]{1}))+\d{8})$/)){
        $(".verificationPhone .phoneNb").val("");
        alert("电话号码错误，请重新输入")
    }else {
        indexApi.ifExit({ phone : phoneNb})
    }
    fiboSDK.btnClick('qixiGame_uesrBtn2', '用户是否为会员');
});

// 关闭注册会员
$(".registeredMember .closeBtn").on("click",function () {
    clickSound.play();
    $(".registeredMember").hide();
});
// 注册会员
$(".registeredMember .okBtn").on("click",function () {
    clickSound.play();
    var phoneNb = $(".registeredMember .phoneNb").val();
    var name = $(".registeredMember .name").val();
    if(!phoneNb.match(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(14[0-9]{1}))+\d{8})$/)){
        $(".registeredMember .phoneNb").val("");
        alert("电话号码错误，请重新输入");
        return 0;
    }
    if(name === "" || name === " "){
        $(".registeredMember .name").val("");
        alert("昵称不能为空");
        return 0;
    }
    var reg = /^[0-9a-zA-Z]+$/
    if(reg.test(name) || name.length <2 || name.length >4){
        alert("名字只能为中文，且两个字到四个字之间");
        return 0;

    }
    indexApi.regist({phone:phoneNb,name:name});
    fiboSDK.btnClick('qixiGame_uesrBtn3', '用户注册会员');
});

// 打开我的奖品
$(".gameIndex .myPrizeBtn").on("click",function () {
    clickSound.play();
    indexApi.getPrize();
    fiboSDK.btnClick('qixiGame_uesrBtn4', '用户查看奖品');
});
// 关闭我的奖品
$(".myPrize .closeBtn").on("click",function () {
    clickSound.play();
    $(".myPrize").hide();
});
// 确定我的奖品
$(".myPrize .okBtn").on("click",function () {
    clickSound.play();
    $(".myPrize").hide();
});
// 兑换我的奖品
$(".myPrize .Prize").on("click",function () {
    clickSound.play();
    $(".myPrize").hide();
    $(".prizeQRcode").show();
    fiboSDK.btnClick('qixiGame_uesrBtn5', '用户查看奖品二维码');
});
// 关闭兑换我的奖品
$(".prizeQRcode .closeBtn").on("click",function () {
    clickSound.play();
    $(".prizeQRcode").hide();
});

//查看全国排名
$(".gameIndex .rankingBtn").on("click",function () {
    clickSound.play();
    $(".nationalRankings").show();
    indexApi.getGameRand({"curpage":getGameRandCurpage});
    fiboSDK.btnClick('qixiGame_uesrBtn6', '用户查看排名');
});
//监听全国列表的滚动条
$(".nationalRankings .userList ul").scroll(function() {
    if($(".nationalRankings .userList ul").scrollTop() > ($(".nationalRankings .userList ul")[0].scrollHeight - $(".nationalRankings .userList ul").height() - 200)){
        if(!loading){
            loading = true;
            getGameRandCurpage +=1;
            indexApi.getGameRand({"curpage":getGameRandCurpage});
        }
    }
});
//关闭全国排名
$(".nationalRankings .closeBtn").on("click",function () {
    clickSound.play();
    getGameRandCurpage=1;
    $(".nationalRankings .userList ul").empty();
    $(".nationalRankings").hide();
});
//查看每日最高分
$(".nationalRankings .highestScoreBtn").on("click",function () {
    clickSound.play();
    $(".nationalRankings").hide();
    $(".highestScoreDiv").show();
    indexApi.getScoreByDay()
    fiboSDK.btnClick('qixiGame_uesrBtn7', '用户每日最高分');
});

//关闭每日最高分
$(".highestScoreDiv .closeBtn").on("click",function () {
    clickSound.play();
    $(".highestScoreDiv").hide();
    // 清除全国排名的数据
    getGameRandCurpage=1;
    $(".nationalRankings .userList ul").empty();
    // 清除每日最高分的数据
    $(".highestScoreDiv .userList ul").empty()
});
//返回全国排名
$(".highestScoreDiv .ReturnBtn").on("click",function () {
    clickSound.play();
    $(".nationalRankings").show();
    $(".highestScoreDiv").hide();
    // 清除每日最高分的数据
    $(".highestScoreDiv .userList ul").empty()
});


//关闭获奖页面
$(".winPrize .closeBtn").on("click",function () {
    clickSound.play();
    selectContentShow(1);
    $(".winPrize").hide();
    $(".gameIndex").show();
});
//立即领取奖品
$(".winPrize .immediatelyReceiveBtn").on("click",function () {
    clickSound.play();
    selectContentShow(1);
    $(".winPrize").hide();
    $(".gameIndex .myPrizeBtn").click();
    fiboSDK.btnClick('qixiGame_uesrBtn8', '用户立即领取奖品');
});

//关闭游戏结束页面
$(".gameOver .closeBtn").on("click",function () {
    clickSound.play();
    selectContentShow(1);
    $(".gameOver").hide();
});
//点击再玩一次
$(".gameOver .onceMoreBtn").on("click",function () {
    clickSound.play();
    fiboSDK.btnClick('qixiGame_uesrBtn9', '用户再玩一次');
    selectContentShow(1);
    $(".gameOver").hide();

});
//点击邀请好友
$(".gameOver .invitingFriendsBtn").on("click",function () {
    clickSound.play();
    $(".gameOver").hide();
    $(".showGame").show();
    fiboSDK.btnClick('qixiGame_uesrBtn10', '用户邀请朋友');
});


//分享页点击知道了
$(".showGame .IKnowBtn").on("click",function () {
    clickSound.play();
    selectContentShow(1);
    $(".showGame").hide();
});

// // 设置点击输入框获取焦点
// $(".inputShow").click(function () {
//     console.log(1111111111111)
//     $(this).focus();
// });
function selectContentShow(type) {
    switch (parseInt(type)){
        case 1: //主界面显示
            $("#quintus_container").hide();
            $("#scoringDiv").hide();
            $(".gameAssembly").hide();
            $(".bodyContentBg").show();
            $(".gameIndex").show();
            break;
        case 2: // 游戏界面显示
            $(".bodyContentBg").hide();
            $(".gameAssembly").hide();
            $("#quintus_container").show();
            $("#scoringDiv").show();
            break;
    }
}

