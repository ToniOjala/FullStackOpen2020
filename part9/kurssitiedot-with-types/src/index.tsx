import React from 'react';
import ReactDOM from 'react-dom';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "Fun with Typescript";
  groupProjectCount: number;
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
  <h1>{courseName}</h1>
) 

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  switch(coursePart.name) {
    case "Fundamentals":
      return (
        <div>
          <h4>{coursePart.name}</h4>
          <div>{coursePart.exerciseCount}</div>
          <div>{coursePart.description}</div>
        </div>
      )
    case "Using props to pass data":
      return (
        <div>
          <h4>{coursePart.name}</h4>
          <div>{coursePart.exerciseCount}</div>
          <div>{coursePart.groupProjectCount}</div>
        </div>
      )
    case "Deeper type usage":
      return (
        <div>
          <h4>{coursePart.name}</h4>
          <div>{coursePart.description}</div>
          <div>{coursePart.exerciseSubmissionLink}</div>
        </div>
      )
    case "Fun with Typescript":
      return (
        <div>
          <h4>{coursePart.name}</h4>
          <div>{coursePart.exerciseCount}</div>
          <div>{coursePart.description}</div>
          <div>{coursePart.groupProjectCount}</div>
          <div>{coursePart.exerciseSubmissionLink}</div>
        </div>
      )
    default:
      return assertNever(coursePart)
  }
}

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
  <div>
    {courseParts.map( (cp: CoursePart) => 
      <Part key={cp.name} coursePart={cp} />
    )}
  </div>
)

const Total: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Fun with Typescript",
      exerciseCount: 23,
      description: "So much fun",
      groupProjectCount: 2,
      exerciseSubmissionLink: "https://fake-stuff.io"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
