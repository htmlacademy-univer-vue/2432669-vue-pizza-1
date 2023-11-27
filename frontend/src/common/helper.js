import dough from '.data/doughSizes.js'
import ingredients from '.data/ingredients.js'
import sauces from './data/sauces.js'
import sizes from './data/sizes.js'
export const normalizeTask = (task,tasks) => {
    return {
      ...task,
      status : task.id?tasks[task.id]:""
    };
  };