export type Fortune = {
  _id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type SaveFortunePayload = {
  name: string;
  text: string;
};

export type SaveFortuneResponse = {
  success: boolean;
  id?: string;
  message?: string;
};
