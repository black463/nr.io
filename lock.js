// ambil data membership dari backend
  var membershipLevel = "{{nama_membership}}"; // Bronze / Silver / Premium

  document.addEventListener("DOMContentLoaded", function () {
    // Check for "Bronze" membership first
    if (membershipLevel === 'Bronze') {
        const violationOverlay = document.getElementById('violationOverlay');
        violationOverlay.classList.add('show');
        return; // Stop further execution
    }

    // Select all links with the 'restricted-link' class
    var restrictedLinks = document.querySelectorAll(".restricted-link");

    restrictedLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        const requiredLevel = link.getAttribute('data-access-level');
        let canAccess = false;
        let message = '';

        if (requiredLevel === 'Silver') {
          if (membershipLevel === 'Silver' || membershipLevel === 'Premium') {
            canAccess = true;
          } else {
            message = 'Fitur ini hanya untuk Silver & Premium. Silakan upgrade untuk mengakses lebih banyak layanan.';
          }
        } else if (requiredLevel === 'Premium') {
          if (membershipLevel === 'Premium') {
            canAccess = true;
          } else {
            message = 'Fitur ini hanya untuk Premium. Silakan upgrade membership Anda.';
          }
        } else {
          canAccess = true; // Default to allowing access if no data-access-level is set
        }

        if (!canAccess) {
          e.preventDefault();
          openModal(requiredLevel, message);
        }
      });
    });
  });

  function openModal(level, message) {
      var modal = document.getElementById("upgradeModal");
      var modalTitle = document.getElementById("modalTitle");
      var modalMessage = document.getElementById("modalMessage");
      var upgradeLink = document.getElementById("upgradeLink");

      if (level === "Silver") {
          modalTitle.textContent = "Upgrade Membership 💎";
          upgradeLink.href = "https://payment02.olshopku.com/digital/296241"; // ganti sesuai URL upgrade Silver
      } else if (level === "Premium") {
          modalTitle.textContent = "Upgrade Membership ✨";
          upgradeLink.href = "https://payment02.olshopku.com/digital/296241"; // ganti sesuai URL upgrade Premium
      } else {
          modalTitle.textContent = "Membership Tidak Dikenali ❓";
          upgradeLink.href = "https://payment02.olshopku.com/digital/296241"; // ganti sesuai halaman daftar
      }

      modalMessage.textContent = message;
      modal.classList.remove("hidden");
  }

  function closeModal() {
      document.getElementById("upgradeModal").classList.add("hidden");
  }
