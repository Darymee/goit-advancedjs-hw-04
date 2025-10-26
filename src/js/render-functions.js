export function renderGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <div class="img-wrapper">
              <img class="card-image" src="${webformatURL}" alt="${tags}" />
            </div>
            <div class="card-bottom">
              <div class="info">
                <p>Likes</p>
                <span>${likes}</span>
              </div>
              <div class="info">
                <p>Views</p>
                <span>${views}</span>
              </div>
              <div class="info">
                <p>Comments</p>
                <span>${comments}</span>
              </div>
              <div class="info">
                <p>Downloads</p>
                <span>${downloads}</span>
              </div>
            </div>
          </a>
        </li>
        `
    )
    .join('');
}
