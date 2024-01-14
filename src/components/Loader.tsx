import { motion } from "framer-motion";
import styles from "./Loader.module.css";
import logoLoader2 from "../assets/logoLoader2.webm"

export default function Loader() {
  console.log("Version 0.0.4-7")
  return (
    <motion.div
      className={styles.loaderSite}
      // animate={{ opacity: 1 }}
      // initial={{ opacity: 0 }}
      // transition={{ duration: 1, delay: 0 }}
    >
<video autoPlay loop muted style={{ width: '250px', height: '250px', position: "relative" }}>
        <source src={logoLoader2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
}
