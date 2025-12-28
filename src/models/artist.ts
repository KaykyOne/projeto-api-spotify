type ExternalUrls = {
  spotify: string;
}

type Followers = {
  href: string | null;
  total: number;
}

type Image = {
  url: string;
  height: number;
  width: number;
}

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