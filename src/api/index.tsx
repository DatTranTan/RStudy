// api/productApi.js

import axiosClient from "../configs/axios";
import { SignInType, WordType } from "../types";

const signIn = async (data: SignInType) => {
  const url = `user/login`;
  const result = await axiosClient.post(url, { ...data });
  return result;
};

const createFolder = async (data: SignInType) => {
  const url = `folder`;
  const result = await axiosClient.post(url, { ...data });
  return result;
};

const getFolder = async () => {
  const url = `folder`;
  const result = await axiosClient.get(url);
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
  getFolder,
  getWords
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
