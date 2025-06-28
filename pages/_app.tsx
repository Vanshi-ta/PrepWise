import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && router.pathname !== '/') {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
