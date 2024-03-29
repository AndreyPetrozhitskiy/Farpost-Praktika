import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetTask,
  GetTags,
  NewTag,
  NewTask,
  delTask,
  edTask,
} from "../services/taskService";

export const getTask = createAsyncThunk(
  "task/get",
  async ({
    token,
    Data,
  }: {
    token: string;
    Data: {
      page: number;
      priority: string | null;
      sort: string | null;
      tags: string[] | null;
    };
  }) => {
    const response = await GetTask(token, Data);
    return response;
  }
);
export const getTags = createAsyncThunk(
  "task/gettags",
  async ({ token }: { token: string }) => {
    const response = await GetTags(token);
    return response;
  }
);
export const createTag = createAsyncThunk(
  "task/createtag",
  async ({ token, tagName }: { token: string | null; tagName: string }) => {
    const response = await NewTag(token, tagName);

    return response;
  }
);
export const createTask = createAsyncThunk(
  "task/createtask",
  async ({
    token,
    tagName,
  }: {
    token: string | null;
    tagName: {
      taskName: string;
      selectedPriority: string;
      selectedTags: string[] | null;
      description: string | null;
    };
  }) => {
    const response = await NewTask(token, tagName);
    return response;
  }
);
export const deleteTask = createAsyncThunk(
  "task/deletetask",
  async ({ token, id }: { token: string; id: number }) => {
    const response = await delTask(token, id);
    return response;
  }
);
export const editTask = createAsyncThunk(
  "task/edittask",
  async ({
    token,
    id,
    Data,
  }: {
    token: string;
    id: number;
    Data: {
      title: string;
      description: string | null;
      priority: string;
      tags: string[] | null;
    };
  }) => {
    const response = await edTask(token, id, Data);
    return response;
  }
);
