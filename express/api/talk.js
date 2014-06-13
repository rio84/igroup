
/*
 * GET users listing.
 */


var model=require('../../model/talk');
var Login=require('../../lib/login');


var LongPolling={
    _callbacks:{},
    listen:function(key,cb){
        if(this._callbacks[key]){
            this._callbacks[key].push(cb);
        }else{
            this._callbacks[key]=[cb];
        }
    },
    tigger:function(key,data){
        var cbs=this._callbacks[key];
        if(cbs){
            for(var i=0;i<cbs.length;i++){
                cbs[i](data);
            }
            cbs.length=0;
            delete  this._callbacks[key];
        }
    }
};

exports.distribute=function(req,res){
    if(!Login.checkRequest(req)){return res.json({code:-1,errCode:'USER_NOT_LOGIN'});};
   // console.log(req)
    var api=req.params[0];
    //console.log('distribute',api,this[api],exports[api])
    if(api in exports){
        exports[api].apply(exports,arguments);
    }else{
        res.json({code:404,errCode:'NO_API'});
    }
}


exports.listen=function(req,res){
    if(!Login.checkRequest(req)){return res.json({code:-1,errCode:'USER_NOT_LOGIN'});}
    var q=req.query;
    var id= q.conversationid;
    LongPolling.listen(id,function(data){
        res.json(data);
    });
};

exports.send = function(req, res){
    if(!Login.checkRequest(req)){return res.json({code:-1,errCode:'USER_NOT_LOGIN'});}
    var q=req.query;

   // res.send({code:0})

    model.send(q,function(result){
        //var res={};
       // console.log('login query data',data)
        if(result.code==0){
            q.conversationid&&LongPolling.tigger(q.conversationid,result.data);
        }
        res.json(result);
    });


};

exports.conversation = function(req, res){
    if(!Login.checkRequest(req)){return res.json({code:-1,errCode:'USER_NOT_LOGIN'});}
    var q=req.query;
    model.createConversation(q,function(data){

        // console.log('login query data',data)
        res.json(data);
    });

};
/*
exports.send=function(req, res){
    if(!Login.checkRequest(req)){return res.json({code:-1,errCode:'USER_NOT_LOGIN'});}
    var q=req.query;
    model.talk(q,function(data){

        // console.log('login query data',data)
        res.json(data);
    });

};
*/