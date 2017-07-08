import React from "react";

import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Action, Dispatch, bindActionCreators } from "redux";

import { State } from "data";
import { loadTopGames } from "data/categories";

import { returnOf } from "common/util";

import { GameCell } from "components/grid";
import { InfiniteGrid } from "components/infinite-grid";
import { Tab, Tabs } from "components/tabs";

import style from "./Main.scss";

@translate("directory")
class Main extends React.Component<Props & InjectedTranslateProps, OwnState> {
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
		const { topGames, loadTopGames } = this.props;
		return (
			<InfiniteGrid
				items={topGames.value.top}
				cell={GameCell}
				gridClass={style.gameGrid}
				loadItems={loadTopGames}
				apiLimit={100}
				apiLoadChunk={40}
				initialChunk={60}
				columnWidth="18em"
				scrollElement={this.state.scrollElement}
				scrollThreshold={600}
				isLoading={topGames.isLoading}
			/>
		);
	}

	private setScrollingElement = (scrollElement: HTMLElement | null) => {
		this.setState({ ...this.state, scrollElement: scrollElement! });
	}
}

const mapStateToProps = (state: State) => ({
	topGames: state.categories.topGames
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
	loadTopGames
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
)(Main);
