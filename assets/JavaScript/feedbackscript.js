document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');

    stars.forEach(function (star) {
        star.addEventListener('mouseover', function () {
            resetStars();
            const ratingValue = this.getAttribute('data-rating');
            highlightStars(ratingValue);
        });

        // star.addEventListener('click', function () {
        //     resetStars();
        // });

        star.addEventListener('click', function () {
            // resetStars();
            const ratingValue = this.getAttribute('data-rating');
            highlightStars(ratingValue);
        });
    });

    function resetStars() {
        stars.forEach(function (star) {
            star.classList.remove('active');
        });
    }

    function highlightStars(value) {
        for (let i = 0; i < value; i++) {
            stars[i].classList.add('active');
        }
    }
});