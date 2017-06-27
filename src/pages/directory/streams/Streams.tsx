import React from "react";

import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Action, Dispatch, bindActionCreators } from "redux";

import { State } from "data";
import { loadGame } from "data/streams";

import { returnOf } from "common/util";

import { InfiniteGrid } from "components/infinite-grid";
import { StreamCell } from "components/grid";

import style from "./Streams.scss";

@translate("streams")
class Streams extends React.Component<Props & InjectedTranslateProps, OwnState> {
	constructor(props: Props) {
		super(props);
		this.state = { scrollElement: null! };
	}

	render() {
		const game = this.game;
		return (
			<div ref={this.setScrollingElement} className={style.streamsContainer}>
				<InfiniteGrid
					items={(game && game.value.streams) || null}
					cell={StreamCell}
					gridClass={style.streamGrid}
					columnWidth="28rem"
					loadItems={this.loadStreams}
					apiLimit={100}
					apiLoadChunk={40}
					initialChunk={60}
					scrollElement={this.state.scrollElement}
					scrollThreshold={600}
					isLoading={!game || game.isLoading}
				/>
			</div>
		);

	}

	private loadStreams = (elements: number) => {
		const { gameTitle } = this.props.match.params;
		const { loadGame } = this.props;
		loadGame(gameTitle, elements);
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
