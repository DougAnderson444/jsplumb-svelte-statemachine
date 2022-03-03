<script>
	import { onMount } from 'svelte';
	import { uuid } from '@jsplumb/util';

	import { key } from './util';
	import { getContext } from 'svelte';

	export let box = null;
	export let node;

	// @ts-ignore
	export let width = node?.width || 400;
	// @ts-ignore
	export let height = node?.height || 400;
	// @ts-ignore
	export let left = node?.left || 0;
	// @ts-ignore
	export let top = node?.top || 0;

	let newSize = { width, height };
	let initSize = { width: 0, height: 0 };
	let resizeInitPos = { x: 0, y: 0 };

	let active = false; // resize active or not

	let pageX, pageY;
	let pX;
	let pY;

	let endpoint;
	let instance;

	let addToGroup;

	let groupID = uuid();

	const context = getContext(key);

	// $: if (instance && box) instance.manage(box);

	onMount(() => {
		instance = context.getInstance();

		instance.manage(box);
		instance.addGroup({
			el: box,
			id: groupID,
			orphan: true,
			dragOptions: {
				filter: '.svlt-grid-resizer'
			},
			filter: '.svlt-grid-resizer'
		});

		addToGroup = (nodeElement) => {
			instance.addToGroup(groupID, nodeElement);
		};
	});

	const resizePointerDown = (e) => {
		e.stopPropagation();
		const { pageX, pageY } = e;

		resizeInitPos = { x: pageX, y: pageY };
		initSize = { width, height };
		newSize = { width, height };

		active = true;

		window.addEventListener('pointermove', resizePointerMove);
		window.addEventListener('pointerup', resizePointerUp);
	};

	const resizePointerMove = ({ pageX, pageY }) => {
		newSize.width = initSize.width + pageX - resizeInitPos.x;
		newSize.height = initSize.height + pageY - resizeInitPos.y;

		console.log({ pageX, pageY });
		// ({ pX, pY } = { pageX, pageY });
	};

	const resizePointerUp = (e) => {
		e.stopPropagation();

		width = newSize.width;
		height = newSize.height;

		active = false;

		window.removeEventListener('pointermove', resizePointerMove);
		window.removeEventListener('pointerup', resizePointerUp);
	};
</script>

<div
	bind:this={box}
	class="w"
	style="left: {left}px; top: {top}px; width: {active ? newSize.width : width}px; height:{active
		? newSize.height
		: height}px;"
>
	{#if addToGroup}
		<slot {addToGroup}>No Group Name</slot>
	{/if}
	<div class="svlt-grid-resizer" on:pointerdown={resizePointerDown} />
</div>

<style>
	.w {
		padding: 16px;
		position: absolute;
		z-index: 4;
		border: 1px dashed grey;
		box-shadow: 2px 2px 19px #e0e0e0;
		-o-box-shadow: 2px 2px 19px #e0e0e0;
		-webkit-box-shadow: 2px 2px 19px #e0e0e0;
		-moz-box-shadow: 2px 2px 19px #e0e0e0;
		-moz-border-radius: 8px;
		border-radius: 8px;
		opacity: 0.8;
		cursor: move;
		background-color: rgba(00, 100, 100, 0.025);
		font-size: 11px;
		-webkit-transition: background-color 0.25s ease-in;
		-moz-transition: background-color 0.25s ease-in;
		transition: background-color 0.25s ease-in;
	}

	.w:hover {
		background-color: #c5cbcf23;
		/* color: rgba(26, 26, 26, 0.493); */
	}

	.svlt-grid-resizer {
		user-select: none;
		width: 20px;
		height: 20px;
		position: absolute;
		right: 0;
		bottom: 0;
		cursor: se-resize;
	}
	.svlt-grid-resizer::after {
		content: '';
		position: absolute;
		right: 5px;
		bottom: 5px;
		width: 10px;
		height: 10px;
		border-right: 2px solid rgba(0, 0, 0, 0.4);
		border-bottom: 2px solid rgba(0, 0, 0, 0.4);
	}
</style>
