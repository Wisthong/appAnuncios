export interface ResponseTrue {
  data:    Archive[];
  ok:      boolean;
  message: string;
}

export interface PostArray {
  data:    Posts[];
  ok:      boolean;
  message: string;
}

export interface ResponsePost {
  data:    Post;
  ok:      boolean;
  message: string;
}

export interface ResponsePosts {
  data:    Posts[];
  ok:      boolean;
  message: string;
}

export interface ResponseUpload {
  data:    Upload;
  ok:      boolean;
  message: string;
}

export interface Upload {
  url:        string;
  filename:   string;
  usuario:    string;
  _id?:       string;
}


export interface Archive {
  _id?:        string;
  url:         string;
  filename:    string;
  usuario:     string;
  deleted?:    boolean;
  userAdmin:   UserAdmin[];
}

export interface Post {
  _id?:              string;
  archive:           string;
  information:       string;
  category:          string;
  description:       string;
  item:              string;
  line:              string;
  line2:             string;
  priceClient:       number;
  priceSuper:        number;
  price14:           number;
  status?:           boolean;

}

export interface UserAdmin {
  _id:       string;
  name:      string;
  lastname:  string;
  email:     string;
  password:  string;
  role?:     string;
}

export interface User {
  name:       string;
  lastname:   string;
  email:      string;
  role?:      string;
  password?:  string;
}

export interface ResponseAuth {
  ok:      boolean;
  message: string;
  token:   string;
}


export interface Posts {
  _id?:               string;
  archive:            string;
  information:        string;
  category:           string;
  description:        string;
  item:               string;
  line:               string;
  line2:              string;
  priceClient:        number;
  priceSuper:         number;
  price14:            number;
  status?:            boolean;
  archiveJoin?:       ArchiveJoin[];
  dataDescuentoJoin?: DataDescuentoJoin[];
}

export interface ArchiveJoin {
  _id?:       string;
  url?:       string;
  filename?:  string;
  usuario?:   string;
}

export interface DataDescuentoJoin {
  _id?:       string;
  url?:       string;
  filename?:  string;
  usuario?:   string;
}

