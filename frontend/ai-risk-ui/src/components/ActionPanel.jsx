import { motion } from "framer-motion"
import toast from "react-hot-toast"

function ActionPanel(){

function simulateAttack(){

toast.error("Suspicious Login Detected")

}

return(

<div className="flex gap-4 mb-10">

<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:.95}}
onClick={simulateAttack}
className="lux-btn"
>

Simulate Attack

</motion.button>

<motion.button
whileHover={{scale:1.05}}
whileTap={{scale:.95}}
className="lux-btn pink-btn"
>

Generate Risk Report

</motion.button>

</div>

)

}

export default ActionPanel