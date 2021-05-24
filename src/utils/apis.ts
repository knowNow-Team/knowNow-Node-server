import statusCode from '@utils/statusCode';
import axios from 'axios';
import HttpException from '../exceptions/HttpException';
import { IUserScoreInfo } from '../interfaces/auths.interface';
import resMessage from './resMessage';
const BASE_URL = 'http://www.apis.user.mjuknownow.com/v1/users';

export const getUserData = async (userToken: string, userId: number) => {
  try {
    const userData = await axios.get(`${BASE_URL}/${userId}`, {
      headers: { 'jwt-access-token': userToken },
    });

    if (!userData) {
      throw new HttpException(statusCode.BAD_REQUEST, resMessage.X_READ_FAIL('유저'));
    }

    return userData.data.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserData = async (userToken: string, userId: number, userInfo: IUserScoreInfo) => {
  try {
    const updatedUserData = await axios.put(`${BASE_URL}/${userId}`, userInfo, {
      headers: { 'jwt-access-token': userToken },
    });

    if (!updatedUserData) {
      throw new HttpException(statusCode.BAD_REQUEST, resMessage.X_UPDATE_FAIL('유저'));
    }
    return updatedUserData;
  } catch (error) {
    throw new Error(error);
  }
};
