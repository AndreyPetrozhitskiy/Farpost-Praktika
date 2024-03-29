import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  priority: string;
  created_at: string;
  tags: string[] | null;
}
interface TaskState {
  DataTasks: Task[];
  Priority: string[];
  loading: boolean;
  countLoading: number;
  ReqData: {
    page: number;
    priority: string | null;
    sort: string | null;
    tags: string[] | null;
  };
  Tags: string[];
  ModalDelete: {
    isVisible: boolean;
    id: number | null;
  };
}

const initialState: TaskState = {
  DataTasks: [],
  Priority: ["Low", "Normal", "High"],
  loading: false,
  countLoading: 1,
  Tags: [],
  ReqData: {
    page: 1,
    priority: "",
    sort: "New",
    tags: [],
  },
  ModalDelete: {
    isVisible: false,
    id: null,
  },
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    cleanCountLoading: (state) => {
      state.countLoading = 1;
    },
    setCountLoading: (state) => {
      state.countLoading++;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.DataTasks = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateTasks: (state, action: PayloadAction<Task[]>) => {
      state.DataTasks = [...state.DataTasks, ...action.payload];
    },
    setModalDelete: (
      state,
      {
        payload: { isVisible, id },
      }: PayloadAction<{ isVisible: boolean; id: number | null }>
    ) => {
      state.ModalDelete.isVisible = isVisible;
      state.ModalDelete.id = id;
    },
    cleanModalDelete: (state) => {
      state.ModalDelete.isVisible = false;
      state.ModalDelete.id = null;
    },
    setReqData: (
      state,
      {
        payload: { page, priority, sort, tags },
      }: PayloadAction<{
        page: number | null;
        priority: string | null;
        sort: string | null;
        tags: string[] | null;
      }>
    ) => {
      if (page) {
        state.ReqData.page = page;
      }

      if (priority) {
        state.ReqData.priority = priority;
      }
      if (sort) {
        state.ReqData.sort = sort;
      }
      if (tags) {
        state.ReqData.tags = tags;
      }
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.Tags = action.payload;
    },
    cleanState: (state) => {
      state.DataTasks = [];
      state.Tags = [];
      state.ReqData = {
        page: 1,
        priority: "",
        sort: "New",
        tags: [],
      };
    },
    cleanReqData: (state) => {
      state.ReqData = {
        page: 1,
        priority: "",
        sort: "New",
        tags: [],
      };
    },
  },
});

export const {
  setReqData,
  setTasks,
  setTags,
  cleanState,
  setModalDelete,
  cleanModalDelete,
  updateTasks,
  setLoading,
  cleanReqData,
  setCountLoading,
  cleanCountLoading,
} = taskSlice.actions;

export default taskSlice.reducer;
