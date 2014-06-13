
/*
 * GET users listing.
 */

var model=require('../../model/team');
var Login=require('../../lib/login');



exports.distribute=function(req,res){
    if(!Login.checkRequest(req)){return res.json({code:-1,errCode:'USER_NOT_LOGIN'});};
   // console.log(req)
    var api=req.params[0];
    if(api in exports){
        exports[api].apply(exports,arguments);
    }else{
        res.json({code:404,errCode:'NO_API'});
    }
}

exports.relative=function(req,res){
    var q=req.query;
    model.getRelativeUsers({
        userId: q.userId
    },function(data){
        res.json(data);
    });
};
exports.do=function(req,res){
    var q=req.query;
    var type= q.type;
    if(type in model){
        model[type](q,function(data){
            res.json(data);
        });
    }else{
        res.json({code:404,errCode:'NO_MODEL'});
    }
    switch (type){
        case 'create':
           // model.create()
            break;
        case 'join':
            break;
        case 'leave':
            break;
    }

}

exports.invite=function(req,res){
    var q=req.query;
    var type= q.type;
    if(type in model){
        model[type](q,function(data){
            res.json(data);
        });
    }else{
        res.json({code:0,errCode:'NO_MODEL'});
    }


}
