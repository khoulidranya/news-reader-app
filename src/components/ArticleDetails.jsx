import React from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://api.thenewsapi.com/v1/news/${id}?api_token=MXS6UTKpEBrolKRdRda7IQCcWvGnm9t4bagKLuAj`);
        if (!response.ok) throw new Error('Failed to fetch article');
        const data = await response.json();
        setArticle(data.data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        // Handle error (e.g., show error message)
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <img
        src={article.image_url || 'https://via.placeholder.com/150'}
        alt={article.title}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-xl mb-4">{article.description || article.snippet}</p>
      <p className="mb-4">Author: {article.author || 'Unknown'}</p>
      <p className="mb-4">Source: {article.source || 'Unknown'}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        Read Full Article
      </a>
    </div>
  );
};

export default ArticleDetails;
