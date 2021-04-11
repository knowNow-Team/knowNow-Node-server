import { Router } from 'express';
import TestsController from '../../controllers/v1/tests.controller';
import { TestDto } from '../../dtos/tests.dto';
import validationMiddleware from '../../middlewares/validation.middleware';
import IRoute from '../../interfaces/routes.interface';

class TestRoute implements IRoute {
  public path = '/v1/tests';
  public router = Router();
  public testsController = new TestsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.testsController.getTests);
    this.router.get(`${this.path}/:id`, this.testsController.getTestById);
    this.router.post(`${this.path}`, validationMiddleware(TestDto, 'body'), this.testsController.createTest);
    this.router.put(`${this.path}/:id`, validationMiddleware(TestDto, 'body', true), this.testsController.updateTest);
    this.router.delete(`${this.path}/:id`, this.testsController.deleteTest);
  }
}

export default TestRoute;
