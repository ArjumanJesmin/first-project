export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  connectNo: string;
};
export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  connectNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'AB+' | 'AB-' | 'B+' | 'B-' | 'O+' | 'O-';
  permanentAddress: string;
  presentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};
