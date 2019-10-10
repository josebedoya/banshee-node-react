import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button } from 'antd';
import InputField from '../common/InputField';
import { setPropsAsInitial } from '../hocs/setPropsAsInitial';
import * as validator from './../../lib/validators';

import bansheeLogo from './../../assets/images/banshee-logo.svg';

class LoginForm extends Component {
  render() {
    const {
      handleSubmit,
      submitting,
      pristine,
      isLoginRequesting
    } = this.props;
    return (
      <div className='auth-box'>
        <img className='logo' src={bansheeLogo} alt='Banshee' />
        <h1>Login</h1>
        <Form layout='vertical' onSubmit={handleSubmit}>
          <div className='form-fields-wrapper'>
            <Field
              name='email'
              component={InputField}
              type='text'
              label='Email'
              validate={[validator.isRequired, validator.email]}
              autoComplete='on'
            />
          </div>
          <div className='form-fields-wrapper'>
            <Field
              name='password'
              component={InputField}
              type='password'
              label='Password'
              validate={validator.isRequired}
            />
          </div>
          <div className='controls'>
            <Button
              type='primary'
              htmlType='submit'
              disabled={pristine || submitting}
              loading={isLoginRequesting}
            >
              Go
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const LoginReduxForm = reduxForm({ form: 'Login' })(LoginForm);

export default setPropsAsInitial(LoginReduxForm);
