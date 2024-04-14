import { motion } from "framer-motion"

type typeButton = {
    title?: string
    className?: string
    onClick?: (e:any) => void
}

const Button = (props: typeButton) => {

    const { title, className } = props

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e)=>props?.onClick?.(e)}
            className={`w-full h-[45px] bg-[#f83e3e] flex justify-center items-center rounded-[8px] cursor-pointer hover:opacity-90 ${className}`}>

            {title ? <span className="text-white font-bold">{title}</span> : null}

        </motion.div>
    )
}
export default Button