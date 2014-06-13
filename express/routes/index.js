
/*
 * GET home page.
 */
var visitCount=0;

exports.index = function(req, res){
    res.send('');
};
exports.demo = function(req, res){
    visitCount++;
   // console.log('PV:', visitCount);

   // global.visitCount=(global.visitCount||0)+1;
   // console.log('req.params',req.params);
    var path=req.params[0],view=path?path.replace('.htm',''):'index';
   // console.log('viewName:',view);
    /*
    switch (view){
        case 'register':

            break;

        default :
            view='index';
            break;
    }
    */
    //console.log('viewName:',view)
    //setTimeout(function(){
    res.render(view);
    //},2000);

};
exports.test = function(req, res){
    res.render('test');
};
exports.s404 = function(req, res){
    res.send('404');
};