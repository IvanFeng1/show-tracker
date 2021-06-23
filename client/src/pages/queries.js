import { gql } from '@apollo/client';

export const Anime_Trending = gql`
  query {
    Page(page: 1) {
      media(
        format_in: [TV, TV_SHORT, MOVIE, OVA]
        sort: TRENDING_DESC
        isAdult: false
      ) {
        id
        title {
          english(stylised: true)
          romaji(stylised: true)
        }
        episodes
        genres
        coverImage {
          large
          medium
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
  query MediaSearch($title: String) {
    Page(page: 1) {
      media(
        search: $title
        format_in: [TV]
        sort: POPULARITY_DESC
        isAdult: false
      ) {
        id
        title {
          english(stylised: true)
          romaji(stylised: true)
        }
        bannerImage
        coverImage {
          large
          medium
        }
        source
      }
    }
  }
`;

export const Genre_Year_Season_Search = gql`
  query GenreYearSeasonSearch(
    $genre: String
    $year: Int
    $season: MediaSeason
  ) {
    Page(page: 1) {
      media(
        genre: $genre
        seasonYear: $year
        season: $season
        sort: POPULARITY_DESC
        isAdult: false
      ) {
        id
        title {
          english(stylised: true)
          romaji(stylised: true)
        }
        description(asHtml: false)
        coverImage {
          large
          medium
        }
      }
    }
  }
`;
