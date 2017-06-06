import React from "react";

import logo from "assets/logo-icon.svg";
import style from "./style.scss";

export default () => (
	<footer className={style.footer}>
		<img src={logo} />

		<ul className={style.links}>
			<li><a href="/">About</a></li>
			<li><a href="/">Blog</a></li>
		</ul>
	</footer>
);
