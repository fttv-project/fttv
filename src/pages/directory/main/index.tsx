import React from "react";

import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Action, Dispatch, bindActionCreators } from "redux";

import { State } from "data";
import { loadNext } from "data/games";

import { returnOf } from "common/util";

import Tabs, { Tab } from "components/tabs";
import InfiniteGrid from "components/infinite-grid";
import GameCell from "components/grid/cell/game";

import style from "./index.scss";

@translate("directory")
class Directory extends React.Component<Props & InjectedTranslateProps, OwnState> {
	constructor(props: Props) {
		super(props);
		this.state = { scrollElement: null! };
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
		const { topGames, isLoading, loadNext } = this.props;
		return (
			<InfiniteGrid
				items={topGames.top}
				cell={GameCell}
				gridClass={style.gameGrid}
				loadItems={loadNext}
				apiLimit={100}
				apiLoadChunk={40}
				initialChunk={60}
				columnWidth="18em"
				scrollElement={this.state.scrollElement}
				scrollThreshold={600}
				isLoading={isLoading}
			/>
		);
	}

	private setScrollingElement = (scrollElement: HTMLElement | null) => {
		this.setState({ ...this.state, scrollElement: scrollElement! });
	}
}

const mapStateToProps = (state: State) => ({
	topGames: state.games.topGames,
	isLoading: state.games.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
	loadNext
}, dispatch);

type Props = typeof StateProps & typeof DispatchProps & RouteComponentProps<{}>;
const StateProps = returnOf(mapStateToProps);
const DispatchProps = returnOf(mapDispatchToProps);

interface OwnState {
	scrollElement: HTMLElement;
}

export default connect<typeof StateProps, typeof DispatchProps, RouteComponentProps<{}>>(
	mapStateToProps,
	mapDispatchToProps
)(Directory);
