import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SplashScreen } from '@/components/animations/SplashScreen';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SplashScreen />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
