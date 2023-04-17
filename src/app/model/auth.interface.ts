export interface ResponseTrue {
  data:    Archive[];
  ok:      boolean;
  message: string;
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
  id?:         string;
  item:        string;
  description: string;
  line:        string;
  category:    string;
  archive:     string;
}

export interface UserAdmin {
  _id:       string;
  name:      string;
  lastname:  string;
  email:     string;
  password:  string;
  role?:     string[];
}

export interface User {
  name:       string;
  lastname:   string;
  email:      string;
  role?:      string[];
  password?:  string;
}

export interface ResponseAuth {
  ok:      boolean;
  message: string;
  token:   string;
}
