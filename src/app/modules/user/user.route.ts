import express from 'express';
import { userControllers } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import { ValidateRequest } from '../../../middlewares/validateRequest';

const router = express.Router();

//will call controller func
router.post(
  '/create-user',
  ValidateRequest(createStudentValidationSchema),
  userControllers.createStudent,
);

export const UserRoutes = router;
