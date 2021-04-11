import { TestDto } from '../../dtos/tests.dto';
import HttpException from '../../exceptions/HttpException';
import { ITest } from '../../interfaces/tests.interface';
import TestModel from '../../models/tests.model';
import { resMessage, statusCode, util } from '../../utils';

class TestService {
  public TestModel = new TestModel().getModel();

  public async findAllTest(): Promise<ITest[]> {
    const tests: ITest[] = await this.TestModel.find();
    return tests;
  }

  public async findTestById(testId: string): Promise<ITest> {
    const findTest = await this.TestModel.findOne({ _id: testId });
    if (!findTest) throw new HttpException(409, "You're not Test");

    return findTest;
  }

  public async createTest(testData: TestDto): Promise<ITest> {
    if (isEmpty(testData)) throw new HttpException(400, "You're not TestData");

    const createTestData: ITest = await this.TestModel.create({ ...testData });
    return createTestData;
  }

  public async updateTest(testId: string, testData: ITest): Promise<ITest> {
    if (isEmpty(testData)) throw new HttpException(400, "You're not TestData");

    const updateTestById = await this.TestModel.findByIdAndUpdate(testId, { ...testData });
    if (!updateTestById) throw new HttpException(409, "You're not Test");

    return updateTestById;
  }

  public async deleteTestData(testId: string): Promise<ITest> {
    const deleteTestById = await this.TestModel.findByIdAndDelete(testId);
    if (!deleteTestById) throw new HttpException(409, "You're not Test");

    return deleteTestById;
  }
}

export default TestService;
