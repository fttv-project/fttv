import React from "react";
import classnames from "classnames";

import style from "./style.scss";

const onMouseDown = (e: React.MouseEvent<any>) => e.preventDefault();

export default (props: Props & React.HTMLProps<HTMLAnchorElement | HTMLButtonElement>) => {
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

interface Props {
	link?: string;
	noFocus?: boolean;
	transparent?: boolean;
}
