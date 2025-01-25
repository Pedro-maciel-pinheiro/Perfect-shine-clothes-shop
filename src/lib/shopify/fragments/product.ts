import imageFragment from './image';
import seoFragment from './seo';

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    media(first: 20) {
      edges {
        node {
          mediaContentType
          alt
          previewImage {
            ...image
          }
          ... on MediaImage {
            image {
              ...image
            }
          }
          ... on Video {
            id
            sources {
              mimeType
              url
            }
          }
          ... on ExternalVideo {
            id
            embedUrl
          }
          ... on Model3d {
            id
            sources {
              mimeType
              url
            }
          }
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${imageFragment}
  ${seoFragment}
`;

export default productFragment;
