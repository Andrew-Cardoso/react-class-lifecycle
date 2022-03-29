import {styled} from '@stitches/react';
import React from 'react';
import {ButtonProps} from './interface';
import ReactTooltip from 'react-tooltip';

const StyledButton = styled('button', {
	padding: '4px 12px',
	display: 'inline-grid',
	placeItems: 'center',
	placeContent: 'center',
	borderRadius: '2px',

	variants: {
		type: {
			primary: {
				backgroundColor: '#9999bb',
			},
			default: {
				backgroundColor: '#AAA',
			},
		},
	},
});

export const Button: React.FC<ButtonProps> = ({type, children, click, icon, tooltip}) => {
	return (
		<>
			<StyledButton data-tip={tooltip} type={type} onClick={click}>
				{icon && <img src={icon} alt={icon} />}
				{children}
			</StyledButton>
			<ReactTooltip />
		</>
	);
};
