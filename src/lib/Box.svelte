<script>
	import './app.css';

	import { key } from './util';
	import { getContext } from 'svelte';

	export let action;
	export let id;
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

<div bind:this={box} class="w" style="left: {left}em; top: {top}em;">
	<slot>No Name</slot>
	<div bind:this={ep} class="ep" {action} />
</div>
