import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private data = [

    {
      category: 'Beverages',
      img: 'https://www.esanshar.com/image/cache/catalog/category/beverages-200x200.jpg',
      expanded: true,
      products: [
        { id: 0, name: 'Beverages1', price: '10', img: 'https://www.esanshar.com/image/cache/catalog/category/beverages-200x200.jpg' },
        { id: 1, name: 'Beverages2', price: '20', img: 'https://www.esanshar.com/image/cache/catalog/category/beverages-200x200.jpg' },
        { id: 2, name: 'Beverages3', price: '40', img: 'https://www.esanshar.com/image/cache/catalog/category/beverages-200x200.jpg' },
        { id: 3, name: 'Beverages4', price: '60', img: 'https://www.esanshar.com/image/cache/catalog/category/beverages-200x200.jpg' },
      ]
    },

    {
      category: 'Millets',
      img: 'https://www.netmeds.com/images/cms/magefan_blog/popular/Millets_320_Thumbimage_200x200.jpg',
      expanded: true,
      products: [
        { id: 4, name: 'Millets1', price: '10', img: 'https://www.netmeds.com/images/cms/magefan_blog/popular/Millets_320_Thumbimage_200x200.jpg' },
        { id: 5, name: 'Millets2', price: '20', img: 'https://www.netmeds.com/images/cms/magefan_blog/popular/Millets_320_Thumbimage_200x200.jpg' },
        { id: 6, name: 'Millets3', price: '40', img: 'https://www.netmeds.com/images/cms/magefan_blog/popular/Millets_320_Thumbimage_200x200.jpg' },
        { id: 7, name: 'Millets4', price: '60', img: 'https://www.netmeds.com/images/cms/magefan_blog/popular/Millets_320_Thumbimage_200x200.jpg' },
      ]
    },

    {
      category: 'Spices',
      img: 'https://www.homemadetrust.com/image/cache/catalog/journal3/categories/organic-spices-500x500-200x200.jpg',
      expanded: true,
      products: [
        { id: 4, name: 'Spices1', price: '10', img: 'https://www.homemadetrust.com/image/cache/catalog/journal3/categories/organic-spices-500x500-200x200.jpg' },
        { id: 5, name: 'Spices2', price: '20', img: 'https://www.homemadetrust.com/image/cache/catalog/journal3/categories/organic-spices-500x500-200x200.jpg' },
        { id: 6, name: 'Spices3', price: '40', img: 'https://www.homemadetrust.com/image/cache/catalog/journal3/categories/organic-spices-500x500-200x200.jpg' },
        { id: 7, name: 'Spices4', price: '60', img: 'https://www.homemadetrust.com/image/cache/catalog/journal3/categories/organic-spices-500x500-200x200.jpg' },
      ]
    },

    {
      category: 'Fruits',
      img: 'https://www.searchpng.com/wp-content/uploads/2018/12/Fruits-PNG-HD-Transparent-Fruits-200x200.png',
      expanded: true,
      products: [
        { id: 4, name: 'Spices1', price: '10', img: 'https://www.searchpng.com/wp-content/uploads/2018/12/Fruits-PNG-HD-Transparent-Fruits-200x200.png', },
        { id: 5, name: 'Spices2', price: '20', img: 'https://www.searchpng.com/wp-content/uploads/2018/12/Fruits-PNG-HD-Transparent-Fruits-200x200.png', },
        { id: 6, name: 'Spices3', price: '40', img: 'https://www.searchpng.com/wp-content/uploads/2018/12/Fruits-PNG-HD-Transparent-Fruits-200x200.png', },
        { id: 7, name: 'Spices4', price: '60', img: 'https://www.searchpng.com/wp-content/uploads/2018/12/Fruits-PNG-HD-Transparent-Fruits-200x200.png', },
      ]
    }



  ];
  private cart = [];
  private cartcout: number;
  constructor() { }

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  getCartCount() {

    return new Set(this.cart).size;


  }

  addProduct(product) {


    // for (let obj of cart) {
    //   if (obj.id == product.id) {
    //     obj.quantity = parseFloat(obj.quantity) + parseFloat(product.quantity);
    //   }
    // }
    const result1 = this.cart.find(x => x.id == product.id);

    if (result1) {
      for (let obj of this.cart) {
        if (obj.id == product.id) {
          obj.quantity = parseFloat(obj.quantity) + parseFloat(product.quantity);
        }
      }
    }else{
      this.cart.push(product);
    }

  }

}
