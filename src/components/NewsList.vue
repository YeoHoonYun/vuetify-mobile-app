<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { NewsArticle } from "../types";

@Component
export default class NewsList extends Vue {
  @Prop({ type: Array, required: true }) newsArticles!: NewsArticle[];
}
</script>
