import { GuardProvider } from "@/providers/guard.provider";

const PanelLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <GuardProvider>{children}</GuardProvider>;
};

export default PanelLayout;
