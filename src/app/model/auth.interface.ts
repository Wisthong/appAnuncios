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
  _id?:          string;
  item:          string;
  description:   string;
  line:          string;
  category:      string;
  status?:       boolean;
  archive:       string;
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
  _id?:         string;
  item:         string;
  description:  string;
  line:         string;
  category:     string;
  archive:      string;
  status:       boolean;
  archiveJoin?:  ArchiveJoin[];
}

export interface ArchiveJoin {
  _id?:       string;
  url?:       string;
  filename?:  string;
  usuario?:   string;
}
