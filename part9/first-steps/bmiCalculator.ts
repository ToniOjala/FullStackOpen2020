
const calculateBmi = (height:number, weight:number):string => {
  height = height / 100;
  const bmi = weight / (height*height);  

  if (bmi < 18.5) return 'Low (underweight)';
  else if (bmi <= 25) return 'Normal (healthy weight)';
  else if (bmi <= 30) return 'High (overweight)';
  else return 'Very high (obese)';
}

console.log(calculateBmi(180,74));