import { useEffect } from "react";
import { motion } from "framer-motion";

const Banner = ({ message, visible, onClose }) => {
    useEffect(() => {
      if (visible) {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
      }
    }, [visible, onClose]);
  
    if (!visible) return null;
  
    return (
        <div style={{"position": "fixed",
            "top": "0",
            "left": "0",
            "width": "100%",
            "height": "100%",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "zIndex": "1000",
            "fontSize":"60px",
            "color":"red",
            "-webkit-text-stroke-width": "2px",
            "-webkit-text-stroke-color": "black"}}>
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 20 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.5 }}
            >
            {message}
      </motion.div>
      </div>
    );
  };
  
  export default Banner;