import React from 'react';
import ReactDOM from 'react-dom';

const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
  <h1>{courseName}</h1>
) 

interface Course {
  name: string;
  exerciseCount: number;
}

const Content: React.FC<{ courseParts: Array<Course> }> = ({ courseParts }) => (
  <div>
    {courseParts.map( (cp: Course) => 
      <p key={cp.name}>{cp.name} {cp.exerciseCount}</p>
    )}
  </div>
)

const Total: React.FC<{ courseParts: Array<Course> }> = ({ courseParts }) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
)

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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
