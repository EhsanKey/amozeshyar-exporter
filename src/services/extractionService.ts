import { Course } from "../types/course";
import { TABLE_SELECTOR } from "../constants/columns";
import { getCellText } from "../utils/domUtils";

const MIN_CELLS = 24;

const SKIP_CELLS = 2;

export function findTable(): HTMLTableElement | null {
  return document.querySelector<HTMLTableElement>(TABLE_SELECTOR);
}

export function extractCoursesFromPage(): Course[] {
  const table = findTable();
  if (!table) {
    throw new Error("جدول دروس در این صفحه یافت نشد.");
  }

  const tbody = table.querySelector("tbody");
  if (!tbody) {
    return [];
  }

  const rows = Array.from(tbody.querySelectorAll<HTMLTableRowElement>("tr"));
  const courses: Course[] = [];

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll<HTMLTableCellElement>("td"));

    if (cells.length < MIN_CELLS) {
      continue;
    }

    const course = mapCellsToCourse(cells);
    if (course) {
      courses.push(course);
    }
  }

  return courses;
}

function mapCellsToCourse(cells: HTMLTableCellElement[]): Course | null {
  const get = (index: number): string => getCellText(cells[index + SKIP_CELLS]);

  const courseCode = get(0);
  const classCode = get(5);

  if (!courseCode && !classCode) {
    return null;
  }

  return {
    courseCode,
    courseName: get(1),
    courseType: get(2),
    theoryUnits: get(3),
    practicalUnits: get(4),
    classCode,
    className: get(6),
    schedule: get(7),
    professor: get(8),
    otherProfessors: get(9),
    maxCapacity: get(10),
    registeredCount: get(11),
    examTime: get(12),
    location: get(13),
    degreeLevel: get(14),
    presentationType: get(15),
    presentationLevel: get(16),
    eligibleStudents: get(17),
    educationalGroup: get(18),
    faculty: get(19),
    unit: get(20),
    province: get(21),
  };
}
