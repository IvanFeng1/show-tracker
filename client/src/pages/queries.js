import { gql } from "@apollo/client";

export const Movie_Popular = gql`
  query {
    Page(page: 1) {
      media(sort: POPULARITY_DESC) {
        id
        title {
          english(stylised: true)
          native(stylised: true)
        }
        episodes
        genres
        coverImage {
          large
        }
        bannerImage
        popularity
        trending
        averageScore
      }
    }
  }
`;

export const Anime_Trending = gql`
  query {
    Page(page: 1) {
      media(sort: TRENDING_DESC) {
        id
        title {
          english(stylised: true)
          native(stylised: true)
        }
        episodes
        genres
        coverImage {
          large
        }
        popularity
        trending
        averageScore
        bannerImage
      }
    }
  }
`;

export const Media_Search = gql`
  query MediaSearch($title: String!) {
    Page(page: 1) {
      media(search: $title) {
        id
        title {
          english(stylised: true)
          native(stylised: true)
        }
        bannerImage
        coverImage {
          large
        }
        source
      }
    }
  }
`;

export const Genre_Search = gql`
  query GenreSearch($genre: String) {
    Page(page: 1) {
      media(genre: $genre, sort: POPULARITY_DESC) {
        id
        title {
          english(stylised: true)
          native(stylised: true)
        }
        description(asHtml: false)
        coverImage {
          large
        }
      }
    }
  }
`;

export const Year_Search = gql`
  query YearSearch($year: Int) {
    Page(page: 1) {
      media(seasonYear: $year, sort: POPULARITY_DESC) {
        id
        title {
          english(stylised: true)
          native(stylised: true)
        }
        description(asHtml: false)
        coverImage {
          large
        }
      }
    }
  }
`;

export const Season_Search = gql`
  query SeasonSearch($season: MediaSeason) {
    Page(page: 1) {
      media(season: $season, sort: POPULARITY_DESC) {
        id
        title {
          english(stylised: true)
          native(stylised: true)
        }
        description(asHtml: false)
        coverImage {
          large
        }
      }
    }
  }
`;

export const Genre_Year_Season_Search = gql`
  query {
    Page(page: 1) {
      media(genre: $genre, seasonYear: $year, season: $season) {
        id
        title {
          english(stylised: true)
          native(stylised: true)
        }
        description(asHtml: false)
        bannerImage
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
      }
    }
  }
`;

export const Genre_Year_Search = gql`
  query {
    Page(page: 1) {
      media(genre: $genre, seasonYear: $year) {
        id
        title {
          english(stylised: true)
          native(stylised: true)
        }
        description(asHtml: false)
        bannerImage
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
      }
    }
  }
`;

export const Genre_Season_Search = gql`
  query {
    Page(page: 1) {
      media(genre: $genre, season: $season) {
        id
        title {
          english(stylised: true)
          native(stylised: true)
        }
        description(asHtml: false)
        bannerImage
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
      }
    }
  }
`;

export const Year_Season_Search = gql`
  query {
    Page(page: 1) {
      media(seasonYear: $year, season: $season) {
        id
        title {
          english(stylised: true)
          native(stylised: true)
        }
        description(asHtml: false)
        bannerImage
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
      }
    }
  }
`;
