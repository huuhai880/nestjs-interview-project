import Button from "@/shared/Button/Button"
import FormInput from "@/shared/Form/FormInput"
import { motion } from "framer-motion"
import { FormProvider, useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { useNavigate } from 'react-router-dom'

const variants = {

    visible: {
        opacity: 1,
        x: 0,
        transition: {
            opacity: { delay: 0.7 },
            x: { delay: 1 },
        },
    },
    hidden: { opacity: 0, x: -100 }
}

const EditProduct = () => {
    const navigate = useNavigate()
    const methods = useForm()


    const { handleSubmit } = methods

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        console.log(data)

        navigate("/")

    }

    return (
        <div
            className="h-[100vh] flex justify-center items-center">

            <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                className="w-[90vw] md:w-[20vw] bg-white shadow-xl rounded-[16px] py-[32px] px-[40px] flex flex-col justify-center items-center">
                <span className="text-[24px] md:text-[32px] font-bold leading-[24px]">Login</span>
                <FormProvider {...methods}>

                    <div className="mt-[4vh] w-full">

                        <FormInput field={"use_name"} placeholder="Your username" className="mb-[20px]" />

                        <FormInput field={"password"} type="password" placeholder="Your password" />

                    </div>

                    <Button title="Login" className="mt-[3vh]" onClick={(e) => handleSubmit(onSubmit)(e)} />
                </FormProvider>

            </motion.div >

        </div>
    )
}

export default EditProduct