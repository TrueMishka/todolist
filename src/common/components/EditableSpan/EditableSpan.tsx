import React, { ChangeEvent, FC, memo, useState, KeyboardEvent } from 'react';
import { TextField } from '@mui/material';

type PropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan: FC<PropsType> = memo(({ value, onChange }) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(value);
  };
  const activateViewModeOnBlur = () => {
    setEditMode(false);
    onChange(title);
  };
  const activeViewModeOnKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false);
      onChange(title);
    }
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      autoFocus
      size={'small'}
      value={title}
      onChange={changeTitle}
      onBlur={activateViewModeOnBlur}
      onKeyDown={activeViewModeOnKeyPress}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{value}</span>
  );
});
