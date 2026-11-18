export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface Book {
  uuid: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  availableCopies: number;
  createdAt: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface Borrow {
  uuid: string;
  userUuid: string;
  username: string;
  bookUuid: string;
  bookTitle: string;
  bookIsbn: string;
  borrowDate: string;
  returnDate: string | null;
  status: 'Active' | 'Returned';
}

export interface BookRequest {
  title: string;
  author: string;
  isbn: string;
  price: number;
  availableCopies: number;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}