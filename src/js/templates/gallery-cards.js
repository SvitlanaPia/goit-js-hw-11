export const createGalleryCards = images => {
  const galleryCard = images.map(image => {
    const {
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = image;
    return `
        <a class="link" href="${largeImageURL}">
            <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                    <b>Likes: ${likes}</b> 
                    </p>

                    <p class="info-item">
                    <b>Views: ${views}</b> 
                    </p>
                    
                    <p class="info-item">
                    <b>Comments: ${comments}</b> 
                    </p>
                    
                    <p class="info-item">
                    <b>Downloads: ${downloads}</b> 
                    </p>
                </div>
            </div>
        </a>
    `;
  });

  return galleryCard.join('');
};
