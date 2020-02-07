<template>
  <div>
    <NewsList :newsArticles="newsArticles"></NewsList>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import newsService from "../services/newsService";
import NewsList from "../components/NewsList.vue";
import { ArticleType, NewsArticle } from "../types";
import Storage from "vue-web-storage";

@Component({
  components: {
    NewsList
  }
})
export default class TopStories extends Vue {
  newsArticles: NewsArticle[] = [];
  mounted() {
    if (Vue.$localStorage.get("usrInfo") == null) {
      alert("로그인을 해주세요.");
      window.location.href = "http://" + document.URL.split("/")[2] + "/";
      // console.log(document.URL.split("/"));
    }
    newsService
      .getArticlesByType(ArticleType.TopStory)
      .then((newsArticles: NewsArticle[]) => {
        this.newsArticles = newsArticles;
      });
  }
}
</script>
