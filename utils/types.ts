export type CardType = {
  _id?: any;
  name: string;
  image: any;
  slug: {
    current: string;
  };
  short_description: string;
  restaurants: restaurantType[];
};

export type restaurantType = {
  _id: any;
  image: string;
  name: string;
  slug: {
    current: string;
  };
  dishes: Dish[];
};
export type Dish = {
  _id: any;
  name: string;
  image: any;
  price: number;
};

export type User = {
  displayName: string;
  email: string;
  uid: string;
  id: string;
};


export type regType = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
};
export type loginType = {
  email: string;
  password: string;
};

export type userType = {
  $id?: string;
  name: string;
  email: string;
  phone?: string;
};