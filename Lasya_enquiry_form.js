// =====================================================
//  CHANGE ONLY THIS — your office WhatsApp number
//  Format: 91 + 10-digit number  (no spaces, no +)
//  Example: 91 + 7330666881 = "917330666881"
// =====================================================
const OFFICE_NUMBER = "919849577637";
// =====================================================


// ── COURSE DROPDOWN TOGGLE ────────────────────────────

function toggleDropdown() {
    var dropdown = document.getElementById("courseDropdown");
    dropdown.classList.toggle("open");
}

// Close dropdown if clicked outside
document.addEventListener("click", function(e) {
    var dropdown = document.getElementById("courseDropdown");
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
    }
});

// Update button label when checkboxes change
document.addEventListener("change", function(e) {
    if (e.target && e.target.name === "course") {
        updateDropdownLabel();
    }
});

function updateDropdownLabel() {
    var checked = document.querySelectorAll('input[name="course"]:checked');
    var btn = document.getElementById("dropbtnText");
    if (checked.length === 0) {
        btn.innerHTML = 'Select Courses <span class="required-star">*</span>';
    } else if (checked.length === 1) {
        btn.innerHTML = checked[0].value + ' <span class="required-star">*</span>';
    } else {
        btn.innerHTML = checked.length + ' Courses Selected <span class="required-star">*</span>';
    }
}


// ── FORM SUBMIT ───────────────────────────────────────

