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

export const Movie_Trending = gql`
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
  query {
    Page(page: 1) {
      media(search: $title) {
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

export const Detail = gql`
  query {
    Page(page: 1) {
      media(id: $id) {
        id
        title {
          english(stylised: true)
          native(stylised: true)
        }
        episodes
        genres
        bannerImage
        popularity
        description(asHtml: false)
      }
    }
  }
`;
