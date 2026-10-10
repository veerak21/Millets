function toggleSearch(forceOpen) {
    const panel = document.getElementById("searchPanel");
    const toggle = document.querySelector(".search-toggle");

    const shouldOpen =
        typeof forceOpen === "boolean"
            ? forceOpen
            : !panel.classList.contains("visible");

    panel.classList.toggle("visible", shouldOpen);
    toggle.setAttribute("aria-expanded", String(shouldOpen));

    if (shouldOpen) {
        document.getElementById("productSearch").focus();
    }
}

const searchableItems = [
    ...document.querySelectorAll(
        ".products li, .millet-panel p, .section-title, " +
        ".jaggery-title, .purple-message, .red-message, .caption"
    )
];

document.getElementById("searchForm").addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const query = document.getElementById("productSearch")
            .value.trim().toLowerCase();

        const message = document.getElementById("searchMessage");
        let matches = 0;

        searchableItems.forEach(function (item) {
            item.classList.remove("search-match");
        });

        if (!query) {
            message.textContent = "Please enter a product name.";
            return;
        }

        const results = searchableItems.filter(function (item) {
            return item.textContent.toLowerCase().includes(query);
        });

        results.forEach(function (item) {
            item.classList.add("search-match");
        });

        matches = results.length;

        if (matches > 0) {
            message.textContent =
                matches + " matching section(s) found.";

            results[0].scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        } else {
            message.textContent =
                "No matching products found. Try oils, millets, " +
                "sesame, groundnut, spices or sweets.";
        }
    }
);

document.getElementById("productSearch").addEventListener(
    "input",
    function () {
        if (!this.value.trim()) {
            searchableItems.forEach(function (item) {
                item.classList.remove("search-match");
            });

            document.getElementById("searchMessage").textContent = "";
        }
    }
);