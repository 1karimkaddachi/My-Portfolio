// Typed animation

var typed = new Typed("#typed" , {
    strings: ["Full-Stack Web Developer","Database Developer","UI/UX Designer"],
    typeSpeed: 50,
    backSpeed: 20,
    backDelay: 3000,
    showCursor: false,
    loop: true
});

// Theme 
function theme() {
    const darkBtn = document.getElementById('darkBtn');
    const lightBtn = document.getElementById('lightBtn');

    document.body.classList.toggle('light');

    if (document.body.classList.contains('light')) {
        darkBtn.style.display = 'none';
        lightBtn.style.display = 'block';
    } else {
        darkBtn.style.display = 'block';
        lightBtn.style.display = 'none';
    }

}

// Menue Toggle
const menuItems = document.querySelectorAll('.nav .item');

menuItems.forEach(item=> {
    item.addEventListener('click', () => {
        menuItems.forEach(item => item.classList.remove('active'));
        item.classList.add('active');
    })
})




const WEBHOOK_URL = "https://discord.com/api/webhooks/1411638743936274452/ht9c3-xtWCtoPVuJSEbeEtZIjkpi3T-lnH-QQ0ScyVDPnRuASBJSJP1y9P0s1e4YCc7L";
const USER_ID = "925760611542007880";

const form = document.getElementById("contactForm");
const alertBox = document.getElementById("formAlert");

function showAlert(msg, color) {
  alertBox.textContent = msg;
  alertBox.style.color = color;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const firstname = data.get("firstname").trim();
  const lastname  = data.get("lastname").trim();
  const email     = data.get("email").trim();
  const message   = data.get("message").trim();

  if (!firstname || !lastname || !email || !message) {
    showAlert("⚠️ Please fill all fields!", "crimson");
    return;
  }

  const embed = {
    title: "📩 New Contact Message",
    color: 0x0d6efd,
    fields: [
      { name: "👤 Name", value: `${firstname} ${lastname}`, inline: true },
      { name: "📧 Email", value: email, inline: true },
      { name: "📝 Message", value: message }
    ],
    timestamp: new Date().toISOString(),
    footer: { text: "Contact Form • Website" }
  };

  const payload = {
    username: "Contact Bot",
    content: `<@${USER_ID}>`,
    embeds: [embed]
  };

  showAlert("⏳ Sending...", "gray");

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Webhook error");
    showAlert("✅ Sent successfully to Discord!", "green");
    form.reset();
  } catch (err) {
    console.error(err);
    showAlert("❌ Failed to send. Check webhook URL.", "crimson");
  }
});

