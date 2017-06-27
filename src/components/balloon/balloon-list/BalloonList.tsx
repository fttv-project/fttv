import React from "react";

import style from "./BalloonList.scss";

export const BalloonList = (props: BalloonListProps) => (
	<ul className={style.list} {...props}>
		{React.Children.map(props.children, child => (
			<li className={style.item}>{child}</li>
		))}
	</ul>
);

export interface BalloonListProps extends React.DOMAttributes<HTMLUListElement> {}
