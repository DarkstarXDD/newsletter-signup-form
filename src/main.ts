import { z } from "zod"

let isError: boolean = false

const form = document.getElementById("form")
const emailInput = document.getElementById("email")
const errorContainer = document.getElementById("error-container")

function setErrorMessage(errorMessage: string) {
  if (errorContainer) {
    errorContainer.textContent = errorMessage
  }
}

function handleSuccess() {
  if (emailInput instanceof HTMLInputElement) {
    emailInput.setAttribute("aria-invalid", "false")
    setErrorMessage("")
    isError = false
  }
}

function handleError() {
  if (emailInput instanceof HTMLInputElement) {
    emailInput.setAttribute("aria-invalid", "true")
    emailInput.focus()

    // Add input listener to re validate while user is typing after an error
    if (!isError) {
      emailInput?.addEventListener("input", () => {
        validate()
      })
      isError = true
    }
  }
}

function validate() {
  if (!(form instanceof HTMLFormElement)) return
  const formData = new FormData(form)
  const formDataObject = Object.fromEntries(formData)

  const FormSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Email field is empty" })
      .email({ message: "Valid email required" }),
  })

  const result = FormSchema.safeParse(formDataObject)
  if (!result.success) {
    const errorObject = result.error.flatten().fieldErrors
    const emailErrorMessage = errorObject.email?.[0]
    setErrorMessage(emailErrorMessage || "")
    handleError()
  } else {
    handleSuccess()
  }
}

function submitForm() {
  if (emailInput instanceof HTMLInputElement) {
    emailInput.value = ""
    emailInput.blur()
  }
}

form?.addEventListener("submit", (event) => {
  event.preventDefault()
  validate()

  if (!isError) {
    submitForm()
  }
})
