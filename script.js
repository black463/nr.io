 <script>
    // Filter produk
    function filterProduk() {
      var input = document.getElementById("searchInput");
      var filter = input.value.toLowerCase();
      var grid = document.getElementById("produkList");
      var cards = grid.getElementsByClassName("card");

      for (var i = 0; i < cards.length; i++) {
        var title = cards[i].getElementsByTagName("h2")[0];
        if (title.innerText.toLowerCase().indexOf(filter) > -1) {
          cards[i].style.display = "";
        } else {
          cards[i].style.display = "none";
        }
      }
    }

    // Banner Slide Otomatis
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) slide.classList.add("active");
      });
    }

    function moveSlide(n) {
      slideIndex += n;
      if (slideIndex >= slides.length) slideIndex = 0;
      if (slideIndex < 0) slideIndex = slides.length - 1;
      showSlide(slideIndex);
    }

    function autoSlide() {
      slideIndex++;
      if (slideIndex >= slides.length) slideIndex = 0;
      showSlide(slideIndex);
    }

    showSlide(slideIndex);
    setInterval(autoSlide, 3000); // 3 detik
  </script>
  <script>
    function filterKategori(kategori) {
      const cards = document.querySelectorAll("#produkList .card");

      cards.forEach(card => {
        const label = card.querySelector(".label").textContent.toLowerCase();
        if (kategori === "semua" || label.includes(kategori)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    }
  </script>
