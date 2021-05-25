import { TestDto } from '../../dtos/tests.dto';
import HttpException from '../../exceptions/HttpException';
import { ITest } from '../../interfaces/tests.interface';
import TestModel from '../../models/tests.model';
import { resMessage, statusCode } from '../../utils';
import { getUserData, updateUserData, updateUserExp } from '../../utils/apis';

const TEST = '시험';

class TestService {
  public TestModel = new TestModel().getModel();

  public async findAllTest(testerId: number): Promise<ITest[]> {
    const tests: ITest[] = await this.TestModel.find({ testerId });
    return tests;
  }

  public async findTestById(testId: string): Promise<ITest> {
    const findTest = await this.TestModel.findOne({ _id: testId }).populate('words.wordId');
    if (!findTest) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(TEST));

    return findTest;
  }

  public async createTest(testData: TestDto): Promise<ITest> {
    const createTestData: ITest = await this.TestModel.create({ ...testData });
    return createTestData;
  }

  public async updateTest(testId: string, testData: ITest): Promise<ITest> {
    const updateTestById = await this.TestModel.findByIdAndUpdate(testId, { ...testData });
    if (!updateTestById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(TEST));

    return updateTestById;
  }

  public async deleteTestData(testId: string): Promise<ITest> {
    const deleteTestById = await this.TestModel.findByIdAndDelete(testId);
    if (!deleteTestById) throw new HttpException(statusCode.NOT_FOUND, resMessage.NO_X(TEST));

    return deleteTestById;
  }

  public async updateUserTestInfo(userToken: string, userId: number, testData: ITest): Promise<void> {
    const userData = await getUserData(userToken, userId);
    const userTestInfo = {
      wordCount: userData.wordCount,
      examCount: userData.examCount + 1,
      correctPercentage: parseFloat(
        ((userData.correctPercentage * userData.examCount + testData.score) / (userData.examCount + 1)).toFixed(2),
      ),
    };

    const exp = testData.score > 69 ? 10 : testData.score > 29 ? 7 : 3;

    await updateUserExp(userToken, userId, exp);
    await updateUserData(userToken, userId, userTestInfo);
  }
}

export default TestService;
