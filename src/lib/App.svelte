<script lang="ts">
	import './app.css';
	import { onMount, setContext } from 'svelte';
	import Nodes from './Nodes.svelte';
	import Box from './Box.svelte';
	import { key } from './util';

	import type { ConnectionEstablishedParams } from '@jsplumb/core';
	import { uuid } from '@jsplumb/util';
	import Group from './Group.svelte';

	let canvas;
	let jsPlumbInstance;
	let opened, begin, phone1, phone2, inperson, rejected;
	let offsetHeight, offsetWidth;

	let myGroup;

	const getInstance = () => jsPlumbInstance;

	setContext(key, {
		getInstance: () => jsPlumbInstance
	});

	let boxes;
	$: if (offsetHeight && offsetWidth)
		boxes = {
			edges: [],
			title: 'My Boxes',
			width: 400,
			height: 600,
			children: [
				{
					id: uuid(),
					name: 'opened',
					left: offsetWidth * 0.15,
					top: offsetHeight * 0.41,
					width: 200,
					height: 400,
					action: 'begin',
					title: 'BEGIN',
					edges: ['phone1'],
					group: {},
					children: [
						{
							id: uuid(),
							name: 'phone2',
							left: 15,
							top: 60,
							action: 'begin',
							title: 'PHONE INTERVIEW 2'
						},
						{
							id: uuid(),
							name: 'inperson',
							left: offsetWidth * 0.1,
							top: offsetHeight * 0.5,
							action: 'begin',
							title: 'IN PERSON'
						}
					]
				},
				{
					id: uuid(),
					name: 'phone1',
					left: offsetWidth * 0.25,
					top: offsetHeight * 0.2,
					action: 'begin',
					title: 'PHONE INTERVIEW 1'
				},

				{
					id: uuid(),
					name: 'rejected',
					left: offsetWidth * 0.1,
					top: offsetHeight * 0.3,
					action: 'begin',
					title: 'REJECTED'
				}
			]
		};
	$: boxes && console.log({ boxes });

	onMount(async () => {
		const { newInstance } = await import('@jsplumb/browser-ui');
		const { BezierConnector } = await import('@jsplumb/connector-bezier');
		const { uuid } = await import('@jsplumb/util');
		const { EVENT_CONNECTION } = await import('@jsplumb/core');

		// setup some defaults for jsPlumb.
		jsPlumbInstance = newInstance({
			endpoint: {
				type: 'Dot',
				options: {
					radius: 4,
					cssClass: 'endpointRound',
					hoverClass: 'endpointRoundHover'
				}
			},
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
			container: canvas,
			dragOptions: {
				filter: '.svlt-grid-resizer'
			}
		});

		jsPlumbInstance.bind(EVENT_CONNECTION, handleConnection);

		function handleConnection(params: ConnectionEstablishedParams) {
			console.log('Connection', { params });
			boxes.edges = [...boxes.edges, { source: params.sourceId, target: params.targetId }];
		}

		jsPlumbInstance.registerConnectionType('basic', {
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
		jsPlumbInstance.bind('click', function (c) {
			jsPlumbInstance.deleteConnection(c);
		});

		// bind a connection listener. note that the parameter passed to this function contains more than
		// just the new connection - see the documentation for a full list of what is included in 'info'.
		// this listener sets the connection's internal
		// id as the label overlay's text.
		jsPlumbInstance.bind('connection', function (info) {
			info.connection.getOverlay('label').setLabel(info.connection.id);
		});

		// bind a double click listener to "canvas"; add new node when this occurs.
		jsPlumbInstance.on(canvas, 'dblclick', function (e) {
			newNode(e.offsetX, e.offsetY);
		});

		function newNode(x, y) {
			boxes = {
				...boxes,
				nodes: [...boxes.nodes, { name: uuid(), left: x, top: y, action: '', title: uuid() }]
			};
		}

		jsPlumbInstance.addTargetSelector('.w', {
			anchor: 'Continuous',
			allowLoopback: true
		});

		// suspend drawing and initialise.
		jsPlumbInstance.batch(function () {
			// register all windows with the jsPlumbInstance
			jsPlumbInstance.manageAll(windows);

			// make a few connections
			// jsPlumbInstance.connect({
			// 	source: boxes[opened],
			// 	target: phone1,
			// 	type: 'basic'
			// });
			// jsPlumbInstance.connect({
			// 	source: phone1,
			// 	target: phone1,
			// 	type: 'basic'
			// });
			// jsPlumbInstance.connect({
			// 	source: phone1,
			// 	target: inperson,
			// 	type: 'basic'
			// });

			// jsPlumbInstance.connect({
			// 	source: phone2,
			// 	target: rejected,
			// 	type: 'basic'
			// });
		});

		// jsPlumbInstance.manage(myGroup);
		// jsPlumbInstance.addGroup({
		// 	el: myGroup,
		// 	id: 'myGroup',
		// 	orphan: true,
		// 	dragOptions: {
		// 		filter: '.svlt-grid-resizer'
		// 	},
		// 	filter: '.svlt-grid-resizer'
		// });
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
		{#if jsPlumbInstance && boxes.children.length}
			<!-- {#each boxes.nodes as node}
				<svelte:component
					this={Box}
					bind:box={boxes.nodes[node.id]}
					left={node.left}
					top={node.top}
					action={node.action}>{node.title}</svelte:component
				>
			{/each} -->
			<Nodes node={boxes} />
		{/if}
		<!-- <Box left={10} top={10}>Group</Box> -->

		<!-- <Group bind:box={myGroup}>GroupZone</Group> -->
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
	:root {
		--empty: rgba(255, 255, 255, 0.5);
		--shade-green: rgb(186 243 202 / 50%);
	}
	:global(.endpointRound circle, .endpointSquare rect) {
		fill: var(--empty);
	}
	:global(.endpointRound) {
		border: 1px solid rgba(128, 128, 128, 0.4);
		border-radius: 50%;
		z-index: 10;
		background-color: var(--shade-green);
	}
	.demo {
		/* for IE10+ touch devices */
		touch-action: none;
	}

	#canvas {
		width: 100vw;
		height: 50vh;
	}
</style>
