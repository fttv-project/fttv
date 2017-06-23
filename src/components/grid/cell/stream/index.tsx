import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Interpolate, translate } from "react-i18next";

import { Stream } from "common/twitch-api/streams";
import { GridCellProps } from "..";
import style from "./index.scss";

@translate("streams")
export default class GameCell extends React.PureComponent<GridCellProps<Stream>, {}> {
	render() {
		const { item } = this.props;

		return (
			<div className={style.stream}>
				<figure className={style.box}>
					<img className={style.boxImage} src={item.preview.large} />
				</figure>
				<div className={style.body}>
					<h3 className={classnames(style.title, "ellipsis")}>
						{item.channel.status}
					</h3>
					<p className={classnames(style.viewers, "ellipsis")}>
						<Interpolate i18nKey="card.viewers" value={item.viewers.toLocaleString()} channel={this.renderChannelLink()} />
					</p>
				</div>
			</div>
		);
	}

	renderChannelLink = () => {
		const { item } = this.props;
		return (
			<Link to={`/${item.channel.name.toLowerCase()}`} className={style.streamer}>
				{item.channel.display_name}
			</Link>
		);
	}
}
