import App from './app';
import 'dotenv/config';
import { validateEnv } from './utils';
import IndexRoute from './routes/index.route';
import TestsRoute from './routes/v1/tests.route';
import WordbooksRoute from './routes/v1/wordbooks.route';
import WordsRoute from './routes/v1/words.route';

validateEnv();

const app = new App([new IndexRoute(), new TestsRoute(), new WordbooksRoute(), new WordsRoute()]);

app.start();
