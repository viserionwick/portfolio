// Essentials
import { useState, useEffect } from 'react';
import { useRouter, NextRouter } from 'next/router';

export const Loading = () => {
  return (
    <div className='withLoading'>
      <span className='loading'/>
    </div>
  );
}

const withLoading = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithLoadingComponent = (props: P) => {
    const [loading, setLoading] = useState(false);
    const router: NextRouter = useRouter();

    useEffect(() => {
      const startLoading = () => {
        window.scrollTo({ top: 0 });
        setLoading(true);
      };

      const stopLoading = () => {
        setLoading(false);
      };

      // Listen to route changes and update the loading state accordingly
      router.events.on('routeChangeStart', startLoading);
      router.events.on('routeChangeComplete', stopLoading);
      router.events.on('routeChangeError', stopLoading);

      // Cleanup event listeners on component unmount
      return () => {
        router.events.off('routeChangeStart', startLoading);
        router.events.off('routeChangeComplete', stopLoading);
        router.events.off('routeChangeError', stopLoading);
      };
    }, [router.events]);

    return (
      <>
        { 
            loading ?
            <Loading />
            :
            <WrappedComponent {...props} />
        }
      </>
    );
  };

  return WithLoadingComponent;
};

export default withLoading;