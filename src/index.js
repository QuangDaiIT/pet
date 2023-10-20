// const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const methodOverride = require('method-override')
const app = express();
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const SortMiddleWare = require('./app/middlewares/SortMiddleWare');
const AuthenticationUser = require('./app/middlewares/AuthenticationUser');
const port = 3000;

const route = require('./routes');
const db = require("./config/db/")

// connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));


// Custom middlewares 
app.use(SortMiddleWare);
app.use(AuthenticationUser);
// app.use(bacBaoVe);

// function bacBaoVe (req, res, next) {
//     if(['vethuong','vevip'].includes(req.query.ve)){
//         req.face = 'Gạch gạch gạch!!!';
//         return next();
//     }
//     res.status(403).json({message: "Access denied"});
// }
// app.get('/middleware', 
//     function (req, res, next) {
//         if(['vethuong','vevip'].includes(req.query.ve)){
//             req.face = 'Gạch gạch gạch!!!';
//             return next();
//         }
//         res.status(403).json({message: "Access denied"});
//     },
//     function(req, res, next) {
//     res.json( {
//         message: 'Successfully!',
//         face: req.face
//     });
// })

app.use(morgan('combined'));
// template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a,b) => a + b,
            Authentication: (_login) => {
                const avatar = {
                    false : `<li><a href="/account/register" class="register-btn">Đăng ký</a></li>
                    <li><a href="/account/login" class="login-btn">Đăng nhập</a></li>`,
                    true : `
                    <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW2rxo-vtVgwLPgVqu0Jo-v2JYIDeh-M77Ag&usqp=CAU" alt="" class="user-avatar">
                                Quang Đại
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a class="dropdown-item" href="/courses/create">Đăng khóa học</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="/me/stored/courses">Khóa học của tôi</a>
                                        <a class="dropdown-item" href="/me/stored/news">Bài viết của tôi</a>
                                        <div class="dropdown-divider"></div>
                                        <form method="POST" action="/" class="form-log-out-submit">
                                            <button class="dropdown-item logout-of-user" name="_login" type="submit" value = "false" >Đăng Xuất</button>
                                        </form>
                                </div>
                            </li>
                            `,
                }
                var mode = avatar[_login.enabled];
                return mode;
            }
        }
    }),
    
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`app listening on port at http://localhost:${port}`);
});
