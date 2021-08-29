import React from 'react';

const HeadingStyle = {
  display: 'block',
  verticalAlign: 'middle',
  textAlign: 'center',
  fontSize: '42px',
  fontWeight: 700,
  margin: 30
};

const Title = ({ heading, testid, color }) => {
  return (
    <div data-testid={testid} style={{ ...HeadingStyle, color }}>
      {heading}
    </div>
  );
};

export default Title;
