import React from "react";

import style from "./style.scss";

export default ({ children }: React.Props<HTMLUListElement>) => (
	<ul className={style.list}>
		{React.Children.map(children, child => (
			<li className={style.item}>{child}</li>
		))}
	</ul>
);
