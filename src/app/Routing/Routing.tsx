import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TodolistsList } from 'features/todolists-lists/TodolistsList';
import { Login } from 'features/auth/Login/Login';

export const Routing = () => {
  return (
    <Routes>
      <Route path={'/'} element={<TodolistsList />} />
      <Route path={'/login'} element={<Login />} />
    </Routes>
  );
};
