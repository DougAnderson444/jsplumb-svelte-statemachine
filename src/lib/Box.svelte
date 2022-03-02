<script>
	import './app.css';

	import { key } from './util';
	import { getContext } from 'svelte';

	export let action;
	export let left;
	export let top;
	export let box = null;

	let ep;

	const context = getContext(key);
	const instance = context.getInstance();

	$: if (box) instance.manage(box);

	instance.addSourceSelector('.ep', {
		edgeType: 'basic',
		extract: {
			action: 'the-action'
		},
		maxConnections: 2,
		onMaxConnections: function (info, e) {
			alert('Maximum connections (' + info.maxConnections + ') reached');
		}
	});
</script>

<div bind:this={box} class="w" style="left: {left}px; top: {top}px;">
	<slot>No Name</slot>
	<div bind:this={ep} class="ep" {action} />
</div>

<style>
	.w {
		padding: 16px;
		position: absolute;
		z-index: 4;
		border: 1px solid #2e6f9a;
		box-shadow: 2px 2px 19px #e0e0e0;
		-o-box-shadow: 2px 2px 19px #e0e0e0;
		-webkit-box-shadow: 2px 2px 19px #e0e0e0;
		-moz-box-shadow: 2px 2px 19px #e0e0e0;
		-moz-border-radius: 8px;
		border-radius: 8px;
		opacity: 0.8;
		cursor: move;
		background-color: white;
		font-size: 11px;
		-webkit-transition: background-color 0.25s ease-in;
		-moz-transition: background-color 0.25s ease-in;
		transition: background-color 0.25s ease-in;
	}

	.w:hover {
		background-color: #5c96bc;
		color: white;
	}

	.ep {
		position: absolute;
		bottom: 37%;
		right: 5px;
		width: 1em;
		height: 1em;
		background-color: orange;
		cursor: pointer;
		box-shadow: 0 0 2px black;
		-webkit-transition: -webkit-box-shadow 0.25s ease-in;
		-moz-transition: -moz-box-shadow 0.25s ease-in;
		transition: box-shadow 0.25s ease-in;
	}

	.ep:hover {
		box-shadow: 0 0 6px black;
	}
</style>
