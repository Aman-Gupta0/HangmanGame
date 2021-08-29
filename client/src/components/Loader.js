import React from 'react';

const styles = {
  loader: {
    fontSize: 80,
    display: 'flex',
    width: '90vw',
    height: '90vh',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const Loader = ({ id }) => {
  return (
    <div style={styles.loader} data-testid={id}>
      Loading...
    </div>
  );
};

export default Loader;
