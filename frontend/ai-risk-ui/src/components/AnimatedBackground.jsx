import { motion } from "framer-motion"

export default function AnimatedBackground(){

return(

<div className="mesh-bg">

<motion.div
className="mesh blobA"
animate={{ x:[0,120,-80,0], y:[0,-80,60,0] }}
transition={{ duration:25, repeat:Infinity, ease:"easeInOut" }}
/>

<motion.div
className="mesh blobB"
animate={{ x:[0,-150,80,0], y:[0,120,-60,0] }}
transition={{ duration:30, repeat:Infinity, ease:"easeInOut" }}
/>

<motion.div
className="mesh blobC"
animate={{ x:[0,100,-50,0], y:[0,60,-80,0] }}
transition={{ duration:35, repeat:Infinity, ease:"easeInOut" }}
/>

</div>

)
}