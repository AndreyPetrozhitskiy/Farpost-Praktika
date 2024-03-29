import axios from "axios";
import { API_BASE_URL } from "../../../config";

export const GetTask = async (
  token: string,
  reqData: {
    page: number;
    priority: string | null;
    sort: string | null;
    tags: string[] | null;
  }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    Data: reqData,
  };
  const response = await axios.post(
    `${API_BASE_URL}/task/get-tasks`,
    data,
    config
  );
  return response.data;
};
export const GetTags = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_BASE_URL}/task/get-tags`, config);
  return response.data;
};
export const NewTag = async (token: string | null, tag: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    tag: tag,
  };
  const response = await axios.post(
    `${API_BASE_URL}/task/new-tag`,
    data,
    config
  );
  return response.data;
};
export const NewTask = async (
  token: string | null,
  reqData: {
    taskName: string;
    selectedPriority: string;
    selectedTags: string[] | null;
    description: string | null;
  }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = {
    title: reqData.taskName,
    description: reqData.description,
    priority: reqData.selectedPriority,
    tags: reqData.selectedTags,
  };
  const response = await axios.post(
    `${API_BASE_URL}/task/new-task`,
    data,
    config
  );
  return response.data;
};
export const delTask = async (token: string | null, id: number) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_BASE_URL}/task/delete-task/${id}`,
    config
  );

  return response.data;
};
export const edTask = async (
  token: string | null,
  id: number,
  Data: {
    title: string;
    description: string | null;
    priority: string;
    tags: string[] | null;
  }
) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const configData = {
    title: Data.title,
    description: Data.description,
    priority: Data.priority,
    tags: Data.tags,
  };
  const response = await axios.put(
    `${API_BASE_URL}/task/edit-task/${id}`,
    configData,
    configHeader
  );

  return response.data;
};
