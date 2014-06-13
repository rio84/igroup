var model=require('../model/user')
/*
model.login({
    phone: 123,
    passwd: 456
},function(data){
    console.log('login query data',data)

});

    */

/*
model.setUserInfo({
    userId:'14895',
    nick:'rere',
    location:'123',
    gender:1,
    birthday:'19840203'
},function(r){
    console.log(r)
})

    */
/*
model.getUserInfo({
    userId:'14895',
    nick:'rere',
    location:'123',
    gender:1,
    birthday:'19840203'
},function(r){
    console.log(r)
})

*/
model.createTeam({
    userId:'14895'
},function(r){
    console.log(r)
});
