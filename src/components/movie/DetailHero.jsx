import { motion } from 'framer-motion';

const DetailHero = ({ backdropPath }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="absolute top-0 left-0 w-full h-125 z-0"
    >
      <img 
        src={`https://image.tmdb.org/t/p/original${backdropPath}`} 
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/90 via-white/40 to-white" />
    </motion.div>
  );
};

export default DetailHero;