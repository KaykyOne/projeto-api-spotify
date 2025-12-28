// External URLs for artist - contains Spotify profile link
type ExternalUrls = {
  spotify: string;
}

// Followers data - includes total follower count
type Followers = {
  href: string | null;
  total: number;
}

// Image information - URL and dimmensions for artist artwork
type Image = {
  url: string;
  height: number;
  width: number;
}

// Artist model - complete Spotify artist information
type Artist = {
  id: string;
  name: string;
  type: string;
  uri: string;
  href: string;
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  images: Image[];
  popularity: number;
}

export {type Artist, type Image, type Followers, type ExternalUrls}