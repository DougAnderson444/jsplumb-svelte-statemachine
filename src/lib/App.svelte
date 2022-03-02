<script>
	import './app.css';
	import { onMount, setContext } from 'svelte';
	import Box from './Box.svelte';
	import { key } from './util';

	let canvas;
	let instance;
	let opened, begin, phone1, phone2, inperson, rejected;
	let offsetHeight, offsetWidth;

	const getInstance = () => instance;

	setContext(key, {
		getInstance: () => instance
	});

	let boxes;
	$: if (offsetHeight)
		boxes = [
			{
				name: 'opened',
				left: offsetHeight / 6,
				top: offsetHeight / 5,
				action: 'begin',
				title: 'BEGIN'
			},
			{
				name: 'phone1',
				left: offsetHeight / 5,
				top: offsetHeight / 4,
				action: 'begin',
				title: 'PHONE INTERVIEW 1'
			},
			{
				name: 'phone2',
				left: offsetHeight / 4,
				top: offsetHeight / 3,
				action: 'begin',
				title: 'PHONE INTERVIEW 2'
			},
			{
				name: 'inperson',
				left: offsetHeight / 3,
				top: offsetHeight / 2,
				action: 'begin',
				title: 'IN PERSON'
			},
			{
				name: 'rejected',
				left: offsetHeight / 2,
				top: offsetHeight / 4,
				action: 'begin',
				title: 'REJECTED'
			}
		];

	// <Box bind:box={phone1} left={35} top={12} action={'phone1'}>PHONE INTERVIEW 1</Box>
	// <Box bind:box={phone2} left={28} top={24} action={'phone2'}>PHONE INTERVIEW 2</Box>
	// <Box bind:box={inperson} left={12} top={23} action={'inperson'}>IN PERSON</Box>
	// <Box bind:box={rejected} left={10} top={35} action={'rejected'}>REJECTED</Box>

	onMount(async () => {
		const { newInstance } = await import('@jsplumb/browser-ui');
		const { BezierConnector } = await import('@jsplumb/connector-bezier');
		const { uuid } = await import('@jsplumb/util');

		// setup some defaults for jsPlumb.
		instance = newInstance({
			endpoint: { type: 'Dot', options: { radius: 2 } },
			connectionOverlays: [
				{
					type: 'Arrow',
					options: {
						location: 0.8,
						id: 'arrow',
						length: 16,
						foldback: 0.8
					}
				},
				{ type: 'Label', options: { label: 'Connect!', id: 'label', cssClass: 'aLabel' } }
			],
			container: canvas
		});

		instance.registerConnectionType('basic', {
			anchor: 'Continuous',
			connector: 'StateMachine',
			paintStyle: {
				stroke: '#5c96bc',
				strokeWidth: 2,
				outlineStroke: 'transparent',
				outlineWidth: 4
			},
			hoverPaintStyle: { stroke: '#1e8151', strokeWidth: 2 }
		});

		var windows = document.querySelectorAll('.statemachine-demo .w');

		// bind a click listener to each connection; the connection is deleted
		instance.bind('click', function (c) {
			instance.deleteConnection(c);
		});

		// bind a connection listener. note that the parameter passed to this function contains more than
		// just the new connection - see the documentation for a full list of what is included in 'info'.
		// this listener sets the connection's internal
		// id as the label overlay's text.
		instance.bind('connection', function (info) {
			info.connection.getOverlay('label').setLabel(info.connection.id);
		});

		// bind a double click listener to "canvas"; add new node when this occurs.
		instance.on(canvas, 'dblclick', function (e) {
			newNode(e.offsetX, e.offsetY);
		});

		function newNode(x, y) {
			boxes = [...boxes, { name: uuid(), left: x, top: y, action: '', title: uuid() }];
		}

		instance.addTargetSelector('.w', {
			anchor: 'Continuous',
			allowLoopback: true
		});

		// suspend drawing and initialise.
		instance.batch(function () {
			// register all windows with the instance
			instance.manageAll(windows);

			// make a few connections
			instance.connect({
				source: opened,
				target: phone1,
				type: 'basic'
			});
			instance.connect({
				source: phone1,
				target: phone1,
				type: 'basic'
			});
			instance.connect({
				source: phone1,
				target: inperson,
				type: 'basic'
			});

			instance.connect({
				source: phone2,
				target: rejected,
				type: 'basic'
			});
		});
	});
</script>

<section class="jtk-demo-main demo">
	<!-- demo -->
	<div
		class="jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan canvas"
		id="canvas"
		bind:this={canvas}
		bind:offsetHeight
		bind:offsetWidth
	>
		{#if instance && boxes.length}
			{#each boxes as box}
				<svelte:component
					this={Box}
					bind:box={boxes[box.name]}
					left={box.left}
					top={box.top}
					action={box.action}>{box.title}</svelte:component
				>
			{/each}
		{/if}
	</div>
	<!-- /demo -->
	<!-- explanation -->
	<div class="description">
		<h4>STATE MACHINE</h4>
		<p>Nodes are connected with the StateMachine connector.</p>
		<p>
			Endpoints are located with 'Continuous' anchors, which are anchors whose location is
			calculated based on the location of all other connected elements, and which guarantee a unique
			endpoint per connection.
		</p>
		<p>
			Click and drag new Connections from the orange div in each element; the main elements in the
			UI are configured to be Connection targets. You can drag from one of these divs onto its
			parent element to create a 'loopback' connection. Each element supports up to 5 Connections.
		</p>
		<p>Click on a Connection to delete it.</p>
		<p>Double click on whitespace to add a new node</p>
	</div>
	<!-- /explanation -->
</section>

<style>
	.demo {
		/* for IE10+ touch devices */
		touch-action: none;
	}

	#canvas {
		width: 100vw;
		height: 50vh;
	}
</style>