document.getElementById("enquiryForm").addEventListener("submit", function(e) {

    e.preventDefault();

    // Read all field values
    var name           = document.getElementById("name").value.trim();
    var parentName     = document.getElementById("parentName").value.trim();
    var email          = document.getElementById("email").value.trim();
    var phone1         = document.getElementById("phone1").value.trim();
    var phone2         = document.getElementById("phone2").value.trim();
    var qualification  = document.getElementById("qualification").value;
    var specialization = document.getElementById("specialization").value.trim();
    var college        = document.getElementById("college").value.trim();
    var passout        = document.getElementById("passout").value.trim();
    var experience     = document.getElementById("experience").value.trim();
    var gap            = document.getElementById("gap").value.trim();
    var mode           = document.getElementById("mode").value;
    var timing         = document.getElementById("timing").value;
    var source         = document.getElementById("source").value;
    var comments       = document.getElementById("message").value.trim();

    // Read selected courses
    var checkedBoxes = document.querySelectorAll('input[name="course"]:checked');
    var selectedCourses = Array.from(checkedBoxes).map(function(cb) { return cb.value; });


    // ── VALIDATIONS ──────────────────────────────────

    if (name.length < 3) {
        alert("❌ Please enter your full name (minimum 3 characters)."); return;
    }
    if (parentName.length < 3) {
        alert("❌ Please enter parent / spouse name."); return;
    }
    if (!email.includes("@") || !email.includes(".")) {
        alert("❌ Please enter a valid email address."); return;
    }
    if (phone1.length !== 10 || isNaN(phone1)) {
        alert("❌ Mobile Number 1 must be exactly 10 digits."); return;
    }
    if (phone2 !== "" && (phone2.length !== 10 || isNaN(phone2))) {
        alert("❌ Mobile Number 2 must be exactly 10 digits."); return;
    }
    if (qualification === "") {
        alert("❌ Please select your qualification."); return;
    }
    if (specialization === "") {
        alert("❌ Please enter your specialization / branch."); return;
    }
    if (college === "") {
        alert("❌ Please enter your college name."); return;
    }
    if (passout.length !== 4 || isNaN(passout)) {
        alert("❌ Please enter a valid 4-digit pass-out year."); return;
    }
    if (mode === "") {
        alert("❌ Please select a training mode."); return;
    }
    if (selectedCourses.length === 0) {
        alert("❌ Please select at least one course."); return;
    }
    if (timing === "") {
        alert("❌ Please select your preferred timing."); return;
    }
    if (source === "") {
        alert("❌ Please select how you heard about us."); return;
    }


    // ── DISABLE BUTTON WHILE SENDING ─────────────────

    var btn = document.getElementById("submitBtn");
    btn.disabled = true;
    btn.textContent = "Sending...";


    // ── MESSAGE TO OFFICE ─────────────────────────────
    // Office receives full student details

    var officeMessage =
"🔔 *New Student Enquiry — Lasya Infotech*\n\n" +
"👤 *Name:* " + name + "\n" +
"👨‍👩‍👧 *Parent / Spouse:* " + parentName + "\n" +
"📧 *Email:* " + email + "\n" +
"📞 *Mobile 1:* " + phone1 + "\n" +
(phone2 ? "📞 *Mobile 2:* " + phone2 + "\n" : "") +
"\n" +
"🎓 *Qualification:* " + qualification + "\n" +
"📖 *Specialization:* " + specialization + "\n" +
"🏫 *College:* " + college + "\n" +
"📅 *Pass-out Year:* " + passout + "\n" +
"💼 *Experience:* " + (experience ? experience + " year(s)" : "Fresher") + "\n" +
"⏳ *Gap:* " + (gap ? gap + " year(s)" : "None") + "\n" +
"\n" +
"📚 *Courses Interested:*\n" +
selectedCourses.map(function(c) { return "  • " + c; }).join("\n") + "\n" +
"\n" +
"💻 *Training Mode:* " + mode + "\n" +
"🕐 *Preferred Timing:* " + timing + "\n" +
"📢 *Enquiry Source:* " + source +
(comments ? "\n💬 *Comments:* " + comments : "");


    // ── MESSAGE TO STUDENT ────────────────────────────
    // Student receives a warm confirmation message

    var studentMessage =
"Hello " + name + " 👋,\n\n" +
"Thank you for enquiring at *Lasya Infotech*! 🎓\n\n" +
"We have successfully received your enquiry for:\n" +
"📚 *" + selectedCourses.join(", ") + "*\n\n" +
"Our team will contact you shortly on *" + phone1 + "* with full course details, schedule, and fee structure.\n\n" +
"📍 Lasya Infotech, Kompally, Hyderabad\n" +
"📞 73306 66881 / 73306 66882\n" +
"📧 ov@lasyainfotech.com\n\n" +
"We look forward to being a part of your career journey! 😊\n" +
"— Team Lasya Infotech";


    // ── SEND WHATSAPP MESSAGES ────────────────────────

    // Step 1: Send details to office
    var officeURL = "https://wa.me/" + OFFICE_NUMBER + "?text=" + encodeURIComponent(officeMessage);
    window.open(officeURL, "_blank");

    // Step 2: Send confirmation to student (using student's own number)
    // Student's number = 91 + phone1
    var studentNumber = "91" + phone1;
    setTimeout(function() {
        var studentURL = "https://wa.me/" + studentNumber + "?text=" + encodeURIComponent(studentMessage);
        window.open(studentURL, "_blank");
    }, 2000);


    // ── SHOW SUCCESS & RESET ──────────────────────────

    var msg = document.getElementById("successMsg");
    msg.textContent = "✅ Enquiry submitted! Our team will contact you within 24 hours.";
    msg.style.display = "block";

    // Scroll to success message
    msg.scrollIntoView({ behavior: "smooth", block: "center" });

    // Re-enable button
    btn.disabled = false;
    btn.textContent = "Submit Enquiry";

    // Reset form and dropdown label
    document.getElementById("enquiryForm").reset();
    updateDropdownLabel();

    // Hide success message after 8 seconds
    setTimeout(function() {
        msg.style.display = "none";
    }, 8000);

});


// ── VOICE INPUT ───────────────────────────────────────

function startVoice(inputId) {

    try {

        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported.\nPlease use Google Chrome.");
            return;
        }

        var recognition = new SpeechRecognition();
        recognition.lang           = "en-US";
        recognition.continuous     = false;
        recognition.interimResults = false;

        // Highlight mic button while listening
        var btn = document.querySelector('[onclick="startVoice(\'' + inputId + '\')"]');
        if (btn) btn.classList.add("listening");

        recognition.start();

        // Auto stop after 5 seconds
        setTimeout(function() { recognition.stop(); }, 5000);

        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            document.getElementById(inputId).value = transcript;
            if (btn) btn.classList.remove("listening");
        };

        recognition.onerror = function(event) {
            console.log("Voice error:", event.error);
            if (btn) btn.classList.remove("listening");
        };

        recognition.onend = function() {
            if (btn) btn.classList.remove("listening");
        };

    } catch (err) {
        console.log("Voice exception:", err);
        alert("Voice input error. Please type instead.");
    }
}