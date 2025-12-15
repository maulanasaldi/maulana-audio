function getDetail() {
    const detailProduct = document.getElementById("detailProduct");

    const params = new URLSearchParams(location.search);
    const productId = params.get("id");

    if(!productId) {
        detailProduct.textContent = "ID tidak ditemukan!";
        return;
    }

    fetch("./assets/data.json")
    .then(response => response.json())
    .then(data => {
        const item = data.find(row => row.id === productId);

        if(!item) {
            detailProduct.textContent = "Product tidak ditemukan!";
            return;            
        }

        detailProduct.innerHTML = `
                <div class="detail-card">
                    <div class="detail-hero" style="background-image: url('${item.image}')"></div>
                    <div class="detail-body">
                        <a href="index.html" class="back">&#8592; Kembali</a>
                        <h1>${item.title}</h1>
                        <p>${item.subtitle}</p>
                        <div id="detailBody"></div>
                        <div class="detail-stats">
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
                </div>
            `;

            const accentBlock = detailProduct.querySelector(".accentColorBlock")
            accentBlock.style.backgroundColor = item.accent;

            const detailBody = document.getElementById("detailBody");
            const paragrahps = (item.detail_description || "").split(/\n+/);
            paragrahps.forEach(text => {
                const trimmed = text.trim();
                const p = document.createElement("p");
                p.textContent = trimmed;
                detailBody.appendChild(p); 
            });
    })
}

getDetail();