import { Course } from "../types/course";
import { STORAGE_KEY } from "../constants/columns";

function courseKey(course: Course): string {
  return `${course.courseCode}::${course.classCode}`;
}

export async function loadCourses(): Promise<Course[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      const courses = (result[STORAGE_KEY] as Course[] | undefined) ?? [];
      resolve(courses);
    });
  });
}

async function saveCourses(courses: Course[]): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [STORAGE_KEY]: courses }, () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve();
      }
    });
  });
}

export async function appendCourses(newCourses: Course[]): Promise<number> {
  const existing = await loadCourses();
  const existingKeys = new Set(existing.map(courseKey));

  const uniqueNew = newCourses.filter((c) => !existingKeys.has(courseKey(c)));
  const merged = [...existing, ...uniqueNew];

  await saveCourses(merged);
  return uniqueNew.length;
}

export async function clearCourses(): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove([STORAGE_KEY], () => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve();
      }
    });
  });
}


export async function getCourseCount(): Promise<number> {
  const courses = await loadCourses();
  return courses.length;
}
