document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");
  let assignedRating = 0;


  stars.forEach(function (star) {
    star.addEventListener("mouseover", function () {
      if(assignedRating == 0){
        resetStars();
      const ratingValue = this.getAttribute("data-rating");
      highlightStars(ratingValue);
      }
    
    });

    // star.addEventListener('click', function () {
    //     resetStars();
    // });

    star.addEventListener("click", function () {
      resetStars();
      assignedRating = this.getAttribute("data-rating");
      highlightStars(assignedRating);
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
  }
});
