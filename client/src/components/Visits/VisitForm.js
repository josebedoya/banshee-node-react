import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, Modal } from 'antd';
import { setPropsAsInitial } from '../hocs/setPropsAsInitial';
import * as validator from './../../lib/validators';

import InputField from './../common/InputField';
import SelectField from './../common/SelectField';

const confirm = Modal.confirm;

class VisitForm extends Component {
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
      agents,
      isEdit,
      available_credit,
      isUpdating
    } = this.props;
    return (
      <Fragment>
        <Form layout='vertical' onSubmit={handleSubmit}>
          <div className='general-box'>
            <h3 style={{ marginTop: 0 }}>
              {isEdit ? 'Edit visit' : 'New visit'}
            </h3>
            <h5>Available credit: {available_credit}</h5>
            <div className='form-fields-wrapper'>
              <Field
                name='agentId'
                component={SelectField}
                label='Sales Representative'
                placeholder='Sales Representative'
                items={agents}
                validate={validator.isRequired}
              />
              <Field
                name='net'
                component={InputField}
                type='number'
                label='Net price'
                max={available_credit}
                validate={validator.isRequired}
              />
            </div>
            <div className='form-fields-wrapper'>
              <Field
                name='description'
                component={InputField}
                type='textarea'
                label='Description'
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

VisitForm = reduxForm({
  form: 'VisitForm',
  enableReinitialize: true
})(VisitForm);

export default setPropsAsInitial(VisitForm);
