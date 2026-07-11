import { CourseKey } from "../types/course";

export interface ColumnDefinition {
  key: CourseKey;
  label: string;
  excelWidth: number;
  pdfWidth: number;
}

export const COURSE_COLUMNS: ColumnDefinition[] = [
  { key: "courseCode", label: "كد درس", excelWidth: 13, pdfWidth: 10 },
  { key: "courseName", label: "نام درس", excelWidth: 34, pdfWidth: 40 },
  { key: "courseType", label: "نوع درس", excelWidth: 10, pdfWidth: 9 },
  { key: "theoryUnits", label: "واحد نظري", excelWidth: 8, pdfWidth: 7 },
  { key: "practicalUnits", label: "واحد عملي", excelWidth: 8, pdfWidth: 7 },
  { key: "classCode", label: "كد ارائه کلاس", excelWidth: 21, pdfWidth: 18 },
  { key: "className", label: "نام كلاس درس", excelWidth: 22, pdfWidth: 20 },
  { key: "schedule", label: "زمانبندي کلاس", excelWidth: 25, pdfWidth: 22 },
  { key: "professor", label: "استاد", excelWidth: 20, pdfWidth: 18 },
  {
    key: "otherProfessors",
    label: "ساير اساتيد",
    excelWidth: 20,
    pdfWidth: 18,
  },
  { key: "maxCapacity", label: "ظرفيت", excelWidth: 8, pdfWidth: 7 },
  { key: "registeredCount", label: "ثبت‌نامي", excelWidth: 8, pdfWidth: 7 },
  { key: "examTime", label: "زمان امتحان", excelWidth: 20, pdfWidth: 18 },
  { key: "location", label: "مكان برگزاري", excelWidth: 20, pdfWidth: 17 },
  { key: "degreeLevel", label: "مقطع درس", excelWidth: 14, pdfWidth: 12 },
  { key: "presentationType", label: "نوع ارائه", excelWidth: 10, pdfWidth: 9 },
  {
    key: "presentationLevel",
    label: "سطح ارائه",
    excelWidth: 18,
    pdfWidth: 15,
  },
  {
    key: "eligibleStudents",
    label: "دانشجويان مجاز",
    excelWidth: 32,
    pdfWidth: 32,
  },
  {
    key: "educationalGroup",
    label: "گروه آموزشی",
    excelWidth: 20,
    pdfWidth: 18,
  },
  { key: "faculty", label: "دانشکده", excelWidth: 20, pdfWidth: 17 },
  { key: "unit", label: "واحد دانشگاهي", excelWidth: 20, pdfWidth: 17 },
  { key: "province", label: "استان", excelWidth: 11, pdfWidth: 9 },
];

export const DEFAULT_COLUMNS: ReadonlySet<CourseKey> = new Set<CourseKey>([
  "courseCode",
  "courseName",
  "courseType",
  "theoryUnits",
  "practicalUnits",
  "classCode",
  "examTime",
  "schedule",
  "professor",
]);

export const STORAGE_KEY = "amozeshyar_courses";

export const DATA_CELL_START_INDEX = 2;

export const TABLE_SELECTOR = "table#scrollable";

export const TOOLBAR_ID = "amz-exporter-toolbar";
