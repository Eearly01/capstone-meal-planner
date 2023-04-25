import React, { useState } from 'react';
import { InputProps } from '@/types/propTypes'; 
import {
	Container,
	HidePassIcon,
	Input,
	ShowPassIcon,
	ErrorText,
} from './InputFieldElements';

const InputFeild = ({
	placeholder,
	icon,
	type,
	required,
	value,
	onChange,
	name,
	error,
}: InputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordIcon = () => {
		setShowPassword(!showPassword);
	};

	const renderPasswordIcon = () => {
		if (showPassword) {
			return <HidePassIcon onClick={togglePasswordIcon} />;
		} else {
			return <ShowPassIcon onClick={togglePasswordIcon} />;
		}
	};

	const inputType = type === 'password' && showPassword ? 'text' : type;

	return (
		<Container>
				{icon}

				<Input
					placeholder={placeholder}
					type={inputType}
					required={required}
					value={value}
					onChange={onChange}
					name={name}
				/>

				{type === 'password' && renderPasswordIcon()}

			{error && <ErrorText>{error}</ErrorText>}
		</Container>
	);
};

export default InputFeild;
