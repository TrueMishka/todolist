import React, { ChangeEvent, FC, memo } from 'react';
import { Box, Checkbox, IconButton } from '@mui/material';
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan';
import { Delete } from '@mui/icons-material';
import { TaskStatuses } from 'common/enums';
import { TaskType } from '../../../../tasks/tasks.api';
import { useActions } from '../../../../../../common/hooks/useActions';
import { tasksThunks } from '../../../../tasks/tasks.reducer';
import s from './styles.module.css';

type PropsType = {
  task: TaskType;
  todolistId: string;
};

export const Task: FC<PropsType> = memo(({ task, todolistId }) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => removeTask({ taskId: task.id, todolistId });

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({ taskId: task.id, domainModel: { status }, todolistId });
  };

  const changeTitleHandler = (title: string) => {
    updateTask({ taskId: task.id, domainModel: { title }, todolistId });
  };

  return (
    <Box key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ''}>
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        color='primary'
        onChange={changeStatusHandler}
      />
      <EditableSpan value={task.title} onChange={changeTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </Box>
  );
});
