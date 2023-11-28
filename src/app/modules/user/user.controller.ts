import httpStatus from 'http-status';
import { userServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  console.log(req.body);
  const { password, student: studentData } = req.body;

  const result = await userServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is create Successfully',
    data: result,
  });
});

export const userControllers = { createStudent };
