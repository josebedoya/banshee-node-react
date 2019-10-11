import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const SelectField = ( {items, selected, input, label, name, placeholder, meta, help} ) => {
	const errorField = meta.touched && meta.error;
	const dirty = meta.dirty || placeholder || input.value;
	return (
		<div className="form-field-wrapper">
			<FormItem label={label} validateStatus={errorField ? 'error' : ''} help={help} className={dirty ? 'form-field select active' : 'form-field select'}>
				<Select {...input}
					defaultValue={selected && selected}
					size="large"
					autoComplete="off"
					placeholder={placeholder && placeholder}
				>
					{
						items.map(item =>
							<Option key={`${item.key}`} value={`${item.key}`}>{`${item.value}`}</Option>
						)
					}
				</Select>
				<label htmlFor={name}>{label}</label>
			</FormItem>
			{ errorField && <span className="error-text">{meta.error}</span> }
		</div>
	)
}

export default SelectField;