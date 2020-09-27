const calculateBmi = (height:number, weight:number):string => {
  height = height / 100;
  const bmi = weight / (height*height);  

  if (bmi < 18.5) return 'Low (underweight)';
  else if (bmi <= 25) return 'Normal (healthy weight)';
  else if (bmi <= 30) return 'High (overweight)';
  else return 'Very high (obese)';
}

interface BodyMeasures {
  height:number,
  weight:number
}

const parseArguments = (args: Array<string>):BodyMeasures => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if ( !isNaN(Number(args[2])) && !isNaN(Number(args[3])) ) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const { height, weight } = parseArguments(process.argv);

console.log(calculateBmi(height, weight));