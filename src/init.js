import 'regenerator-runtime';
import 'dotenv/config'; // .env 파일은 맨 앞 root 에 있어야 함. scr폴더 말고 그위 맨 상위에...
import './db';
import './models/Video';
import './models/User';
import './models/Comment';
import app from './server';

const PORT = process.env.PORT || 4000;

const handleListenning = () => console.log(`✅ Server Listening on http://localhost:${PORT} 🚀`);
// ------- 아래코드로 실행해도 같은 결과 -
// function handleListenning() {
//   console.log('Server Listening on port 4000');
// }
// ------- 아래코드로 실행해도 같은 결과
// const handleListenning = function() {
//     console.log('Server Listening on port 4000');
// }
app.listen(PORT, handleListenning);
