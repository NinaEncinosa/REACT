const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.excercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} excercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} excercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} excercise={props.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.excercises[0].exercises +
        props.excercises[1].exercises +
        props.excercises[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total excercises={course.parts} />
    </div>
  );
};

export default App;
