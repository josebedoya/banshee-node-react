import React from 'react';
import { Form, Input, InputNumber, Spin, Icon } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const getFieldType = (input, size, min, max, placeholder, readonly, autoComplete) => ({
	textarea: <TextArea {...input} rows={5} />,
	text: <Input {...input} 
					size={!size ? "large" : size}
					placeholder={placeholder && placeholder }
					readOnly={readonly && readonly}
					autoComplete={!autoComplete ? "off" : autoComplete}
				/>,
	password: <Input {...input}
							type="password"
							size={!size ? "large" : size}
							placeholder={placeholder && placeholder }
						/>,
	number: <InputNumber {...input} 
						size={!size ? "large" : size}
						min={min && min}
						max={max && max}
						autoComplete={!autoComplete ? "off" : autoComplete}
					/>,
	tel: <InputNumber {...input} 
						size={!size ? "large" : size}
						placeholder={placeholder && placeholder }
						autoComplete={!autoComplete ? "off" : autoComplete}
					/>,
	hidden: <Input {...input}
						type="hidden"
					/>
});

const InputField = ( {input, meta, type, label, name, placeholder, readonly, autoComplete, size, min, max, help, loading} ) => {
	const errorField = meta.touched && meta.error;
	const dirty = meta.dirty || placeholder || input.value;
	const isHidden = type === 'hidden';
	return (
		<div className={isHidden ? 'form-field-wrapper hidden' : 'form-field-wrapper'}>
			<FormItem  validateStatus={errorField ? 'error' : ''} help={help} className={dirty ? 'form-field active' : 'form-field'}>
				{getFieldType(input, size, min, max, placeholder, readonly, autoComplete)[type]}
				<label htmlFor={name}>{label}</label>
				{loading && <Spin indicator={antIcon} />}
			</FormItem>
			{ errorField && <span className="error-text">{meta.error}</span> }
		</div>
	);
};

export default InputField;