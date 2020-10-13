import { API } from "../../backend";

//category calls

// create category
export const createCategory = async (userId, token, category) => {
  try {
    const response = await fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

//get all categories
export const getCategories = async () => {
  try {
    const response = await fetch(`${API}/category/categories`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};
// delete a category

export const deleteCategory = async (categoryId, userId, token) => {
  try {
    const response = await fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

//get a category
export const getCategory = async (categoryId, userId) => {
  try {
    const response = await fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

//update a category

export const updateCategory = async (categoryId, userId, token, category) => {
  try {
    const response = await fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

//products calls

//create a product
export const createaProduct = async (userId, token, product) => {
  try {
    const response = await fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

//get all products
export const getProducts = async () => {
  try {
    const response = await fetch(`${API}/products`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

//delete a product

export const deleteProduct = async (productId, userId, token) => {
  try {
    const response = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

//get a product

export const getProduct = async (productId) => {
  try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

//update a product

export const updateProduct = async (productId, userId, token, product) => {
  try {
    const response = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};
