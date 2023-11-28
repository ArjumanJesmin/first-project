/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  TStudent,
  TUserName,
  TLocalGuardian,
  StudentModel,
} from './student.interface';


const UserNameSchema = new Schema<TUserName>({
  firstName: {
    trim: true,
    type: String,
    require: [true, 'First name is required'],
    validate: function (value: string) {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
      return firstNameStr === value;
    },
    message: '{VALUE} is not in capitalize format',
  },
  middleName: { type: String },
  lastName: {
    type: String,
    require: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
    },
    message: '{VALUE} is not valid',
  },
});

const GuardianSchema = new Schema<Guardian>({
  fatherName: { type: String, require: true },
  fatherOccupation: { type: String, require: true },
  motherName: { type: String, require: true },
  motherOccupation: { type: String, require: true },
  motherContactNo: { type: String, require: true },
});
const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, require: true },
  occupation: { type: String, require: true },
  connectNo: { type: String, require: true },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: "User",
    },
    name: {
      type: UserNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    dateOfBirth: { String },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: { validator: (value: string) => validator.isEmail(value) },
      message: '{VALUE} ',
    },
    connectNo: { type: String, require: true },
    emergencyContactNo: { type: String, require: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    },
    permanentAddress: { type: String, require: true },
    presentAddress: { type: String, require: true },
    guardian: {
      type: GuardianSchema,
      required: true,
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: true,
    },
    profileImg: { type: String },
    // isDeleted: {
    //   type: boolean,
    //   default: false,
    // },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('firstName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});



// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
