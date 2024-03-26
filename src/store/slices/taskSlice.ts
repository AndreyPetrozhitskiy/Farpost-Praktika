import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  priority: string;
  created_at: string;
  tags?: string[] | null;
}
interface TaskState {
  DataTasks: Task[];
  ReqData: {
    page: number;
    priority: string | null;
    sort: string | null;
    tags: string[] | null;
  };
  CreateBody: {
    title: String;
    description: String | null;
    priority: String | null;
    tags: string[] | null;
  };
}

const initialState: TaskState = {
  DataTasks: [],
  ReqData: {
    page: 1,
    priority: "New",
    sort: "",
    tags: [],
  },
  CreateBody: {
    title: "",
    description: "",
    priority: "",
    tags: [],
  },
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateTasks: (state, action: PayloadAction<Task[]>) => {
      state.DataTasks = action.payload;
    },
    setReqData: (
      state,
      {
        payload: { page },
      }: PayloadAction<{
        page: number;
        tags: { priority: string; sort: string };
      }>
    ) => {
      state.ReqData.page = page;
    },
    setBody: (
      state,
      {
        payload: { title, description, priority, tags },
      }: PayloadAction<{
        title: string;
        description: string;
        priority: string;
        tags: string[];
      }>
    ) => {
      (state.CreateBody.title = title),
        (state.CreateBody.description = description),
        (state.CreateBody.priority = priority),
        (state.CreateBody.tags = tags);
    },
  },
});

export const { setReqData, setBody, updateTasks } = taskSlice.actions;

export default taskSlice.reducer;
