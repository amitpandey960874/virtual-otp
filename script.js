document.addEventListener("DOMContentLoaded", () => {
    const countryDropdown = document.getElementById("countryDropdown");
    const appDropdown = document.getElementById("appDropdown");
    const getNumberBtn = document.getElementById("getNumberBtn");
    const copyOtpBtn = document.getElementById("copyOtpBtn");
    const phoneNumberEl = document.getElementById("phoneNumber");
    const otpMessage = document.getElementById("otpMessage");
    const timerDisplay = document.getElementById("timerDisplay");
    const darkToggle = document.getElementById("darkModeToggle");
  
    let timerInterval = null;
    let generatedOtp = "";
  
    // Balance management
    let userBalance = 100;
  
    // Generate random dummy number
    function generatePhoneNumber(code) {
      const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000);
      const prefixMap = {
        IN: "+91",
        US: "+1",
        UK: "+44",
        DE: "+49",
        CA: "+1"
      };
      return `${prefixMap[code]} ${randomDigits}`;
    }
  
    // Generate OTP message in secure format
    function generateOTPMessage(appName) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      generatedOtp = `${otp} is the OTP for your ${appName} account. Do not share this with anyone.`;
      return generatedOtp;
    }
  
    // Start 2-minute countdown, show OTP after 30 seconds
    function startTimer(duration, appName) {
      clearInterval(timerInterval);
      let timeLeft = duration;
      const otp = generateOTPMessage(appName);
  
      const updateTimer = () => {
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        timerDisplay.textContent = `⏳ Time Remaining: ${mins}:${secs.toString().padStart(2, "0")}`;
        timeLeft--;
  
        // Show OTP after 30 seconds
        if (timeLeft === duration - 30) {
          otpMessage.textContent = `✅ ${otp}`;
          copyOtpBtn.disabled = false;
        }
  
        if (timeLeft < 0) {
          clearInterval(timerInterval);
          timerDisplay.textContent = "⏰ Time expired!";
          otpMessage.textContent = "❌ OTP Expired!";
          copyOtpBtn.disabled = true;
        }
      };
  
      updateTimer(); // Initial call
      timerInterval = setInterval(updateTimer, 1000);
    }
  
    // Update balance display
    function updateBalanceDisplay() {
      const country = document.getElementById('countryDropdown').value;
      const currencyMap = {
        'IN': '₹',
        'US': '$',
        'UK': '£',
        'DE': '€',
        'CA': '$'
      };
      document.getElementById('userBalance').textContent = `${currencyMap[country]}${userBalance}`;
    }
  
    // Get number button click handler
    document.getElementById('getNumberBtn').addEventListener('click', function() {
      const selectedApp = document.getElementById('appDropdown');
      const appPrice = parseInt(selectedApp.options[selectedApp.selectedIndex].dataset.price);
      const phoneNumberDisplay = document.getElementById('phoneNumber');
      
      if (userBalance < appPrice) {
        phoneNumberDisplay.textContent = 'Insufficient balance! Please add money to your wallet.';
        phoneNumberDisplay.style.color = '#dc3545';
        return;
      }
      
      // Deduct balance
      userBalance -= appPrice;
      updateBalanceDisplay();
      
      // Generate and display random number
      const countryCode = document.getElementById('countryDropdown').value;
      const randomNumber = generatePhoneNumber(countryCode);
      phoneNumberDisplay.textContent = randomNumber;
      phoneNumberDisplay.style.color = '#28a745';
      
      // Start timer and OTP generation
      startTimer(120, selectedApp.options[selectedApp.selectedIndex].text);
    });
  
    // Update balance display when country changes
    document.getElementById('countryDropdown').addEventListener('change', function() {
      updateBalanceDisplay();
    });
  
    // Initialize balance display
    document.addEventListener('DOMContentLoaded', function() {
      updateBalanceDisplay();
    });
  
    // Copy OTP to clipboard
    copyOtpBtn.addEventListener("click", () => {
      if (generatedOtp !== "") {
        navigator.clipboard.writeText(generatedOtp).then(() => {
          alert("📋 OTP copied to clipboard!");
        });
      }
    });
  
    // Dark mode toggle
    darkToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark");
    });
  
    // Login functionality
    document.getElementById('signInBtn').addEventListener('click', function() {
      const userId = document.getElementById('userId').value;
      const password = document.getElementById('password').value;
      const loginMessage = document.getElementById('loginMessage');
      const loginContainer = document.getElementById('loginContainer');
      const mainContainer = document.getElementById('mainContainer');
  
      if (userId === 'admin' && password === 'admin') {
        loginMessage.textContent = 'Login successful!';
        loginMessage.style.color = '#4CAF50';
        setTimeout(() => {
          loginContainer.style.display = 'none';
          mainContainer.style.display = 'block';
          // Remove the login button from the main container
          const loginBtnInMain = document.querySelector('.toggle-container #loginBtn');
          if (loginBtnInMain) {
            loginBtnInMain.remove();
          }
          // Enable all buttons after successful login
          document.querySelectorAll('button:not(#signInBtn):not(#buyCredentialsBtn)').forEach(button => {
            button.disabled = false;
          });
        }, 1000);
      } else {
        loginMessage.textContent = 'Wrong User ID or Password!';
        loginMessage.style.color = '#dc3545';
      }
    });
  
    // Disable all buttons except login buttons initially
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('button:not(#signInBtn):not(#buyCredentialsBtn)').forEach(button => {
        button.disabled = true;
      });
    });
  
    // Price range update functionality
    document.getElementById('countryDropdown').addEventListener('change', function() {
      const country = this.value;
      const priceRange = document.getElementById('priceRange');
      
      const priceMap = {
        'IN': '₹10 - ₹30',
        'US': '$10 - $30',
        'UK': '£10 - £30',
        'DE': '€10 - €30',
        'CA': '$10 - $30'
      };
      
      priceRange.textContent = priceMap[country];
    });
  
    // App price update functionality
    document.getElementById('appDropdown').addEventListener('change', function() {
      const selectedOption = this.options[this.selectedIndex];
      const appPrice = document.getElementById('appPrice');
      const country = document.getElementById('countryDropdown').value;
      
      const currencyMap = {
        'IN': '₹',
        'US': '$',
        'UK': '£',
        'DE': '€',
        'CA': '$'
      };
      
      appPrice.textContent = `${currencyMap[country]}${selectedOption.dataset.price}`;
    });
  
    // Initialize app price on page load
    document.addEventListener('DOMContentLoaded', function() {
      const appDropdown = document.getElementById('appDropdown');
      const appPrice = document.getElementById('appPrice');
      const country = document.getElementById('countryDropdown').value;
      
      const currencyMap = {
        'IN': '₹',
        'US': '$',
        'UK': '£',
        'DE': '€',
        'CA': '$'
      };
      
      appPrice.textContent = `${currencyMap[country]}${appDropdown.options[appDropdown.selectedIndex].dataset.price}`;
    });
  });
  