<<<<<<< HEAD
/*document.addEventListener('DOMContentLoaded', function () {
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
            selectedRating.innerHTML = 'Hai valutato con ' + ratingValue + ' stella(e).';
            resetStars();
            highlightStars(ratingValue);
        });
=======
document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");

  stars.forEach(function (star) {
    star.addEventListener("mouseover", function () {
      resetStars();
      const ratingValue = this.getAttribute("data-rating");
      highlightStars(ratingValue);
>>>>>>> 74cf9056b102ab47022690e150856b8d58634077
    });

    // star.addEventListener('click', function () {
    //     resetStars();
    // });

    star.addEventListener("click", function () {
      // resetStars();
      const ratingValue = this.getAttribute("data-rating");
      highlightStars(ratingValue);
    });
  });

  function resetStars() {
    stars.forEach(function (star) {
      star.classList.remove("active");
    });
  }

  function highlightStars(value) {
    for (let i = 0; i < value; i++) {
      stars[i].classList.add("active");
    }
<<<<<<< HEAD
});*/
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');
    const selectedRating = document.getElementById('selectedRating');

    stars.forEach(function (star) {
        star.addEventListener('mouseover', function () {
            const ratingValue = this.getAttribute('data-rating');
            highlightStars(ratingValue);
        });

        star.addEventListener('mouseout', function () {
            resetStars();
        });

        star.addEventListener('click', function () {
            const ratingValue = this.getAttribute('data-rating');
           
            highlightStars(ratingValue);
            
            this.classList.add('selected'); // Aggiungi la classe 'selected' alla stella cliccata
            //resetStars();        
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
=======
  }
});
>>>>>>> 74cf9056b102ab47022690e150856b8d58634077
