import { create } from "zustand";

export const useFormStore = create((set) => ({
  form: [{ "x-identifier": "Dynamic-form" }],
  setForm: (val) => set((state) => ({ form: [...state.form, val] })),
  setFreshForm: (val) => set(() => ({ form: val })),
}));

export const useSubmissionForm = create((set) => ({
  submissionForm: [],
  setSubmissionForm: (val) =>
    set((state) => ({ submissionForm: [...state.submissionForm, val] })),
  clearSubmissionForm: () => set(() => ({ submissionForm: [] })),
  setFreshSubmissionForm: (val) => set(() => ({ submissionForm: val })),
}));

export const useCreateForm = create((set) => ({
  value: false,
  setVal: () => set((state) => ({ value: !state.value })),
}));
