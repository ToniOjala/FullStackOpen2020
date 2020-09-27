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
  };
  let totalHours = 0;
  
  // Gather training days, total hours
  hours.forEach(h => {
    if (h > 0) {
      result.trainingDays++;
      totalHours += h;
    }
  });

  // Calculate average hours
  result.average = totalHours / hours.length;

  // Calculate rating based on average hours divided by target hours
  result.rating = Math.floor(3 * (result.average / targetHours));
  if (result.rating < 1) result.rating = 1;

  // Determine rating description
  switch(result.rating) {
    case 1: 
      result.ratingDescription = 'you lack self-discipline';
      break;
    case 2:
      result.ratingDescription = 'almost there';
      break;
    case 3:
      result.ratingDescription = 'you have reached your goal';
      break;
    default:
      break;
  }

  // Determine if target was reached
  if (result.average >= targetHours) result.success = true;

  return result;
};

interface InputValues {
  loggedHours: Array<number>,
  targetHours: number
}

const parseArgs = (args: Array<string>):InputValues => {
  if (args.length < 2) throw new Error('Not enough arguments');

  args.forEach(arg => {
    if(isNaN(Number(arg))) throw new Error('At least one of the provided values was not a number!');
  });

  const targetHours = Number(args.shift());
  const loggedHours:Array<number> = [];

  args.forEach(arg => {
    loggedHours.push(Number(arg));
  });

  return { loggedHours, targetHours };
};

const { loggedHours, targetHours } = parseArgs(process.argv.slice(2));

console.log(calculateExercises(loggedHours, targetHours));