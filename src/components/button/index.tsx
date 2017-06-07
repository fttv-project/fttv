import React from "react";

import style from "./style.scss";

const onMouseDown = (e: React.MouseEvent<any>) => {
	e.preventDefault();
};

export default (props: any) => (
	<button tabIndex={0} className={style.button} onMouseDown={onMouseDown}>
		{props.children}
	</button>
);
