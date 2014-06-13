//alert(123)
var userId=sessionStorage.getItem('userid'),_token_;
if(!(userId&&(_token_=sessionStorage.getItem('user'+userId)))){
    location.href='login';

}
var msg=document.getElementById('msg');

function longPolling(){
    currendCid&& Ajax.recieveConversation();
};
var currentTeamId;
var userList= $('#userList').on('click',function(e){
    if(e.target.className=='user'){
        var tar=$(e.target),
            id=tar.attr('data-id');
        $('[name=id]').val(currentTeamId=id);
        $('#tname').html(tar.html());
        Ajax.friends(function(r){
            var data= r.data;
            if(data&&data.length){

                for(var i= 0,n;n= data[i];i++){
                    friendsList.empty().append('<span class="user" data-id="' + n.id+'"><i onclick="talk(this)">发起聊天</i>'+ n.name+'</span>');
                }
            }else{
                friendsList.html('无好友')
            }
        });
        tar.addClass('selected').siblings().removeClass('selected');
    }
});
var recomList=$('#recomList');

Ajax.getMyTeam(function(r){
    var data= r.data;
    console.log(r)
    if(data){
        for(var i= 0,n;n= data[i];i++){
            userList.append('<span class="user" data-id="' + n.id+'">'+ n.name+'</span>');
        }
    }

})
//getMyTeam();

Ajax.getRecomTeam(function(r){

    var data= r.data;
    console.log(r)
    if(data){
        for(var i= 0,n;n= data[i];i++){
            recomList.append('<span class="user" data-id="' + n.id+'"><b onclick="relative(this)">+</b>'+ n.name+'</span>');
        }
    }
});

function relative(el){
    if(currentTeamId){
        Ajax.relative(el.parentNode.getAttribute('data-id'),function(r){
            //  debugger;
            var data= r.data;
            switch(r.result){
                case 'DUPLICATE_RECORD':
                case 'INVITED':
                case 'RELATION_CREATED_BEFORE':

                case 'RELATION_CREATED':
                    alert(r.result)
                    break;
            }

        });
    }
}

var currendCid;
var friendsList=$('#friendList').on('click',function(e){
    if(e.target.className=='user'){
        var tar=$(e.target),
            id=tar.attr('data-id'),
            cid=tar.attr('data-cid');
       // $('[name=id]').val(currentTeamId=id);

        if(cid){
            currendCid=cid;

        }else{
           Ajax.conversation(id,function(data){
                tar.attr('data-cid',currendCid=data.id)
                longPolling();
            });
        }
       // $('#tname').html(tar.html());
        //friends();
        tar.addClass('selected').siblings().removeClass('selected');
    }
});




function checkSubmit(f){//debugger;
    //var s= $(f).serialize();
    Ajax.sendTalk({

        content:$('textarea').val(),
        conversationid:currendCid,
        userId:userId

    },function(r){
        console.log('talk',r)
    });
    return false;
}