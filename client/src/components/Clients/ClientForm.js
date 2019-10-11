import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, Modal } from 'antd';
import { setPropsAsInitial } from '../hocs/setPropsAsInitial';
import * as validator from './../../lib/validators';

import InputField from './../common/InputField';

const confirm = Modal.confirm;

class ClientForm extends Component {
  showConfirm = () => {
    const { onBack } = this.props;
    confirm({
      title: 'Do you want to cancel?',
      content: 'The data will be lost if you press ok',
      onOk() {
        onBack();
      },
      onCancel() {}
    });
  };

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      submitSucceeded,
      onBack,
      isEdit,
      isUpdating
    } = this.props;
    return (
      <Fragment>
        <Form layout='vertical' onSubmit={handleSubmit}>
          <div className='general-box'>
            <h3 style={{ marginTop: 0 }}>
              {isEdit ? 'Edit client' : 'New client'}
            </h3>
            <div className='form-fields-wrapper'>
              <Field
                name='nit'
                component={InputField}
                type='text'
                label='NIT'
                validate={validator.isRequired}
              />
              <Field
                name='fullname'
                component={InputField}
                type='text'
                label='Name'
                validate={validator.isRequired}
              />
            </div>
            <div className='form-fields-wrapper'>
              <Field
                name='address'
                component={InputField}
                type='text'
                label='Address'
              />
              <Field
                name='phone'
                component={InputField}
                type='text'
                label='Phone'
              />
            </div>
            <div className='form-fields-wrapper'>
              <Field
                name='credit_limit'
                component={InputField}
                type='text'
                label='Credit Limit'
                normalize={validator.onlyNumbers}
                validate={validator.isRequired}
              />
              <Field
                name='visits_percentage'
                component={InputField}
                type='number'
                label='Visits Percentage'
                min={0}
                max={100}
                validate={validator.isRequired}
              />
            </div>
          </div>

          <div className='general-box'>
            <div className='controls'>
              <Button
                type='primary'
                htmlType='button'
                disabled={submitting}
                onClick={
                  !pristine && !submitSucceeded ? this.showConfirm : onBack
                }
              >
                Cancel
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                disabled={pristine || submitting}
                loading={isUpdating}
              >
                Save
              </Button>
            </div>
          </div>
        </Form>
      </Fragment>
    );
  }
}

ClientForm = reduxForm({
  form: 'ClientForm',
  enableReinitialize: true
})(ClientForm);

export default setPropsAsInitial(ClientForm);
