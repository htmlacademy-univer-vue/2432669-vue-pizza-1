
export const normalizeTask = (task,tasks) => {
    return {
      ...task,
      status : tasks[task.id]
    };
  };

  export const getPublicImage = path => {
    const publicUrl = 'http://localhost:3000'
    return `${publicUrl}/${path}`
  };