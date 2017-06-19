import React from "react";
import classnames from "classnames";
import { Interpolate, translate } from "react-i18next";

import { TopGame } from "common/twitch-api/games";
import { GridCellProps } from "..";
import style from "./index.scss";

@translate("games")
export default class GameCell extends React.PureComponent<GridCellProps<TopGame>, {}> {
	render() {
		const { item } = this.props;

		return (
			<a className={style.cell}>
				<figure className={style.box}>
					<img className={style.boxImage} src={item.game.box.large} />
				</figure>
				<div className={style.body}>
					<h3 className={classnames(style.title, "ellipsis")}>
						{item.game.name}
					</h3>
					<p className={classnames(style.viewers, "ellipsis")}>
						<Interpolate i18nKey="card.viewers" value={item.viewers.toLocaleString()} />
					</p>
				</div>
			</a>
		);
	}
}
