import React from "react";

import style from "./style.scss";

const onMouseDown = (e: React.MouseEvent<any>) => {
	e.preventDefault();
};

export default (props: Props & React.HTMLProps<HTMLButtonElement>) => (
	<button tabIndex={0} className={style.button} onMouseDown={onMouseDown} {...props}>
		{props.children}
	</button>
);

interface Props {

}
