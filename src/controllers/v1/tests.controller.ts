import { NextFunction, Request, Response } from 'express';
import { TestDto } from '../../dtos/tests.dto';
import HttpException from '../../exceptions/HttpException';
import { ITest } from '../../interfaces/tests.interface';
import TestService from '../../services/v1/tests.service';
import { resMessage, statusCode, util } from '../../utils';

const TEST = '시험';

class TestController {
  public TestService = new TestService();

  public getTests = async (req: Request, res: Response, next: NextFunction) => {
    const testerId: number = req.userId;
    try {
      const findAllTestsData: ITest[] = await this.TestService.findAllTest(testerId);

      res.status(statusCode.OK).json({ message: resMessage.X_READ_ALL_SUCCESS(TEST), data: findAllTestsData });
    } catch (error) {
      next(error);
    }
  };

  public getTestById = async (req: Request, res: Response, next: NextFunction) => {
    const testId: string = req.params.id;

    try {
      const findOneTestData: ITest = await this.TestService.findTestById(testId);

      return res.status(statusCode.OK).json({ message: resMessage.X_READ_SUCCESS(TEST), data: findOneTestData });
    } catch (error) {
      next(error);
    }
  };

  public createTest = async (req: Request, res: Response, next: NextFunction) => {
    const testData: TestDto = req.body;
    const userId: number = req.userId;
    const userToken: string = req.header('Authorization') as string;

    try {
      if (util.isEmpty(testData)) throw new HttpException(statusCode.BAD_REQUEST, resMessage.NULL_VALUE);

      const createdTestData = await this.TestService.createTest(testData);

      if (!createdTestData) {
        throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, resMessage.X_CREATE_FAIL(TEST));
      }

      await this.TestService.updateUserTestInfo(userToken, userId, createdTestData);

      return res.status(statusCode.CREATED).json({ message: resMessage.X_CREATE_SUCCESS(TEST) });
    } catch (error) {
      next(error);
    }
  };

  public updateTest = async (req: Request, res: Response, next: NextFunction) => {
    const testId: string = req.params.id;
    const testData: ITest = req.body;

    try {
      if (util.isEmpty(testData)) throw new HttpException(statusCode.BAD_REQUEST, resMessage.NULL_VALUE);

      const updateTestData: ITest = await this.TestService.updateTest(testId, testData);

      return res.status(statusCode.OK).json({ message: resMessage.X_UPDATE_SUCCESS(TEST), data: updateTestData });
    } catch (error) {
      next(error);
    }
  };

  public deleteTest = async (req: Request, res: Response, next: NextFunction) => {
    const testId: string = req.params.id;

    try {
      const deleteTestData: ITest = await this.TestService.deleteTestData(testId);

      return res.status(statusCode.OK).json({ message: resMessage.X_DELETE_SUCCESS(TEST), data: deleteTestData });
    } catch (error) {
      next(error);
    }
  };
}

export default TestController;
