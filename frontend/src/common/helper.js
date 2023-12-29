
export const normalizeTask = (task,tasks) => {
    return {
      ...task,
      status : tasks[task.id]
    };
  };

  export const getPublicImage = path => {
    const publicUrl = '/api'
    return `${publicUrl}/${path}`
  };