// 全国排名的页码
var nationalRankingsCurpage = 1;
// 核销列表的页码
var ExchangeListCurpage = 1;
// 是否加载中
var loading = false;

//打开兑奖框
$(".samllBtnGroup .storeManagementBtn").on("click",function () {
    clickSound.play();
    storeApi.getStorePrize();
    fiboSDK.btnClick('qixiGame_storeBtn1', '门店奖励');
});
// 关闭兑奖框
$(".storeReward .closeBtn").on("click",function () {
    clickSound.play();
    $(".storeReward").hide();
});
// 关闭兑奖框
$(".storeReward .okBtn").on("click",function () {
    clickSound.play();
    $(".storeReward").hide();
});
// 打开分享二维码
$(".samllBtnGroup .extensionBtn").on("click",function () {
    storeApi.getStoreQrcode();
    clickSound.play();
    $(".showQRCode").show();
    fiboSDK.btnClick('qixiGame_storeBtn2', '门店推广');
});
// 关闭分享二维码
$(".showQRCode .closeBtn").on("click",function () {
    clickSound.play();
    $(".showQRCode").hide();
});
// 保存分享二维码
$(".showQRCode .keepBtn").on("click",function () {
    fiboSDK.btnClick('qixiGame_storeBtn3', '门店保存二位码');
    $(".showQRCode .closeBtn").hide();
    $(".showQRCode .keepBtn").hide();
    html2canvas(document.querySelector(".showQRCode ")).then(canvas => {
        $(".showImg .content img").attr("src", canvas.toDataURL("image/png"));
        $(".showImg").show();
        $(".showQRCode").hide()
    }).catch(canvas => {
        $(".showQRCode .closeBtn").show();
        $(".showQRCode .keepBtn").show();
    });
    clickSound.play();
});
//关闭预览
// 关闭分享二维码
$(".showImg .closeBtn").on("click",function () {
    clickSound.play();
    $(".showQRCode .closeBtn").show();
    $(".showQRCode .keepBtn").show();
    $(".showImg").hide()
});
// 打开核销
$(".samllBtnGroup .prizeWriteOffBtn").on("click",function () {
    clickSound.play();
    $(".writeOff").show();
    storeApi.getExchangeList({"curpage":ExchangeListCurpage});
    fiboSDK.btnClick('qixiGame_storeBtn4', '门店奖品核销');
});
//监听核销列表的滚动条
$(".writeOff .userList ul").scroll(function() {
    if($(".writeOff .userList ul").scrollTop() > ($(".writeOff .userList ul")[0].scrollHeight - $(".writeOff .userList ul").height() - 200)){
        if(!loading){
            loading = true
            ExchangeListCurpage +=1;
            storeApi.getExchangeList({"curpage":ExchangeListCurpage});
        }
    }
});
// 关闭核销
$(".writeOff .closeBtn").on("click",function () {
    clickSound.play();
    $(".writeOff").hide();
    ExchangeListCurpage = 1;
    $(".writeOff .userList ul").empty();
});
// 调用扫码
$(".writeOff .writeOffBtn").on("click",function () {
    clickSound.play();
    storeApi.scan();
    fiboSDK.btnClick('qixiGame_storeBtn5', '门店调用奖品扫码');
});

// 打开活动介绍
$(".activitiesIntroductionBtn").on("click",function () {
    clickSound.play();
    $(".activityDescription").show();
    fiboSDK.btnClick('qixiGame_storeBtn6', '门店活动介绍');
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
    clickSound.play();
    var type = $(this).attr("data-type");
    if($(".activityDescription .content").attr("data-type") != type){
        switch (parseInt(type)){
            case 0:
                $(".activityDescription .content").removeClass("activitiesInfo");
                $(".activityDescription .content").addClass("gameDescription");
                break;
            case 1:
                $(".activityDescription .content").removeClass("gameDescription");
                $(".activityDescription .content").addClass("activitiesInfo");
                break
        }
    }
    $(".activityDescription .content").attr("data-type",type);
});

// 打开全国排名
$(".nationalRankingsBtn").on("click",function () {
    clickSound.play();
    $(".nationalRankings").show();
    storeApi.getShareRand({"curpage":nationalRankingsCurpage});
    fiboSDK.btnClick('qixiGame_storeBtn7', '门店查看全国排名');
});
//监听全国列表的滚动条
$(".nationalRankings .userList ul").scroll(function() {
    if($(".nationalRankings .userList ul").scrollTop() > ($(".nationalRankings .userList ul")[0].scrollHeight - $(".nationalRankings .userList ul").height() - 200)){
        if(!loading){
            loading = true;
            nationalRankingsCurpage +=1;
            storeApi.getShareRand({"curpage":nationalRankingsCurpage});
        }
    }
});
// 关闭全国排名
$(".nationalRankings .closeBtn").on("click",function () {
    clickSound.play();
    $(".nationalRankings .userList ul").empty();
    nationalRankingsCurpage = 1;
    $(".nationalRankings").hide();
});

storeApi.getShareCount();
