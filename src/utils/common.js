export const groupingPhotos = photos => {
  if (!photos) return [];
  const albums = [];
  photos.forEach(pt => {
    const album = pt.album;
    const albumIdx = albums.findIndex(ab => ab.album === album);
    if (albumIdx > -1) {
      albums[albumIdx].documents = albums[albumIdx].documents + ', ' + pt.name;
    } else {
      const newAlbum = {
        album,
        documents: pt.name
      }
      albums.push(newAlbum);
    }
  })

  return albums;
}