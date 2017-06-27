import React from "react";
import classnames from "classnames";

import style from "./Button.scss";

const onMouseDown = (e: React.MouseEvent<any>) => e.preventDefault();

export const Button = (props: ButtonProps) => {
	const { link, noFocus, transparent, ...optionalProps } = props;
	optionalProps.className = classnames(style.button, props.className || "", {
		[style.noFocus]: noFocus,
		[style.transparent]: transparent
	});
	optionalProps.tabIndex = 0;
	if (noFocus) optionalProps.onMouseDown = onMouseDown;

	return link ? (
		<a {...optionalProps} href={link}>{props.children}</a>
	) : (
		<button {...optionalProps}>{props.children}</button>
	);
};

export interface ButtonProps extends React.HTMLProps<HTMLAnchorElement | HTMLButtonElement> {
	link?: string;
	noFocus?: boolean;
	transparent?: boolean;
}
