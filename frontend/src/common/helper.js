
export const normalizeTask = (task,tasks) => {
    return {
      ...task,
      status : tasks[task.id]
    };
  };