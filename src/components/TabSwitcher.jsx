import { motion } from "framer-motion";

const TabSwitcher = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex bg-surface-variant/20 border border-brand-muted/30 rounded-full p-1 relative">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative px-6 py-1.5 rounded-full text-xs font-bold transition-colors duration-300 z-10 ${
            activeTab === tab.id ? "text-white" : "text-brand-primary"
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTabPill"
              className="absolute inset-0 bg-brand-primary rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
