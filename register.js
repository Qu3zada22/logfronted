document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm")
    const messageElement = document.getElementById("registerMessage")
    const backendUrl = "http://localhost:3000"
  
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault()
      const username = document.getElementById("username").value
      const password = document.getElementById("password").value
  
      // Ocultar mensaje anterior
      messageElement.style.display = "none"
      messageElement.textContent = ""
  
      if (!username || !password) {
        messageElement.textContent = "Por favor completa todos los campos."
        messageElement.classList.add("error")
        messageElement.style.display = "block"
        return
      }
  
      try {
        const response = await fetch(`${backendUrl}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        })
  
        const data = await response.json()
  
        if (response.ok) {
          // Registro exitoso
          messageElement.textContent = data.message + " Puedes iniciar sesión ahora."
          messageElement.classList.remove("error")
          messageElement.classList.add("success")
          messageElement.style.display = "block"
          registerForm.reset()
        } else {
          // Error de registro
          messageElement.textContent = `Error: ${data.error || response.statusText}`
          messageElement.classList.remove("success")
          messageElement.classList.add("error")
          messageElement.style.display = "block"
        }
      } catch (error) {
        console.error("Error de registro:", error)
        messageElement.textContent =
          "Error de conexión. Verifica tu conexión a internet o que el servidor esté funcionando."
        messageElement.classList.remove("success")
        messageElement.classList.add("error")
        messageElement.style.display = "block"
      }
    })
  })