var Ajax={
    get:function(url,data,cb){
        if(typeof data=='function'){
            cb=data;
            data={};
        }
        if(!data)data={};
        data._token_=window._token_;

        $.get(url,data,function(r){//console.log('get',r)
            if(r.code==-1){
                location.href='login?backurl='+encodeURIComponent(location.href) ;
            }else cb&&cb(r)
        })
    },
    getUserList:function(cb){
        //userList
        this.get('/api/user/relative?userId='+userId,cb);
    },
    getMyTeam:function(cb){
        this.get('/api/team/do?type=mine&userId='+userId,cb);
    },
    getRecomTeam:function(cb){
        this.get('/api/team/do?type=recom&userId='+userId,cb);
    },

    relative: function (tid2,cb){
        if(currentTeamId){
            $.get('/api/team/do?type=relative&teamid='+currentTeamId+'&teamid2='+tid2,cb);
        }
    },
    conversation:function(tid1,tid2,cb){

        this.get('/api/talk/conversation?teamid='+tid1+'&teamid2='+tid2,cb);
    },
    talk:function (cb){
        return;
        this.get('/api/talk/send?conversationid='+currendCid+'&userId='+userId,cb);
    },

    sendTalk:function (data,cb){//debugger;
    //var s= $(f).serialize();

        this.get('/api/talk/send',data,cb);
        return false;
    },
    friends:function (cb){
        this.get('/api/team/do?type=friends&teamid='+currentTeamId,cb);
    },
    recieveConversation:function(cb){
        this.get('/api/talk/listen?conversationid='+currendCid,cb);
    }
};