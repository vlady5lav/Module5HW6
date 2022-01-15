import React, { ReactElement } from 'react';

interface Props {
  resultMessage?: string | null;
}

const AuthMessage = (props: Props): ReactElement => {
  return (
    <p className="mt-3 mb-3" style={{ color: 'green', fontSize: 14, fontWeight: 700 }}>
      {props.resultMessage ?? null}
    </p>
  );
};

export default AuthMessage;
