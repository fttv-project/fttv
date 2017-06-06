import React from "react";
import Helmet from "react-helmet";
import {connect} from "react-redux";
import {InjectedTranslateProps, translate} from "react-i18next";
import {Action, Dispatch} from "redux";

import {State} from "data";
import {Theme, ThemeName, loadTheme} from "data/config";
import {decrease, decreaseAsync, increase, increaseAsync, set} from "data/counter";

import style from "./style.scss";

@translate("counter")
class Counter extends React.Component<Props, OwnState> {
	state = {
		async: false
	};

	onAsyncChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			async: e.target.checked
		});
	}

	onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.valueAsNumber;
		this.props.set(Number.isFinite(value) ? value : this.props.value);
	}

	getNewTheme = (): ThemeName => {
		const { theme } = this.props;
		return theme.name === "light" ? "dark" : "light";
	}

	render() {
		const t = this.props.t!;
		const increaseFunc = this.state.async ? this.props.increaseAsync : this.props.increase;
		const decreaseFunc = this.state.async ? this.props.increaseAsync : this.props.increase;
		const { loadTheme } = this.props;

		return (
			<section className={style.container}>
				<Helmet title={t("title")} />

				<h2>{this.props.value}</h2>

				<div>
					<span>Async </span>
					<input
						type="checkbox"
						checked={this.state.async}
						onChange={this.onAsyncChange}
					/>
				</div>

				<div className={style.controls}>
					<button onClick={decreaseFunc.bind(null, 1)}>-</button>
					<input
						type="number"
						value={this.props.value}
						onChange={this.onNumberChange}
					/>
					<button onClick={increaseFunc.bind(null, 1)}>+</button>
				</div>

				<div className={style.theming}>
					<button onClick={loadTheme.bind(null, this.getNewTheme())}>Change theme</button>
				</div>
			</section>
		);
	}
}

type Props = StateProps & DispatchProps & InjectedTranslateProps;

interface StateProps {
	value: number;
	theme: Theme;
}

interface DispatchProps {
	decrease(value: number): void;
	decreaseAsync(value: number): void;
	increase(value: number): void;
	increaseAsync(value: number): void;
	set(value: number): void;
	loadTheme(newTheme: ThemeName): void;
}

interface OwnState {
	async: boolean;
}

const mapStateToProps = (state: State) => ({
	value: state.counter.value,
	theme: state.config.theme
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
	decrease: value => dispatch(decrease(value)),
	decreaseAsync: value => dispatch(decreaseAsync(value)),
	increase: value => dispatch(increase(value)),
	increaseAsync: value => dispatch(increaseAsync(value)),
	set: value => dispatch(set(value)),
	loadTheme: newTheme => dispatch(loadTheme(newTheme))
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Counter);
