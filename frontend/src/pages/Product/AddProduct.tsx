import FormInput from "@/shared/Form/FormInput"
import { FormProvider, useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { Button as ButtonAntd, Space, Select } from 'antd';
import { useCallback, useEffect } from "react"
import ProductServices from "./Service"
import { categoriesOpts, typeOfProductOpts } from "./product.const";

const AddProduct = ({ productId, isEdit = false, onCancle, onReload }: { productId?: number | string, onCancle?: () => void, isEdit?: boolean, onReload?: () => void }) => {

    const methods = useForm()


    const { handleSubmit, reset, watch } = methods

    const fetchDataProductList = useCallback(async () => {

        try {

            const res: any = await ProductServices.getDetailProduct(productId)

            if (res?.statusCode === 200) {
                const { data } = res
                reset({ ...data })
            }

        } catch (error) {

        }
    }, [productId])

    useEffect(() => {

        if (productId) {
            fetchDataProductList()
        }

    }, [fetchDataProductList])


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        try {

            const res: any = productId ? await ProductServices.updateProduct(productId, data) : await ProductServices.addProduct(data)

            if (res?.statusCode === 200) {
                onReload?.()
                onCancle?.()
                reset()
            }
        } catch (error) {

        }
    }

    return (
        <div className="h-[50vh] flex justify-center w-full p-[16px]">

            <div

                className=" bg-white  flex flex-col  items-center w-full">

                <FormProvider {...methods}>
                    <span className="text-[24px] md:text-[32px] font-bold leading-[24px]">{productId ? `${watch()?.product_name} - [${watch()?.id}]` : "Add New Product"}</span>

                    <div className="mt-[4vh] w-full flex-1">

                        <FormInput title="Product Name" field={"product_name"} placeholder="Product Name" className="mb-[20px]" disabled={!isEdit} />

                        <span className="mb-[10px] font-semibold">{"Category"}</span> 
                        <Select
                            disabled={!isEdit}
                            placeholder={"Category"}
                            style={{ width: '100%', height: 45 }}
                            onChange={(value: string) => methods.setValue('category_id', value)}
                            value={watch()?.category_id || ""}
                            options={categoriesOpts}
                            className="mb-[20px]"
                        />

                        <FormInput title="Price" field={"price"} type="number" placeholder="Price" disabled={!isEdit} className="mb-[20px]" />
                        
                        <span className="mb-[10px] font-semibold">{"Type Product"}</span> 
                        <Select
                            disabled={!isEdit}
                            placeholder={"Type Product"}
                            style={{ width: '100%', height: 45 }}
                            onChange={(value: string) => methods.setValue('type_of_product', value)}
                            value={watch()?.type_of_product || ""}
                            options={typeOfProductOpts}
                        />

                    </div>
                    {isEdit ? (
                        <div className='flex justify-end items-end w-full'>
                            <Space size="middle">

                                <ButtonAntd onClick={onCancle} style={{ backgroundColor: "orange" }} type="primary" size={'large'} > Huỷ</ButtonAntd>
                                <ButtonAntd onClick={(e) => handleSubmit(onSubmit)(e)}
                                    style={{ backgroundColor: "green", color: 'white', }}
                                    type="default"
                                    size={'large'}>
                                    {productId ? "Update" : "Add"}
                                </ButtonAntd>

                            </Space>
                        </div>
                    ) : null

                    }

                </FormProvider>

            </div >

        </div>
    )
}

export default AddProduct