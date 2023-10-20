
module.exports = function AuthenticationUser(req, res, next) {
    // console.log(req.body._login);
    res.locals._login = {
        enabled: false,
        // type: 'default',
    };
    var count = 1;
    console.log(count);
    console.log(req.body._login);
    if(req.body._login === "true" && count === 1){
        count = 2;
        console.log(req.body._login);
        // res.locals._sort.enabled = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.column = req.query.column;
        Object.assign(res.locals._login, {
            enabled: "true", 
        });
    }
    if(count === 2 && req.body._login === undefined ) {
        Object.assign(res.locals._login, {
            enabled: "true", 
        });
    }
    if(req.body._login === "false"){
        count = 0;
        Object.assign(res.locals._login, {
            enabled: "false", 
        });
    }
    next();
}