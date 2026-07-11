export interface Course {
  courseCode: string;
  courseName: string;
  courseType: string;
  theoryUnits: string;
  practicalUnits: string;
  classCode: string;
  className: string;
  schedule: string;
  professor: string;
  otherProfessors: string;
  maxCapacity: string;
  registeredCount: string;
  examTime: string;
  location: string;
  degreeLevel: string;
  presentationType: string;
  presentationLevel: string;
  eligibleStudents: string;
  educationalGroup: string;
  faculty: string;
  unit: string;
  province: string;
}

export type CourseKey = keyof Course;

export interface StoragePayload {
  courses: Course[];
}

export interface ExportOptions {
  selectedColumns: CourseKey[];
  fileName: string;
}
