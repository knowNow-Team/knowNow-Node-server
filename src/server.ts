import App from './app';
import 'dotenv/config';
import { validateEnv } from './utils';
import IndexRoute from './routes/index.route';
import TestsRoute from './routes/v1/tests.route';
import WordBooksRoute from './routes/v1/wordBooks.route';
import WordsRoute from './routes/v1/words.route';

validateEnv();

const app = new App([new IndexRoute(), new TestsRoute(), new WordBooksRoute(), new WordsRoute()]);

app.start();
