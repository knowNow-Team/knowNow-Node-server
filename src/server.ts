import App from './app';
import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import IndexRoute from './routes/index.route';
import TestsRoute from './routes/v1/tests.route';

validateEnv();

const app = new App([new IndexRoute(), new TestsRoute()]);

app.start();
