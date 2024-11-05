const emailPlaceholder = document.getElementById("email-placeholder")
const url = window.location.href

const urlObject = new URL(url)

const urlSearchParamsObject = new URLSearchParams(urlObject.search)

const email = urlSearchParamsObject.get("email")
console.log(email)

if (emailPlaceholder) {
  emailPlaceholder.textContent = email
}
