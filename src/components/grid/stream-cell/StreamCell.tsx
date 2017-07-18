import classnames from "classnames";
import React from "react";
import { Interpolate, translate } from "react-i18next";
import { Link } from "react-router-dom";

import { Stream } from "common/twitch-api/streams";
import { GridCellProps } from "..";
import style from "./StreamCell.scss";

@translate("streams")
export class StreamCell extends React.PureComponent<GridCellProps<Stream>> {
	render() {
		const { item } = this.props;

		return (
			<div className={style.stream}>
				<Link to={`/${item.channel.name}`} tabIndex={-1}>
					<figure className={style.box}>
						<img className={style.boxImage} src={item.preview.large} />
					</figure>
				</Link>
				<div className={style.body}>
					<h3 className={classnames(style.title, "ellipsis")}>
						<Link className={style.title} to={`/${item.channel.name}`}>
							{item.channel.status}
						</Link>
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
			<Link to={`/${item.channel.name}`} className={style.streamer}>
				{item.channel.display_name}
			</Link>
		);
	}
}
