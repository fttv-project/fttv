import React from "react";

import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Action, Dispatch, bindActionCreators } from "redux";

import { State } from "data";
import { loadGame } from "data/streams";

import { returnOf } from "common/util";

import InfiniteScroll from "components/infinite-scroll";
import Grid from "components/grid";
import StreamCell from "components/grid/cell/stream";

import style from "./index.scss";

@translate("streams")
class Streams extends React.Component<Props & InjectedTranslateProps, OwnState> {
	constructor(props: Props) {
		super(props);
		this.state = { scrollElement: null! };
	}

	componentWillMount() {
		const { gameTitle } = this.props.match.params;
		const game = this.game;
		if (!game || game.value.streams.length <= 0) this.props.loadGame(gameTitle, 60);
	}

	render() {
		const game = this.game;
		return game ? (
			<div ref={this.setScrollingElement} className={style.streamsContainer}>
				<InfiniteScroll
					items={game.value.streams}
					loadItems={this.loadGames}
					threshold={600}
					scrollElement={this.state.scrollElement}
					isLoading={!game || game.isLoading}
				>
					{({ items, registerChild }) => (
						<Grid
							gridClass={style.gameGrid}
							items={items}
							targetColumnWidth="28rem"
							registerLoader={registerChild}
							cell={StreamCell}
						/>
					)}
				</InfiniteScroll>
			</div>
		) : null;

	}

	private loadGames = ({ elementsHint }: { elementsHint: number }) => {
		const isLoading = !this.game || this.game.isLoading;
		const { gameTitle } = this.props.match.params;
		const { loadGame } = this.props;

		const elements = elementsHint || 40;
		if (!isLoading) {
			loadGame(gameTitle, Math.min(elements, 100));
		}
	}

	private setScrollingElement = (scrollElement: HTMLElement | null) => {
		this.setState({ ...this.state, scrollElement: scrollElement! });
	}

	private get game() {
		if (!this.props || !this.props.games) {
			return undefined;
		}
		return this.props.games.get(this.props.match.params.gameTitle);
	}
}

const mapStateToProps = (state: State) => ({
	games: state.streams.games
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
	loadGame
}, dispatch);

interface RouteParams {
	gameTitle: string;
}

type Props = typeof StateProps & typeof DispatchProps & RouteComponentProps<RouteParams>;
const StateProps = returnOf(mapStateToProps);
const DispatchProps = returnOf(mapDispatchToProps);

interface OwnState {
	scrollElement: HTMLElement;
}

export default connect<typeof StateProps, typeof DispatchProps, RouteComponentProps<{}>>(
	mapStateToProps,
	mapDispatchToProps
)(Streams);
