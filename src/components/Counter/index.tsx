import React, {ErrorInfo} from 'react';
import {Button} from '../Button';
import {CounterProps, CounterState} from './interface';

import plusIcon from '/src/icons/plus.svg';
import minusIcon from '/src/icons/minus.svg';
import {ErrorComponent} from '../Error';

export class Counter extends React.Component<CounterProps, CounterState> {
	constructor(props: CounterProps) {
		super(props);
		this.state = {
			count: 0,
			hasError: false,
		};
	}

	handleAdd(addCount = 1) {
		this.setState(({count}) => ({count: count + addCount}));
		// Another way
		// this.setState({count: this.state.count + count});
	}

	addFromKeyboard = (event: KeyboardEvent) => {
		const keyActions = {
			'+': () => this.handleAdd(),
			'-': () => this.handleAdd(-1),
		};
		const key = event.key as '+' | '-';
		keyActions[key]?.();
	};

	//* Called once when component is created
	// Usually used to fetch data
	async componentDidMount() {
		try {
			const [count] = await fetch(
				'http://www.randomnumberapi.com/api/v1.0/random?min=0&max=99&count=1',
			).then((response) => response.json());
			this.setState({count});
		} catch (error) {
			console.log(error);
			this.setState({count: 99});
		}

		document.addEventListener('keypress', this.addFromKeyboard);
	}

	componentDidUpdate() {
		console.log('did update');
	}

	// Called before component update
	// Receives previous Props and State
	getSnapshotBeforeUpdate(prevProps: CounterProps, prevState: CounterState) {
		console.log('before update');
		return null;
	}

	// Called once when component is removed from html
	// Usually used to remove events or intervals that will continually
	// be called even after component is destroyed
	//* Dont let hanging events, it will cause memory leaks
	componentWillUnmount() {
		document.removeEventListener('keypress', this.addFromKeyboard);
	}

	// Called when state is updated, can override new state on return
	static getDerivedStateFromProps(props: CounterProps, state: CounterState) {
		return state.count < 0 ? {count: 0} : null;
	}

	// Called when state or props change
	// Can decide if html will re-render or not
	//* Can be used to prevent bad performance caused by multiple unecessary rendering
	// In our case, when state is set from 0 to 0, it renders html again, we can prevent that
	shouldComponentUpdate({name}: CounterProps, {count}: CounterState) {
		const currentName = this.props.name;
		const currentCount = this.state.count;
		return currentName !== name || count !== currentCount;
	}

	// Called when an error is thrown, even in child components
	// Returns state
	// IN our case, we are setting an hasError state to true
	// So the errorComponent that is causing the error is not rendered if hasError
	// Else it would keep trying to rerender the errorComponent
	//* Static method, so we cant use current state
	//** Render will be called after */
	static getDerivedStateFromError(error: Error) {
		return {
			hasError: true,
			count: 0,
		};
	}


	// Called After getDerivedStateFromError and render
	//* Can be used to do side effects
	// We can use the info to precisely show an error toast or something like that
	// Can return state
	componentDidCatch(error: Error, info: ErrorInfo) {
		return null;
	}

	render() {
		const {name} = this.props;
		const {count, hasError} = this.state;
		return (
			<div>
				<h1> Counter </h1>
				<h2> Count: {name} </h2>
				<h3> Current: {count} </h3>
				<Button
					type='primary'
					click={() => this.handleAdd()}
					icon={plusIcon}
					tooltip='Increment'
				/>
				<Button
					type='default'
					click={() => this.handleAdd(-1)}
					icon={minusIcon}
					tooltip='Decrement'
				/>
				{!hasError && <ErrorComponent />}
			</div>
		);
	}
}
