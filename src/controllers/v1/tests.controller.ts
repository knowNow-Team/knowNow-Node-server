import { NextFunction, Request, Response } from 'express';
import { TestDto } from '../../dtos/tests.dto';
import { ITest } from '../../interfaces/tests.interface';
import TestService from '../../services/v1/tests.service';

class TestController {
  public TestService = new TestService();

  public getTests = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllTestsData: ITest[] = await this.TestService.findAllTest();
      res.status(200).json({ data: findAllTestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTestById = async (req: Request, res: Response, next: NextFunction) => {
    const testId: string = req.params.id;

    try {
      const findOneTestData: ITest = await this.TestService.findTestById(testId);
      res.status(200).json({ data: findOneTestData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTest = async (req: Request, res: Response, next: NextFunction) => {
    const testData: TestDto = req.body;

    try {
      const createTestData: ITest = await this.TestService.createTest(testData);
      res.status(201).json({ data: createTestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTest = async (req: Request, res: Response, next: NextFunction) => {
    const testId: string = req.params.id;
    const testData: ITest = req.body;

    try {
      const updateTestData: ITest = await this.TestService.updateTest(testId, testData);
      res.status(200).json({ data: updateTestData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTest = async (req: Request, res: Response, next: NextFunction) => {
    const testId: string = req.params.id;

    try {
      const deleteTestData: ITest = await this.TestService.deleteTestData(testId);
      res.status(200).json({ data: deleteTestData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TestController;
