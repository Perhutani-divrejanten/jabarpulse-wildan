(function ($) {
    "use strict";
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.header').addClass('header-sticky');
        } else {
            $('.header').removeClass('header-sticky');
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 768) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Category News Slider
    $('.cn-slider').slick({
        autoplay: false,
        infinite: true,
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $(document).ready(function () {

    const itemsToShow = 10;
    let currentIndex = 0;

    const items = $(".mn-list");
    const loadMoreBtn = $("#loadMore");

    // tampilkan 10 pertama
    items.slice(0, itemsToShow).show();
    currentIndex = itemsToShow;

    // kalau berita <= 10
    if (items.length <= itemsToShow) {
        loadMoreBtn.hide();
    }

    loadMoreBtn.on("click", function () {

        items
            .slice(currentIndex, currentIndex + itemsToShow)
            .fadeIn();

        currentIndex += itemsToShow;

        if (currentIndex >= items.length) {
            loadMoreBtn.fadeOut();
        }
    });

});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    
    // 🔍 CEK dari URL - paling reliable!
    const isNewsPage = window.location.pathname.includes("news.html");
    
    const newsItems = document.querySelectorAll(".mn-list");
    
    if (!searchInput || !searchBtn) return;

    const params = new URLSearchParams(window.location.search);
    const urlQuery = params.get("q");

    function filterNews(keyword) {
        const key = keyword.toLowerCase().trim();
        newsItems.forEach(item => {
            const title = item.querySelector(".mn-title");
            if (!title) return;
            const text = title.textContent.toLowerCase();
            item.style.display = text.includes(key) ? "flex" : "none";
        });
    }

    // 🎯 AUTO FILTER kalau ada query di URL (ini yang penting!)
    if (isNewsPage && urlQuery) {
        searchInput.value = urlQuery;
        filterNews(urlQuery);
    }

    searchBtn.addEventListener("click", function () {
        const keyword = searchInput.value.trim();
        if (!keyword) return;

        if (!isNewsPage) {
            window.location.href = `news.html?q=${encodeURIComponent(keyword)}`;
        } else {
            filterNews(keyword);
        }
    });

    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            searchBtn.click();
        }
    });
});

})(jQuery);

