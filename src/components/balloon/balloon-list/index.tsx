import React from "react";

import style from "./style.scss";

export default ({ children }: { children: React.ReactNode }) => (
	<ul className={style.list}>
		{React.Children.map(children, child => (
			<li className={style.item}>{child}</li>
		))}
	</ul>
);
