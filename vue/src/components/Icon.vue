<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";

interface Props{
	icon: unknown
}

const props = defineProps<Props>();

defineOptions({
	name: "Icon"
});
</script>

<template>
	<SvgIcon
	type="mdi"
	:path="props.icon"
	/>
</template>
