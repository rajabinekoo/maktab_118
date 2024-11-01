interface IFooterLayout {
  children: React.ReactNode;
}

const FooterLayout: React.FC<IFooterLayout> = ({ children }) => {
  return <div className="bg-slate-200 min-h-screen">{children}</div>;
};

export default FooterLayout;
