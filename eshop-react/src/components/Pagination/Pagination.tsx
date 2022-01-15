import { Pagination as MPagination } from '@mui/material';
import React, { ChangeEvent } from 'react';

interface Props {
  total: number;
  active: number;
  onChange: (ev: ChangeEvent<unknown>, page: number) => void;
}

const Pagination = ({ total, active, onChange }: Props) => {
  return (
    <>
      <MPagination count={total} page={active} onChange={onChange} />
    </>
  );
};

export default Pagination;
