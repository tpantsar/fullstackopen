const Header = ({ name }: { name: string }) => {
  return <h2>{name}</h2>;
};

const Content = ({ parts }: { parts: Array<{ name: string; exerciseCount: number }> }) => (
  <div>
    {parts.map(({ name, exerciseCount }, index) => (
      <Part key={index} name={name} exercises={exerciseCount} />
    ))}
  </div>
);

const Part = ({ name, exercises }: { name: string; exercises: number }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }: { parts: Array<{ name: string; exerciseCount: number }> }) => {
  return (
    <p>
      <strong>Total exercises:</strong>{' '}
      {parts.map((part) => part.exerciseCount).reduce((a, b) => a + b, 0)}
    </p>
  );
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
