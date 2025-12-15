function getData() {
    fetch("./assets/data.json")
        .then(response => response.json())
        .then(items => {
            const productList = document.getElementById("productList");
            const cards = []
            items.forEach(item => {
                const card = document.createElement("div")

                // membuat objek url ke halaman berikutnya sesuai product jika diklik 
                const productUrl = `detail.html?id=${encodeURIComponent(item.id)}`                                

                card.className = "product";
                card.style.backgroundImage = `url(${item.image})`
                card.innerHTML = `
                    <div class="product-content">
                        <h1>${item.title}</h1><br>
                        <h3>${item.subtitle}</h3><br>
                        <p>${item.detail_description}</p><br>

                        <div class="product-stats">

                            <div class="stat">
                                <span class="label">Badge</span>
                                <span class="value">${item.badge}</span>
                            </div>

                            <div class="stat">
                                <span class="label">Price</span>
                                <span class="value">${item.price}</span>
                            </div>
                            
                            <div class="stat">
                                <span class="label">Color</span>
                                <span class="value">${item.color}</span>
                            </div>

                            <div class="stat">
                                <span class="label">Battery</span>
                                <span class="value">${item.battery}</span>
                            </div>

                            <div class="stat">
                                <span class="label">Weight</span>
                                <span class="value">${item.weight}</span>
                            </div>
                            
                            <div class="stat">
                                <span class="label">Latency</span>
                                <span class="value">${item.latency}</span>
                            </div>

                            <div class="stat">
                                <span class="label">Accent</span>
                                <span class="accentColorBlock"></span>
                            </div>

                        </div>
                    </div>
                `

                // Menampilkan warna yang diambil dari file data objek di json
                const accentBlock = card.querySelector(".accentColorBlock")
                accentBlock.style.backgroundColor = item.accent                

                // Membuat handler direction
                const content = card.querySelector(".product-content")

                if (content) {
                    content.onclick = () => {
                        window.location.href = productUrl;
                    }
                }

                productList.appendChild(card);
                cards.push(card);
            });            

            function reveal() {
                for (const card of cards) {
                    const {top, bottom} = card.getBoundingClientRect();

                    if( top < window.innerHeight * 0.85 && bottom > window.innerHeight * 0.15) {
                        card.classList.add("show")
                    }
                }
            }

            reveal();
            window.addEventListener("scroll", reveal, {passive: true});
            window.addEventListener("resize", reveal);
        })
}

getData()