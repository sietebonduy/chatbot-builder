import Header from './Header.tsx';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />

      <div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
