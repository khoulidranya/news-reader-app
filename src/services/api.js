

export const fetchTopStories = async () => {
  try {
    const url = `https://api.thenewsapi.com/v1/news/top?api_token=MXS6UTKpEBrolKRdRda7IQCcWvGnm9t4bagKLuAj`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const { meta, data } = await response.json();

    // Process the data as needed
    return {
      totalFound: meta.found,
      totalReturned: meta.returned,
      articles: data.map(article => ({
        id: article.uuid,
        title: article.title,
        description: article.description,
        snippet: article.snippet,
        url: article.url,
        imageUrl: article.image_url,
        publishedAt: article.published_at,
        source: article.source,
        categories: article.categories,
        relevanceScore: article.relevance_score,
        locale: article.locale
      }))
    };
  } catch (error) {
    console.error('Error fetching top stories:', error);
    throw error;
  }
};
