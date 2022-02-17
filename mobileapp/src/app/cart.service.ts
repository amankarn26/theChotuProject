import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
  constructor(public alertController: AlertController) {
    if(localStorage.getItem('cartData')){
   this.cart = JSON.parse(localStorage.getItem('cartData'));
    }
  }


  ionViewWillEnter(){
    // console.log('checking local storage for cart');
    if(localStorage.getItem('cartData')){
      this.cart = JSON.parse(localStorage.getItem('cartData'));
       }
  }



  getProducts() {
    return this.data;
  }

  getCart() {
    // console.log('returning cart');
    // console.log(this.cart);
    return this.cart;
  }

  getCartCount() {
    return new Set(this.cart).size;
  }

  addProduct(product) {
    const result1 = this.cart.find(x => ((x.id == product.id) && (x.rateperunit == product.rateperunit)));

    if (result1) {
      // console.log('Existing Item added to cart');
      for (let obj of this.cart) {
        if ((obj.id == product.id) && (obj.mfg == product.mfg) ) {
          obj.quantity = parseFloat(obj.quantity) + parseFloat(product.quantity);
        }
      }

      // Present alert
      this.presentAlert()
    }else{
      this.cart.push(product);
    }

    localStorage.setItem('cartData', JSON.stringify(this.cart));
  }


  removeProduct(productid:any) {

    // console.log('removing product'+productid);
    let index = 0;
    let removalindex = 0;
    for (let obj of this.cart) {
      index = index + 1;
      if (obj.id == productid) {
        // delete this.cart[index - 1];
        removalindex = Number(index)-Number(1);
        console.log('product found');
      }
    }


    this.cart.splice(removalindex, 1);


    // console.log('After removal product from cart');
    // console.log(this.cart);
    // const result1 = this.cart.find(x => x.id == product.id);

    // if (result1) {
    //   console.log('Existing Item added to cart');
    //   for (let obj of this.cart) {
    //     if (obj.id == product.id) {
    //       obj.quantity = parseFloat(obj.quantity) + parseFloat(product.quantity);
    //     }
    //   }
    // }else{
    //   this.cart.push(product);
    //   console.log('New Item added to cart');
    // }

    localStorage.setItem('cartData', JSON.stringify(this.cart));
  }


  makecartEmpty() {
    this.cart = [];
    // console.log('After removal of cart');
    // console.log(this.cart);
    localStorage.setItem('cartData', JSON.stringify(this.cart));
  }

  addProductItemInCart(index) {
    // console.log("start::",this.cart);
    this.cart[index].serves++
    this.cart[index].amount = this.cart[index].rateperunit * this.cart[index].serves
    localStorage.setItem('cartData', JSON.stringify(this.cart));
    // console.log("End::",this.cart);
    
  }

  subProductItemInCart(index) {
    // console.log("start::",this.cart);
    this.cart[index].serves--
    this.cart[index].amount = this.cart[index].rateperunit * this.cart[index].serves
    localStorage.setItem('cartData', JSON.stringify(this.cart));
    // console.log("End::",this.cart);

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      // subHeader: 'Subtitle',
      message: "Already Present in cart",
      buttons: ["OK"],
    });

    await alert.present();
  }

}
