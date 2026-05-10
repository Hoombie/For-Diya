// ── CONTACT FORM HANDLER ──
// Intercepts the form submit, sends data as JSON, and shows feedback to the user.
// Replace the fetch URL with your real backend endpoint when ready.
 
const form = document.getElementById('form');
 
form.addEventListener('submit', async function (e) {
  e.preventDefault(); // stop the browser's default page-reload submit
 
  const submitBtn = form.querySelector('input[type="submit"]');
 
  // Collect form data
  const data = {
  name:    document.getElementById('name').value.trim(),
  email:   document.getElementById('email').value.trim(),
  message: document.getElementById('message').value.trim(),
};
 
  // Basic client-side validation (browser `required` handles empty fields,
  // but this catches edge cases like whitespace-only entries)
  if (!data.name || !data.email || !data.message) {
    showFeedback('Please fill in all fields.', 'error');
    return;
  }
 
  // Disable button while sending
  submitBtn.value    = 'Sending…';
  submitBtn.disabled = true;
 
  try {
    const response = await fetch('https://formspree.io/f/mzdoaawz', {   // ← swap in your endpoint
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });
 
    if (response.ok) {
      showFeedback('Message sent — thank you!', 'success');
      form.reset();
    } else {
      // Server responded but with an error status (4xx / 5xx)
      showFeedback('Something went wrong. Please try again.', 'error');
    }
 
  } catch (err) {
    // Network failure or server unreachable
    showFeedback('Could not send message. Check your connection.', 'error');
    console.error('Form submission error:', err);
 
  } finally {
    submitBtn.value    = 'Send';
    submitBtn.disabled = false;
  }
});
 
// ── Feedback helper ──
// Creates (or reuses) a small status message below the form.
function showFeedback(message, type) {
  let el = document.getElementById('form-feedback');
 
  if (!el) {
    el = document.createElement('p');
    el.id = 'form-feedback';
    form.after(el);   // insert after the form
  }
 
  el.textContent  = message;
  el.className    = 'form-feedback ' + type;   // 'success' or 'error'
 
  // Auto-clear after 5 seconds
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.remove(), 5000);
}