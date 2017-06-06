import React from "react";
import Helmet from "react-helmet";
import {connect} from "react-redux";
import {InjectedTranslateProps, translate} from "react-i18next";
import {Action, Dispatch} from "redux";
import {State} from "data";
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

	render() {
		const t = this.props.t!;
		const increaseFunc = this.state.async ? this.props.increaseAsync : this.props.increase;
		const decreaseFunc = this.state.async ? this.props.increaseAsync : this.props.increase;

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
			</section>
		);
	}
}

type Props = StateProps & DispatchProps & InjectedTranslateProps;

interface StateProps {
	value: number;
}

interface DispatchProps {
	increase(value: number): void;
	decrease(value: number): void;
	increaseAsync(value: number): void;
	decreaseAsync(value: number): void;
	set(value: number): void;
}

interface OwnState {
	async: boolean;
}

const mapStateToProps = (state: State) => ({
	value: state.counter.value
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	increase: (value: number) => dispatch(increase(value)),
	decrease: (value: number) => dispatch(decrease(value)),
	increaseAsync: (value: number) => dispatch(increaseAsync(value)),
	decreaseAsync: (value: number) => dispatch(decreaseAsync(value)),
	set: (value: number) => dispatch(set(value))
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Counter);
