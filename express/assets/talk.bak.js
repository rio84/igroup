//alert(123)
var userId=sessionStorage.getItem('userid'),_token_;
if(!(userId&&(_token_=sessionStorage.getItem('user'+userId)))){
    location.href='login';

}
var msg=document.getElementById('msg');

function longPolling(){
    currendCid&& $.get('/api/talk/listen?conversationid='+currendCid+'&_token_='+_token_,function(r){
        if(!r.errCode)
            longPolling();
        console.log('listen',r);

        // tip.innerHTML=r.userId?'your userid is '+r.userId:'no user!';
    });
};
var currentTeamId;
var userList= $('#userList').on('click',function(e){
    if(e.target.className=='user'){
        var tar=$(e.target),
            id=tar.attr('data-id');
        $('[name=id]').val(currentTeamId=id);
        $('#tname').html(tar.html());
        friends();
        tar.addClass('selected').siblings().removeClass('selected');
    }
});
var recomList=$('#recomList');

var getUserList=function(){
    //userList
    $.get('/api/user/relative?userId='+userId,function(r){
        var data= r.data;
        if(data){
            for(var i= 0,n;n= data[i];i++){
                userList.append('<span class="user" data-id="' + n.userId+'">'+ n.nick+'</span>');
            }
        }
    });
}
//getUserList();


var getMyTeam=function(){
    $.get('/api/team/do?type=mine&userId='+userId+'&_token_='+_token_,function(r){
      //  debugger;
        var data= r.data;
        console.log(r)
        if(data){
            for(var i= 0,n;n= data[i];i++){
                userList.append('<span class="user" data-id="' + n.id+'">'+ n.name+'</span>');
            }
        }
    });
};
var getRecomTeam=function(){
    $.get('/api/team/do?type=recom&userId='+userId+'&_token_='+_token_,function(r){
        //  debugger;
        var data= r.data;
        console.log(r)
        if(data){
            for(var i= 0,n;n= data[i];i++){
                recomList.append('<span class="user" data-id="' + n.id+'"><b onclick="relative(this)">+</b>'+ n.name+'</span>');
            }
        }
    });
};


getMyTeam();

getRecomTeam();

function relative(el){
    if(currentTeamId){
        $.get('/api/team/do?type=relative&teamid='+currentTeamId+'&teamid2='+el.parentNode.getAttribute('data-id')+'&_token_='+_token_,function(r){
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
            conversation(id,function(data){
                tar.attr('data-cid',currendCid=data.id)
                longPolling();
            });
        }
       // $('#tname').html(tar.html());
        //friends();
        tar.addClass('selected').siblings().removeClass('selected');
    }
});
function friends(){
    $.get('/api/team/do?type=friends&teamid='+currentTeamId+'&_token_='+_token_,function(r){
        //  debugger;
        var data= r.data;
        if(data&&data.length){

            for(var i= 0,n;n= data[i];i++){
                friendsList.empty().append('<span class="user" data-id="' + n.id+'"><i onclick="talk(this)">发起聊天</i>'+ n.name+'</span>');
            }
        }else{
            friendsList.html('无好友')
        }

    });
}


var conversation=function(tid2,cb){

    $.get('/api/talk/conversation?teamid='+currentTeamId+'&teamid2='+tid2+'&_token_='+_token_,function(r){
        //var data= r.data;


        console.log('conversation',r)
        if(r.code==0)cb(r.data);
    });
};
function talk(){
    return;
    $.get('/api/talk/send?conversationid='+currendCid+'&userId='+userId+'&_token_='+_token_,function(r){
        //  debugger;
        console.log('talk',r)

    });
}

function checkSubmit(f){//debugger;
    //var s= $(f).serialize();

    $.get('/api/talk/send?content='+$('textarea').val()+'&conversationid='+currendCid+'&userId='+userId+'&_token_='+_token_,function(r){
        //  debugger;
        console.log('talk',r)

    });
    return false;
}