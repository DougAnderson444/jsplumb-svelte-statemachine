<script>
	// Iterates through the nodes and configures groups as appropriate
	import Group from './Group.svelte';
	import Box from './Box.svelte';

	export let nodeElement = null;
	export let node;
	export let addNodeElToParent = null; // = (n) => {}; // assumes no parent as default, must be overridden
	let childElements = [];
	/**
    Once the child node component is created and bound,
    add bound variable to parent group
    */
	$: if (nodeElement && addNodeElToParent) addNodeElToParent(nodeElement);
	console.log({ node });
</script>

{#if node}
	<slot />
	{#if node?.children?.length}
		<!-- Group passes down the function  addNodeElToParent so that the child can call it once the node element has been created and bound -->
		<Group bind:box={nodeElement} let:addToGroup
			>{node.title} has {node.children.length} children<br />
			<!-- loop through each child, also checking for groups/children and linking them up -->
			{#each node.children as child, c}
				<svelte:self node={child} addNodeElToParent={addToGroup}>
					Child {c} - {child.title}
				</svelte:self>
			{/each}
		</Group>
	{:else}
		<svelte:component
			this={Box}
			bind:box={nodeElement}
			left={node.left}
			top={node.top}
			action={node.action}>{node.title}</svelte:component
		>
		<!-- <Box bind:box={nodeElement} left={item.left} top={item.top} action={item.action}>{item.title}</Box> -->
	{/if}
{/if}
