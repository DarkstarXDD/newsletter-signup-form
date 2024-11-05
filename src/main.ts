import { z } from "zod"

let isInputListenerRegistered = false

const form = document.getElementById("form")
const emailInput = document.getElementById("email")
const errorContainer = document.getElementById("error-container")
const landingScreen = document.getElementById("landing-screen")
const confirmationScreen = document.getElementById("confirmation-screen")
const emailPlaceholder = document.getElementById("email-placeholder")
const dismissButton = document.getElementById("dismiss-button")

function setErrorMessage(errorMessage: string) {
  if (errorContainer) {
    errorContainer.textContent = errorMessage
  }
}

function handleSuccess() {
  if (emailInput instanceof HTMLInputElement) {
    emailInput.setAttribute("aria-invalid", "false")
    setErrorMessage("")
    isInputListenerRegistered = false
  }
}

function handleError(errorMessage: string) {
  if (emailInput instanceof HTMLInputElement) {
    emailInput.setAttribute("aria-invalid", "true")
    setErrorMessage(errorMessage)
    emailInput.focus()

    // Add input listener to re validate while user is typing after an error
    if (!isInputListenerRegistered) {
      emailInput?.addEventListener("input", validate)
      isInputListenerRegistered = true
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
    handleError(emailErrorMessage || "")
  } else {
    handleSuccess()
  }
}

function submitForm() {
  if (emailInput instanceof HTMLInputElement) {
    if (emailPlaceholder) {
      emailPlaceholder.textContent = emailInput.value
    }
    emailInput.value = ""
    emailInput.blur()
    emailInput.removeEventListener("input", validate)
    if (landingScreen && confirmationScreen) {
      landingScreen.dataset.hidden = "true"
      confirmationScreen.dataset.hidden = "false"
    }
  }
}

form?.addEventListener("submit", (event) => {
  event.preventDefault()
  validate()

  if (!isInputListenerRegistered) {
    submitForm()
  }
})

dismissButton?.addEventListener("click", () => {
  if (landingScreen && confirmationScreen) {
    landingScreen.dataset.hidden = "false"
    confirmationScreen.dataset.hidden = "true"
  }
})
