import React, { useEffect, useMemo, useState } from "react"
import { Input } from 'antd'
import { IconHiddenPassword, IconShowPassword } from '@/assets/icons'
import { useFormContext } from 'react-hook-form'

type TypeInputForm = {
    title?: string
    placeholder?: string
    className?: string
    type?: string
    field?: any
    validation?: object
    disabled?: boolean
    [key: string]: any
}


const FormInput = ({ field, validation, title, placeholder, type = 'text', className, disabled, ...props }: TypeInputForm) => {
    const methods = useFormContext()

    const { error }: any = field ? methods.getFieldState(field, methods.formState) : {}

    const [showPassword, setShowPassword] = useState<boolean>(true)

    useEffect(() => {
        if (field) {
            methods.register(field, validation)
        }

    }, [methods, field, validation])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        methods.clearErrors(field)
        methods.setValue(field, e.target.value)
    };

    const typeInput = useMemo(() => {

        let _type = type
        if (_type === "password" && showPassword === false) {
            _type = "text"
        }
        return _type

    }, [type, showPassword])

    return (
        <React.Fragment>
            {title ? <span className="mb-[10px] font-semibold">{title}</span> : null}
            <div className={`w-full ${className}`}>
                <div className={`w-full border-[1px] rounded-[8px] flex justify-center items-center px-[8px]`}>
                    <Input
                        type={typeInput}
                        placeholder={placeholder}
                        disabled={disabled}
                        value={field ? methods.watch(field) ?? '' : ''}
                        bordered={false}
                        onChange={handleChange}
                        {...props}
                        style={{ height: 45 }} />

                    {type === 'password' ? (
                        <div className="h-[45px] pl-[5px] rounded-e-[8px] flex justify-center items-center cursor-pointer" onClick={() => setShowPassword((state) => !state)}>

                            {showPassword ?
                                <IconShowPassword className="w-[20px] h-[20px] fill-[#f83e3e]" />
                                :
                                <IconHiddenPassword className="w-[20px] h-[20px] fill-[#f83e3e]" />
                            }
                        </div>
                    ) : null}

                </div>
                {error?.message ? <span className="mt-[4px] text-[12px] text-[#f83e3e]">{error?.message}</span> : null}

            </div>
        </React.Fragment>
    )
}

export default FormInput