export enum Status {
  ANALYSIS = 'ANALYSIS',
  READY = 'READY',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

// TODO: Proof of concept, delete once sorts are implemented on backend
export const statusMap: Record<Status, number> = {
  IN_PROGRESS: 1,
  READY: 1,
  TODO: 1,
  ANALYSIS: 1,
  DONE: 4,
};
