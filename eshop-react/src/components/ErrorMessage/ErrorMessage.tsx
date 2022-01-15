import React, { ReactElement } from 'react';

interface Props {
  error?: string | null;
}

const ErrorMessage = (props: Props): ReactElement => {
  return (
    <p className="mt-3 mb-3" style={{ color: 'red', fontSize: 14, fontWeight: 700 }}>
      {props.error ?? null}
    </p>
  );
};

export default ErrorMessage;
