import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export function AIInsights({ insights }: { insights: string[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Brain className="h-4 w-4 text-emerald-600" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-700/80">AI Insights</h3>
      </div>
      <ul className="space-y-2">
        {insights.map((t, i) => (
          <motion.li
            key={t}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-2 text-sm text-emerald-900"
          >
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span>{t}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
