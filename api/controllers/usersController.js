

function usersIndex(req, res){
  users = User.find({}, function(){
    res.send(users);
  }) 
}



module.exports={ 
  usersIndex: usersIndex
}