import {MouseEventHandler} from 'react';

export interface ButtonProps {
	type: 'primary' | 'default';
	tooltip?: string;
	icon?: string;
	click?: MouseEventHandler<HTMLButtonElement>;
}
