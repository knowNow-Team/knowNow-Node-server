import App from './app';
import connect from './configs/dbConnection';

const app = new App();
connect();

app.start();
