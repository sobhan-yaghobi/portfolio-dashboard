import React from "react"

const SoftSkillForm = () => {
  const ref = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<TypeError>({} as TypeError)

  const clientAction = async (event: FormData) => {
    const actionResult = await createTechnicalGrowthFormAction(event, path)

    if ("errors" in actionResult) return setErrors({ ...actionResult.errors } as TypeError)

    showActionReturnMessage({ actionResult, functions: { doActionIfTrue: resetForm } })
  }

  const resetForm = () => {
    ref.current?.reset()
    setErrors({} as TypeError)
  }

  //   return <Form errors={errors} ref={ref} submitFunction={clientAction} submitText="اضافه کن" />
}

export default SoftSkillForm
