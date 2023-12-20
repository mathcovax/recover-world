<script setup lang="ts">
import Toast from "@SRC/fixed/toast.vue";
import Loader from "@SRC/fixed/loader.vue";
</script>

<template>
	<Loader/>

	<RouterView/>

	<Toast/>
</template>
