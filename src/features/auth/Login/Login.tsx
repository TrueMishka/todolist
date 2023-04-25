import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import { authThunk } from '../auth.reducer';
import { LoginParamsType } from '../auth.api';
import { ResponseType } from 'common/types';
import { useActions } from 'common/hooks';

export const Login = () => {
  const { login } = useActions(authThunk);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const initialValues: LoginParamsType = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const SignupSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const formOnSubmit = (values: LoginParamsType, formikHelpers: FormikHelpers<LoginParamsType>) => {
    login(values)
      .unwrap()
      .catch((reason: ResponseType) => {
        const { fieldsErrors } = reason;
        if (fieldsErrors) {
          reason.fieldsErrors.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        }
      });
  };

  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  return (
    <Grid container justifyContent='center' paddingTop={'20px'}>
      <FormControl>
        <FormLabel focused={false}>
          <Typography variant='h3' component='div' sx={{ fontSize: '24px', fontWeight: 'bold' }}>
            Login
          </Typography>
        </FormLabel>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={formOnSubmit}
        >
          {({ errors, touched, getFieldProps, values, setFieldError }) => (
            <Form>
              <FormGroup>
                <TextField label='Email' margin='normal' {...getFieldProps('email')} />
                {errors.email && touched.email ? <div>{errors.email}</div> : null}
                <TextField
                  type='password'
                  label='Password'
                  margin='normal'
                  {...getFieldProps('password')}
                />
                {errors.password && touched.password ? <div>{errors.password}</div> : null}
                <FormControlLabel
                  label={'Remember me'}
                  control={
                    <Checkbox
                      id={'rememberMe'}
                      {...getFieldProps('rememberMe')}
                      checked={values.rememberMe}
                    />
                  }
                />
                <Button type={'submit'} variant={'contained'} color={'primary'}>
                  Login
                </Button>
              </FormGroup>
              <FormHelperText component='div'>
                <p>
                  To log in get registered{' '}
                  <Link href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                    here
                  </Link>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
              </FormHelperText>
            </Form>
          )}
        </Formik>
      </FormControl>
    </Grid>
  );
};
