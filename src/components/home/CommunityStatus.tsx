
import { motion } from 'framer-motion';
import { ServerStatus } from '../ui/ServerStatus';
import { DiscordCard } from '../ui/DiscordCard';
import { fadeUp } from '../../utils/animations';

export const CommunityStatus = () => {
  return (
    <section className="py-12 relative z-20 -mt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <ServerStatus />
          <DiscordCard />
        </motion.div>
      </div>
    </section>
  );
};
