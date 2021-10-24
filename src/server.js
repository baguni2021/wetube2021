import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'express-flash';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter.js';
import userRouter from './routers/userRouter.js';
import videoRouter from './routers/videoRouter.js';
import apiRouter from './routers/apiRouter';
import { localsMiddleware } from './middlewares.js';

const app = express();
const logger = morgan('dev');

//Template engine setup
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(logger);
app.use(express.urlencoded({ extended: true })); //
app.use(express.json()); // 

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false, // (매 request 마다 세션을 계속 다시 저장하는 것)
    saveUninitialized: false, // request가 들어오면 해당 request에서 새로 생성된 session에 아무런 작업이 이루어지지 않은 상황을 말합니다.
    // cookie: {
    //   maxAge: 20000, //쿠키저장된 로그인 유지 시간 지정(millisecond)
    // },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }), // 이렇게 적용하면 mongoDB에 로그인된 정보가 저장되어 서버를 죽여도 원래 로그인상태가 유지됨 -> mongoDB에 로그인 정보가 저장되어 있기 때문...
  })
);

app.use(flash());
app.use(localsMiddleware);
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('assets'), express.static('node_modules/@ffmpeg/core/dist'));

app.use((req, res, next) => {
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  res.header('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);
app.use('/api', apiRouter);

export default app;
