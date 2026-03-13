import { motion } from 'framer-motion';
import { Bitcoin } from './icons/Bitcoin';

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Bitcoin className="w-16 h-16 text-[#f7931a]" />
      </motion.div>
    </div>
  );
}
