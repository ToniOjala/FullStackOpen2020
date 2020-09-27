interface Result {
  periodLength:number,
  trainingDays:number,
  success:boolean,
  rating:number,
  ratingDescription:string,
  target:number,
  average:number
}

const calculateExercises = (hours:number[], targetHours:number):Result => {
  const result:Result = {
    periodLength: hours.length,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: '',
    target: targetHours,
    average: 0,
  }
  let successfulDays = 0;
  let totalHours = 0;
  
  // Gather training days, total hours and successful days
  hours.forEach(h => {
    if (h > 0) {
      result.trainingDays++;
      totalHours += h;

      if (h >= targetHours) successfulDays++;
    }
  })

  // Calculate average hours
  result.average = totalHours / hours.length;

  // Calculate rating based on average hours divided by target hours
  result.rating = Math.floor(3 * (result.average / targetHours));
  if (result.rating < 1) result.rating = 1;

  // Determine rating description
  switch(result.rating) {
    case 1: 
      result.ratingDescription = 'you lack self-discipline'
      break;
    case 2:
      result.ratingDescription = 'almost there'
      break;
    case 3:
      result.ratingDescription = 'you have reached your goal'
      break;
    default:
      break;
  }

  // Determine if target was reached
  if (result.average >= targetHours) result.success = true;

  return result;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));