

function authenticated(req, res, next) {
    console.log(req.headers)
    if(req.session.user){
        next()
     } else {
        var err = new Error("No session for user");
        next(err);
     }
}

module.exports = {
    authenticated,
}