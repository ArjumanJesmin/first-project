import { Schema, model } from 'mongoose';
import {
  Guardian,
  Student,
  UserName,
  LocalGuardian,
} from './student/student.interface';

const UserNameSchema = new Schema<UserName>({
  firstName: { type: String, require: true },
  middleName: { type: String },
  lastName: { type: String, require: true },
});

const GuardianSchema = new Schema<Guardian>({
  fatherName: { type: String, require: true },
  fatherOccupation: { type: String, require: true },
  motherName: { type: String, require: true },
  motherOccupation: { type: String, require: true },
  motherContactNo: { type: String, require: true },
});
const LocalGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, require: true },
  occupation: { type: String, require: true },
  connectNo: { type: String, require: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: UserNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { String },
  email: { type: String, require: true },
  connectNo: { type: String, require: true },
  emergencyContactNo: { type: String, require: true },
  bloodGroup: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  permanentAddress: { type: String, require: true },
  presentAddress: { type: String, require: true },
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});

export const StudentModel = model<Student>('Student', studentSchema);
