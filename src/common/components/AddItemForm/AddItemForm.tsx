import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import { RejectValueType } from 'common/utils/create-app-async-thunk';

type PropsType = {
  addItem: (title: string) => Promise<any>;
  disabled?: boolean;
};

export const AddItemForm: FC<PropsType> = memo(({ addItem, disabled = false }) => {
  let [title, setTitle] = useState('');
  let [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title)
        .then(() => {
          setTitle('');
        })
        .catch((err: RejectValueType) => {
          if (err.data) {
            const messages = err.data.messages;
            setError(messages.length ? messages[0] : 'Some error occurred');
          }
        });
    } else {
      setError('Title is required');
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItemHandler();
    }
  };

  // TODO
  // Add dot text

  return (
    <Box>
      <TextField
        variant='outlined'
        size={'small'}
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label='Title'
        helperText={error}
      />
      <IconButton color='primary' onClick={addItemHandler} disabled={disabled}>
        <AddBox />
      </IconButton>
    </Box>
  );
});
