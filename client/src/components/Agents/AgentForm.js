import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, Modal } from 'antd';
import { setPropsAsInitial } from '../hocs/setPropsAsInitial';
import * as validator from './../../lib/validators';

import InputField from './../common/InputField';

const confirm = Modal.confirm;

class AgentForm extends Component {
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
              {isEdit ? 'Edit agent' : 'New agent'}
            </h3>
            <div className='form-fields-wrapper'>
              <Field
                name='name'
                component={InputField}
                type='text'
                label='Name'
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

AgentForm = reduxForm({
  form: 'AgentForm',
  enableReinitialize: true
})(AgentForm);

export default setPropsAsInitial(AgentForm);
