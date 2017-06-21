import React from "react";

import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { Action, Dispatch, bindActionCreators } from "redux";

import { State } from "data";
import { loadNext } from "data/games";

import { TopGame } from "common/twitch-api/games";
import { returnOf } from "common/util";

import InfiniteScroll from "components/infinite-scroll";
import Tabs, { Tab } from "components/tabs";
import Grid from "components/grid";
import { GridCellProps } from "components/grid/cell";
import GameCell from "components/grid/cell/game";

import style from "./index.scss";

@translate("directory")
class Directory extends React.Component<Props & InjectedTranslateProps, OwnState> {
	constructor(props: Props) {
		super(props);
		this.state = { scrollElement: null! };
	}

	componentWillMount() {
		this.props.loadNext(60);
	}

	render() {
		const t = this.props.t!;
		return (
			<Tabs
				containerRef={this.setScrollingElement}
				className={style.directoryContainer}
			>
				<Tab label={t("tabs.games")} title={t("titles.games")}>
					{this.renderGames()}
				</Tab>

				<Tab label={t("tabs.communities")} title={t("titles.communities")}>
					<div>Communities</div>
				</Tab>

				<Tab label={t("tabs.popular")} title={t("titles.popular")}>
					<div>Popular</div>
				</Tab>

				<Tab label={t("tabs.creative")} title={t("titles.creative")}>
					<div>Creative</div>
				</Tab>

				<Tab label={t("tabs.discover")} title={t("titles.discover")}>
					<div>Discover</div>
				</Tab>
			</Tabs>
		);
	}

	private renderGames() {
		const { topGames, isLoading } = this.props;
		return (
			<InfiniteScroll
				items={topGames.top}
				loadItems={this.loadGames}
				threshold={600}
				scrollElement={this.state.scrollElement}
				isLoading={isLoading}
			>
				{({ items, registerChild }) => (
					<Grid
						gridClass={style.gameGrid}
						items={items}
						targetColumnWidth="18rem"
						registerLoader={registerChild}
						cell={this.renderCell}
					/>
				)}
			</InfiniteScroll>
		);
	}

	private loadGames = ({ elementsHint }: { elementsHint: number }) => {
		const { loadNext, isLoading } = this.props;
		const elements = elementsHint || 40;

		if (!isLoading) {
			loadNext(Math.min(elements, 100));
		}
	}

	private setScrollingElement = (scrollElement: HTMLElement | null) => {
		this.setState({ ...this.state, scrollElement: scrollElement! });
	}

	private renderCell = ({ item, index }: GridCellProps<TopGame>) => {
		return (
			<GameCell item={item} index={index} />
		);
	}
}

const mapStateToProps = (state: State) => ({
	topGames: state.games.topGames,
	isLoading: state.games.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
	loadNext
}, dispatch);

type Props = typeof StateProps & typeof DispatchProps;
const StateProps = returnOf(mapStateToProps);
const DispatchProps = returnOf(mapDispatchToProps);

interface OwnState {
	scrollElement: HTMLElement;
}

export default connect<typeof StateProps, typeof DispatchProps, {}>(
	mapStateToProps,
	mapDispatchToProps
)(Directory);
