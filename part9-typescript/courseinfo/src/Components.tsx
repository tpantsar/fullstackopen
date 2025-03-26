import { CoursePart } from './types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export const Header = ({ name }: { name: string }) => {
  return <h2>{name}</h2>;
};

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.name} coursePart={part} />
      ))}
    </div>
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  console.log(coursePart);
  switch (coursePart.kind) {
    case 'basic':
      return (
        <div className="part">
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>{coursePart.description}</p>
        </div>
      );
    case 'group':
      return (
        <div className="part">
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>Project exercises: {coursePart.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div className="part">
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>{coursePart.description}</p>
          <p>
            See:{' '}
            <a href={coursePart.backgroundMaterial} target="_blank" rel="noreferrer">
              {coursePart.backgroundMaterial}
            </a>
          </p>
        </div>
      );
    case 'special':
      return (
        <div className="part">
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>{coursePart.description}</p>
          <p>Required skills: {coursePart.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <h2>
      <strong>Total exercises:</strong>{' '}
      {courseParts.map((part) => part.exerciseCount).reduce((a, b) => a + b, 0)}
    </h2>
  );
};
