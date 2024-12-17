// api/productApi.js

import axiosClient from "../configs/axios";
import { CourseType, FolderType, SignInType, WordType } from "../types";

const signIn = async (data: SignInType) => {
  const url = `user/login`;
  const result = await axiosClient.post(url, { ...data });
  return result;
};

const createFolder = async (data: FolderType) => {
  const url = `folder`;
  const result = await axiosClient.post(url, { ...data });
  return result;
};

const getFolders = async () => {
  const url = `folder`;
  const result = await axiosClient.get(url);
  return result;
};

const getFolderById = async (folderId: string) => {
  const url = `folder/${folderId}`;
  const result = await axiosClient.get(url);
  return result;
};

const updateFolder = async (data: FolderType) => {
  const url = `folder`;
  const result = await axiosClient.put(url, { ...data });
  return result;
};

const deleteFolder = async (data: FolderType) => {
  const url = `folder`;
  const result = await axiosClient.delete(url, { data });
  return result;
};

const getWords = async (params: { topic?: string; search?: string }) => {
  const url = `word`;
  const result = await axiosClient.get(url, {
    params: params,
  });
  return result;
};

const getWordsAvailable = async (
  params: { topic?: string; search?: string },
  courseId: string
) => {
  const url = `word/available `;
  const result = await axiosClient.post(
    url,
    { courseId },
    {
      params: params,
    }
  );
  return result;
};

const createWord = async (data: WordType) => {
  const url = `word`;
  const result = await axiosClient.post(url, { ...data });
  return result;
};

const updateWord = async (data: WordType) => {
  const url = `word`;
  const result = await axiosClient.put(url, { ...data });
  return result;
};

const deleteWord = async (data: WordType) => {
  const url = `word`;
  const result = await axiosClient.delete(url, { data });
  return result;
};

const deleteAllWord = async () => {
  const url = `word/deleteAll`;
  const result = await axiosClient.delete(url);
  return result;
};

const getCourseById = async (courseId: string) => {
  const url = `course/${courseId}`;
  const result = await axiosClient.get(url);
  return result;
};

const createCourse = async (data: CourseType) => {
  const url = `course`;
  const result = await axiosClient.post(url, { ...data });
  return result;
};

const updateCourse = async (data: CourseType) => {
  const url = `course`;
  const result = await axiosClient.put(url, { ...data });
  return result;
};

const deleteCourse = async (data: CourseType) => {
  const url = `course`;
  const result = await axiosClient.delete(url, { data });
  return result;
};

const profile = async () => {
  const url = `user/me`;
  const result = await axiosClient.post(url);
  return result;
};

const collections = async () => {
  const url = `collections`;
  const result = await axiosClient.get(url);
  return result;
};

const documents = async (params: { collectionId: number }) => {
  const url = `documents`;
  const result = await axiosClient.get(url, {
    params: params,
  });
  return result;
};

const contents = async (data: { documentId: string }) => {
  const url = `contents`;
  const result = await axiosClient.post(url, {
    ...data,
  });
  return result;
};

const Api = {
  signIn,
  profile,
  collections,
  documents,
  contents,
  getFolders,
  getFolderById,
  createFolder,
  updateFolder,
  deleteFolder,
  getWords,
  createWord,
  updateWord,
  deleteWord,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
  deleteAllWord,
  getWordsAvailable,
};
export default Api;
