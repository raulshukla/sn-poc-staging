import { FADE_IN_UP_VARIANTS } from "@/constants/framer-motion";
import { motion, HTMLMotionProps } from "framer-motion";

/* --------------------------------------------------------------------------------------
Types
-------------------------------------------------------------------------------------- */
type FadeInUpProps = HTMLMotionProps<"div">;

/* --------------------------------------------------------------------------------------
Component
-------------------------------------------------------------------------------------- */
const FadeInUp = (props: FadeInUpProps) => {
  return <motion.div {...props} variants={FADE_IN_UP_VARIANTS} />;
};

/* --------------------------------------------------------------------------------------
Exports
-------------------------------------------------------------------------------------- */
export { FadeInUp };
export type { FadeInUpProps };
