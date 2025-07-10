const products = [
            { id: 1, name: "Sc Full Buka Olsop", price: 300000, category: "code", image: "https://cdn.lynkid.my.id/products/08-06-2025/1749317735349_5592500.webp" },
            { id: 2, name: "Home Buka ppob", price: 20000, category: "code", image: "https://cdn.lynkid.my.id/products/08-06-2025/1749317775973_3086705.webp" },
            { id: 3, name: "Katagori List", price: 30000, category: "code", image: "https://cdn.lynkid.my.id/products/03-06-2025/1748958192557_6231429.webp" },
            { id: 4, name: "Toko Shop Modern", price: 50000, category: "code", image: "https://cdn.lynkid.my.id/products/06-06-2025/1749198426560_3810690.webp" },
            { id: 5, name: "listrik code Token", price: 30000, category: "code", image: "https://cdn.lynkid.my.id/products/16-06-2025/1750079247826_9954326.webp" },
            { id: 6, name: "Pulsa All Operator", price: 25000, category: "code", image: "https://cdn.lynkid.my.id/products/25-06-2025/1750853031000_2827900.webp" },
            { id: 7, name: "Landing Page Ppob", price: 30000, category: "Page", image: "https://cdn.lynkid.my.id/products/28-06-2025/1751049779051_1357367.webp" },
            { id: 8, name: "Website Blogger", price: 50000, category: "Page", image: "https://cdn.lynkid.my.id/products/06-06-2025/1749219467915_4812292.webp" },
            { id: 9, name: "Login & Pendaftaran", price: 20000, category: "code", image: "https://cdn.lynkid.my.id/products/12-06-2025/1749713039458_6246827.webp" },
            { id: 10, name: "Source code poin buka Olshop", price: 20000, category: "code", image: "https://cdn.lynkid.my.id/products/29-06-2025/1751135391057_8740374.webp" },
            { id: 11, name: "Source code Topup Game", price: 30000, category: "code", image: "https://cdn.lynkid.my.id/products/30-06-2025/1751230196501_4919393.webp" },
            { id: 12, name: "Source code Topup E-wallet", price: 30000, category: "code", image: "https://cdn.lynkid.my.id/products/30-06-2025/1751224687623_8460110.webp" },
            { id: 13, name: "Source code Hide Produk", price: 15000, category: "code", image: "https://cdn.lynkid.my.id/products/01-07-2025/1751310780790_3370835.webp" },
            { id: 14, name: "Source code Topup Game Ml", price: 30000, category: "code", image: "https://cdn.lynkid.my.id/products/01-07-2025/1751312216269_7446272.webp" },
        ];

        let selectedProduct = null; // To store the product currently being ordered

        const productGrid = document.getElementById('productGrid');
        const orderModal = document.getElementById('orderModal');
        const orderModalContent = document.getElementById('orderModalContent');
        const closeOrderModal = document.getElementById('closeOrderModal');
        const selectedProductDetails = document.getElementById('selectedProductDetails');
        const orderForm = document.getElementById('orderForm');
        const customerNameInput = document.getElementById('customerName');
        const customerPhoneInput = document.getElementById('customerPhone');
        const customerAddressInput = document.getElementById('customerAddress');

        // Sidebar elements
        const menuToggle = document.getElementById('menuToggle');
        const sidebarMenu = document.getElementById('sidebarMenu');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const closeMenuButton = document.getElementById('closeMenu');
        const categoryButtons = document.querySelectorAll('#sidebarMenu .category-btn'); // Select category buttons inside sidebar

        const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
        const qrisDetails = document.getElementById('qrisDetails');
        const bankTransferDetails = document.getElementById('bankTransferDetails');
        const eWalletDetails = document.getElementById('eWalletDetails');

        // NEW: Share button elements in modal
        const shareViaWebShareModal = document.getElementById('shareViaWebShareModal');
        const shareWhatsAppModal = document.getElementById('shareWhatsAppModal');
        const shareFacebookModal = document.getElementById('shareFacebookModal');
        const shareTwitterModal = document.getElementById('shareTwitterModal');
        const copyLinkModal = document.getElementById('copyLinkModal');
        const copyMessage = document.getElementById('copyMessage'); // For copy success/failure message

        // Function to format Rupiah
        const formatRupiah = (amount) => {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(amount);
        };

        // Function to render products
        const renderProducts = (filteredProducts) => {
            productGrid.innerHTML = ''; // Clear existing products
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                // Make the entire card clickable
                productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer';
                productCard.dataset.productId = product.id; // Store product ID on the card

                productCard.innerHTML = `
                    <div class="relative">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                        <span class="product-tag absolute top-2 left-2 ${product.category}">${product.category}</span>
                    </div>
                    <div class="p-4">
                        <div>
                            <h3 class="text-base font-semibold text-gray-800 mb-1">${product.name}</h3>
                            <p class="text-sm font-bold text-blue-600 mb-3">${formatRupiah(product.price)}</p>
                        </div>
                    </div>
                `;
                productGrid.appendChild(productCard);
            });

            // Add event listeners for the entire product card
            // Menggunakan event delegation pada productGrid untuk efisiensi
            // Hapus listener lama jika ada untuk menghindari duplikasi
            productGrid.removeEventListener('click', handleProductCardClick);
            productGrid.addEventListener('click', handleProductCardClick);
        };

        // Event handler untuk klik kartu produk
        const handleProductCardClick = (event) => {
            const productCard = event.target.closest('.rounded-lg.shadow-md'); // Cari elemen kartu produk terdekat
            if (productCard && productCard.dataset.productId) {
                const productId = parseInt(productCard.dataset.productId);
                openOrderModal(productId);
            }
        };


        // Function to open order modal
        const openOrderModal = (productId) => {
            selectedProduct = products.find(p => p.id === productId);
            if (selectedProduct) {
                selectedProductDetails.innerHTML = `
                    <h4 class="font-bold text-lg text-blue-800">${selectedProduct.name}</h4>
                    <p class="text-gray-700">Harga: <span class="font-semibold">${formatRupiah(selectedProduct.price)}</span></p>
                `;
                orderModal.classList.remove('hidden');
                setTimeout(() => {
                    orderModalContent.classList.remove('scale-95', 'opacity-0');
                    orderModalContent.classList.add('scale-100', 'opacity-100');
                }, 50);
                // Ensure QRIS is selected by default and its details are shown
                document.querySelector('input[name="paymentMethod"][value="qris"]').checked = true;
                showPaymentDetails('qris');

                // NEW: Set up share button actions for the selected product
                // Mengubah shareProductUrl agar mengarah ke halaman saat ini
                const shareProductUrl = window.location.href; // Ini akan mengarah ke URL halaman yang sedang dibuka
                const shareProductTitle = selectedProduct.name;
                const shareProductDescription = `Cek produk keren ini: ${selectedProduct.name} dengan harga ${formatRupiah(selectedProduct.price)} di Toko Source Code Nr Real!`;

                // Web Share API
                shareViaWebShareModal.onclick = () => {
                    if (navigator.share) {
                        navigator.share({
                            title: shareProductTitle,
                            text: shareProductDescription,
                            url: shareProductUrl
                        })
                        .then(() => console.log('Produk berhasil dibagikan melalui Web Share API.'))
                        .catch((error) => console.error('Gagal berbagi via Web Share API:', error));
                    } else {
                        displayCopyMessage('Fitur berbagi aplikasi tidak didukung di browser ini.', 'text-red-500');
                        console.log('Web Share API tidak didukung di browser ini.');
                    }
                };

                // WhatsApp Share
                shareWhatsAppModal.onclick = () => {
                    const message = encodeURIComponent(`${shareProductDescription}\n\nLink: ${shareProductUrl}`);
                    const whatsappLink = `https://api.whatsapp.com/send?text=${message}`;
                    window.open(whatsappLink, '_blank');
                };

                // Facebook Share
                shareFacebookModal.onclick = () => {
                    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareProductUrl)}`;
                    window.open(facebookLink, '_blank');
                };

                // Twitter Share
                shareTwitterModal.onclick = () => {
                    const text = encodeURIComponent(shareProductDescription);
                    const twitterLink = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareProductUrl)}`;
                    window.open(twitterLink, '_blank');
                };

                // Copy Link
                copyLinkModal.onclick = () => {
                    navigator.clipboard.writeText(shareProductUrl).then(function() {
                        displayCopyMessage('Link produk berhasil disalin!', 'text-green-600');
                        console.log('Link produk berhasil disalin.');
                    }).catch(function(err) {
                        console.error('Gagal menyalin link:', err);
                        displayCopyMessage('Gagal menyalin link. Silakan salin manual.', 'text-red-500');
                        // Fallback for older browsers or failed copy
                        const tempInput = document.createElement('textarea');
                        tempInput.value = shareProductUrl;
                        document.body.appendChild(tempInput);
                        tempInput.select();
                        try {
                            document.execCommand('copy');
                            displayCopyMessage('Link produk berhasil disalin! (Metode fallback)', 'text-green-600');
                            console.log('Link produk berhasil disalin (fallback).');
                        } catch (err) {
                            console.error('Gagal menyalin link dengan execCommand:', err);
                        }
                        document.body.removeChild(tempInput);
                    });
                };
            }
        };

        // Function to display temporary message for copy action
        const displayCopyMessage = (message, colorClass) => {
            copyMessage.textContent = message;
            copyMessage.className = `text-sm text-center mt-2 ${colorClass}`; // Apply color
            copyMessage.classList.remove('hidden');
            setTimeout(() => {
                copyMessage.classList.add('hidden');
                copyMessage.textContent = '';
            }, 3000); // Hide after 3 seconds
        };


        // Function to show/hide payment details based on selection
        const showPaymentDetails = (method) => {
            qrisDetails.classList.add('hidden');
            bankTransferDetails.classList.add('hidden');
            eWalletDetails.classList.add('hidden');

            if (method === 'qris') {
                qrisDetails.classList.remove('hidden');
            } else if (method === 'bankTransfer') {
                bankTransferDetails.classList.remove('hidden');
            } else if (method === 'eWallet') {
                eWalletDetails.classList.remove('hidden');
            }
        };

        // Event listener for payment method radio buttons
        paymentMethodRadios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                showPaymentDetails(event.target.value);
            });
        });

        // Close order modal
        closeOrderModal.addEventListener('click', () => {
            orderModalContent.classList.remove('scale-100', 'opacity-100');
            orderModalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                orderModal.classList.add('hidden');
                selectedProduct = null; // Clear selected product
                orderForm.reset(); // Clear form fields
                copyMessage.classList.add('hidden'); // Hide copy message on close
            }, 300);
        });

        // Handle order form submission
        orderForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!selectedProduct) {
                console.error("No product selected for order.");
                return;
            }

            const customerName = customerNameInput.value;
            const customerPhone = customerPhoneInput.value;
            const customerAddress = customerAddressInput.value || "Tidak ada alamat pengiriman";
            const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

            let paymentMethodText = '';
            if (selectedPaymentMethod === 'qris') {
                paymentMethodText = 'QRIS';
            } else if (selectedPaymentMethod === 'bankTransfer') {
                paymentMethodText = 'Transfer Bank (Bank BSI - 7201019065)';
            } else if (selectedPaymentMethod === 'eWallet') {
                paymentMethodText = 'E-wallet (DANA/GoPay/OVO - mohon sertakan detail e-wallet yang digunakan)';
            }

            let orderDetails = `Halo, saya ingin memesan produk ini:\n\n`;
            orderDetails += `Produk: ${selectedProduct.name}\n`;
            orderDetails += `Harga: ${formatRupiah(selectedProduct.price)}\n\n`;
            orderDetails += `Nama: ${customerName}\n`;
            orderDetails += `Nomor WA: ${customerPhone}\n`;
            orderDetails += `Alamat: ${customerAddress}\n\n`;
            orderDetails += `Metode Pembayaran: ${paymentMethodText}\n`;
            orderDetails += `\nSaya telah melakukan pembayaran. Mohon segera diproses. Terima kasih!`;

            // WhatsApp API URL
            const whatsappNumber = '6282339162744'; // Nomor WhatsApp yang baru
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderDetails)}`;

            window.open(whatsappUrl, '_blank');

            // Close modal and clear form after order confirmation
            orderModalContent.classList.remove('scale-100', 'opacity-100');
            orderModalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                orderModal.classList.add('hidden');
                selectedProduct = null;
                orderForm.reset();
                copyMessage.classList.add('hidden'); // Hide copy message on close
            }, 300);
        });

        // Sidebar Toggle Logic
        const toggleSidebar = () => {
            sidebarMenu.classList.toggle('open');
            sidebarOverlay.classList.toggle('open');
            if (sidebarMenu.classList.contains('open')) {
                sidebarOverlay.classList.remove('hidden'); // Ensure overlay is visible
            } else {
                // Hide overlay after transition
                setTimeout(() => {
                    sidebarOverlay.classList.add('hidden');
                }, 300);
            }
        };

        menuToggle.addEventListener('click', toggleSidebar);
        closeMenuButton.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar); // Close when clicking outside menu

        // Filter products by category from sidebar
        categoryButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                // Remove active state from all buttons
                categoryButtons.forEach(btn => {
                    btn.classList.remove('bg-blue-100', 'text-blue-800');
                    btn.classList.add('bg-gray-100', 'text-gray-800');
                });

                // Add active state to clicked button
                event.target.classList.remove('bg-gray-100', 'text-gray-800');
                event.target.classList.add('bg-blue-100', 'text-blue-800');

                const category = event.target.dataset.category;
                let filteredProducts = [];
                if (category === 'Semua') {
                    filteredProducts = products;
                } else {
                    filteredProducts = products.filter(p => p.category === category);
                }
                renderProducts(filteredProducts);
                toggleSidebar(); // Close sidebar after selecting a category
            });
        });

        // Initial render of all products
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts(products);
        });
