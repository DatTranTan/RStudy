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

const getWords = async () => {
  const url = `word`;
  const result = await axiosClient.get(url);
  return result;
};

const createWord = async (data: WordType) => {
  const url = `word`;
  const result = await axiosClient.post(url, { ...data });
  return result;
};

const updateWord = async (data: WordType) => {
  const url = `word`;
  const result = await axiosClient.post(url, { ...data });
  return result;
};

const deleteWord = async (data: WordType) => {
  const url = `word`;
  const result = await axiosClient.delete(url, { data });
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

const deleteCourse = async (data: FolderType) => {
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

const god_words = async () => {
  const url = `god_words`;
  const result = await axiosClient.get(url);
  return result;
};

const Api = {
  signIn,
  profile,
  collections,
  documents,
  contents,
  god_words,
  getFolders,
  getFolderById,
  createFolder,
  updateFolder,
  deleteFolder,
  getWords,
  createWord,
  updateWord,
  deleteWord,
  getCourseById,createCourse,
  deleteCourse

  //   signIn: (data: SignInType) => {
  //     const url = `authentication/login`;
  //     return axiosClient.post(url, {
  //       ...data,
  //     });
  //   },
  //   collections: () => {
  //     const url = `collections`;
  //     return axiosClient.get(url);
  //   },
  //   documents: (params) => {
  //     const url = `documents`;
  //     return axiosClient.get(url, {
  //       params: params,
  //     });
  //   },
  //   contents: (data) => {
  //     const url = `contents`;
  //     return axiosClient.post(url, {
  //       ...data,
  //     });
  //   },
  //   post: (params) => {
  //     const url = `post`;
  //     return axiosClient.get(url, {
  //       params: params,
  //     });
  //   },
  //   me: () => {
  //     const url = `users/me`;
  //     return axiosClient.get(url);
  //   },
};
export default Api;
