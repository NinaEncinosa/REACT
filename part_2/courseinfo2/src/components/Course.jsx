const Header = ({ courseTitle }) => {
  return <h1>{courseTitle}</h1>;
};

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ excercises }) => {
  const total = excercises.reduce((sum, p) => sum + p.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseTitle={course.name} />
      <Content parts={course.parts} />
      <Total excercises={course.parts} />
    </div>
  );
};

export default Course;
