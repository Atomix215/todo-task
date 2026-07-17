export const TODO_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const;

export type TodoStatusType = (typeof TODO_STATUS)[keyof typeof TODO_STATUS];
