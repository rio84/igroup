//alert(123)
var userId=sessionStorage.getItem('userid'),_token_;
if(!(userId&&(_token_=sessionStorage.getItem('user'+userId)))){
    location.href='login?backurl=talk';

}
var teamid1=queryString('tid1'),teamid2=queryString('tid2');
//debugger;
//////////////////////////// before
//var msg=document.getElementById('msg');

function longPolling(){
    currendCid && Ajax.recieveConversation();
};

var currendCid;


var conversation=function(tid1,tid2,cb){

    Ajax.conversation(tid1,tid2,function(r){
        console.log('conversation',r)
        currendCid= r.data.id
        longPolling();
    });

};
teamid1&&teamid2&&conversation(teamid1,teamid2);

function checkSubmit(f){//debugger;
    Ajax.sendTalk({

        content:$('textarea').val(),
        conversationid:currendCid,
        userId:userId

    },function(r){
        console.log('talk',r)
    });
    return false;
}