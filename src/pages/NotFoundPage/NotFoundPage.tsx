import NotFound from '../../components/ui/NotFound/NotFound';

function NotFoundPage() {
  return (
    <NotFound
      title='404 - Page not found'
      message='The page you’re looking for doesn’t exist or was moved.'
      buttonText='Browse our Catalog'
    />
  );
}

export default NotFoundPage;
