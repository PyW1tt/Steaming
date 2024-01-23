function useInputType() {
  const genres = [
    "Action",
    "Drama",
    "Romance",
    "Fantasy",
    "Thriller",
    "Science fiction",
    "Adventure",
    "Crime",
    "Mystery",
    "Animation",
    "Historical",
    "Documentary",
    "Comedy",
    "Horror",
  ];

  const MPA = ["G", "PG", "PG-13", "R", "NC-17"];

  const type = ["Movie", "Series"];

  return { genres, MPA, type };
}

export default useInputType;
